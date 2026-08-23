// Server-only email notifications for new review submissions.
// Uses Resend's HTTP API directly (no SDK dependency needed), so it works
// the same way in Node and in the Cloudflare Workers build.
// Load inside server handlers only — never import this from client code.

export type ReviewEmailPayload = {
  customerName: string;
  jerseyProduct: string;
  rating: number;
  howDidYouHear: string;
  review: string;
  email?: string | null;
  photoUrl?: string | null;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(data: ReviewEmailPayload): string {
  const stars = "★".repeat(data.rating) + "☆".repeat(5 - data.rating);

  const rows: Array<[string, string]> = [
    ["Customer Name", data.customerName],
    ["Jersey / Product", data.jerseyProduct],
    ["Rating", `${stars} (${data.rating}/5)`],
    ["How they heard about us", data.howDidYouHear],
    ["Customer Email", data.email && data.email.length > 0 ? data.email : "Not provided"],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;white-space:nowrap;">${escapeHtml(
            label,
          )}</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const photoHtml = data.photoUrl
    ? `<p style="margin:16px 0 4px;font-weight:600;">Photo:</p>
       <a href="${escapeHtml(data.photoUrl)}">${escapeHtml(data.photoUrl)}</a>
       <div style="margin-top:8px;">
         <img src="${escapeHtml(data.photoUrl)}" alt="Review photo" style="max-width:480px;border-radius:8px;" />
       </div>`
    : "";

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;max-width:640px;margin:0 auto;">
      <h2 style="margin-bottom:4px;">New JILLOW CLUB Review Submitted</h2>
      <p style="margin-top:0;color:#6b7280;">A customer just submitted a new review on the site.</p>
      <table style="border-collapse:collapse;width:100%;margin-top:12px;">
        ${rowsHtml}
      </table>
      <p style="margin:16px 0 4px;font-weight:600;">Review:</p>
      <p style="white-space:pre-wrap;border:1px solid #e5e7eb;border-radius:8px;padding:12px;background:#fafafa;">${escapeHtml(
        data.review,
      )}</p>
      ${photoHtml}
    </div>
  `;
}

function buildEmailText(data: ReviewEmailPayload): string {
  return [
    "New JILLOW CLUB review submitted",
    "",
    `Customer Name: ${data.customerName}`,
    `Jersey / Product: ${data.jerseyProduct}`,
    `Rating: ${data.rating}/5`,
    `How they heard about us: ${data.howDidYouHear}`,
    `Customer Email: ${data.email && data.email.length > 0 ? data.email : "Not provided"}`,
    "",
    "Review:",
    data.review,
    "",
    data.photoUrl ? `Photo: ${data.photoUrl}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

// Sends the "new review" notification email. Resolves quietly (logs and
// returns) instead of throwing, so an email/provider outage never blocks a
// customer's review from being saved.
export async function sendReviewNotificationEmail(data: ReviewEmailPayload): Promise<void> {
  const RESEND_API_KEY = process.env["RESEND_API_KEY"];
  const EMAIL_FROM = process.env["EMAIL_FROM"];
  const EMAIL_TO = process.env["REVIEW_NOTIFICATION_EMAIL"] || "jillowclub@gmail.com";

  if (!RESEND_API_KEY || !EMAIL_FROM) {
    console.error(
      "[email] Skipping review notification email: missing RESEND_API_KEY or EMAIL_FROM environment variable(s).",
    );
    return;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [EMAIL_TO],
        reply_to: data.email && data.email.length > 0 ? data.email : undefined,
        subject: `New Review from ${data.customerName} — ${data.rating}/5 stars`,
        html: buildEmailHtml(data),
        text: buildEmailText(data),
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      console.error(`[email] Resend API error (${response.status}): ${errorBody}`);
    }
  } catch (error) {
    console.error("[email] Failed to send review notification email:", error);
  }
}
