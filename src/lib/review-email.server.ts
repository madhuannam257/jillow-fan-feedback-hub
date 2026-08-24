const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

export type ReviewEmailPayload = {
  customerName: string;
  jerseyProduct: string;
  rating: number;
  howDidYouHear: string;
  review: string;
  email?: string | null;
  photoUrl?: string | null;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(data: ReviewEmailPayload) {
  const stars = `${"★".repeat(data.rating)}${"☆".repeat(5 - data.rating)} (${data.rating}/5)`;
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;font:600 12px Arial;color:#666;letter-spacing:1px;text-transform:uppercase;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:8px 12px;font:14px Arial;color:#111">${value}</td></tr>`;

  return `<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px">
    <h1 style="font:800 22px Arial;color:#c81e1e;margin:0 0 16px">New JILLOW CLUB Review</h1>
    <table style="width:100%;border-collapse:collapse;border:1px solid #eee">
      ${row("Customer", escapeHtml(data.customerName))}
      ${row("Jersey / Product", escapeHtml(data.jerseyProduct))}
      ${row("Rating", stars)}
      ${row("Heard about us", escapeHtml(data.howDidYouHear))}
      ${row("Customer email", data.email ? escapeHtml(data.email) : "Not provided")}
      ${row("Review", escapeHtml(data.review).replace(/\n/g, "<br/>"))}
      ${row(
        "Photo",
        data.photoUrl
          ? `<a href="${escapeHtml(data.photoUrl)}">View photo</a><br/><img src="${escapeHtml(
              data.photoUrl,
            )}" alt="Customer review photo" style="margin-top:8px;max-width:320px;border-radius:8px"/>`
          : "No photo uploaded",
      )}
    </table>
  </div>`;
}

/**
 * Sends the review notification through the Resend connector gateway.
 * Never throws - review submission must not fail because of email delivery.
 */
export async function sendReviewNotification(data: ReviewEmailPayload): Promise<void> {
  const lovableApiKey = process.env["LOVABLE_API_KEY"];
  const resendApiKey = process.env["RESEND_API_KEY"];
  const to = process.env["REVIEW_NOTIFICATION_EMAIL"] || "jillowclub@gmail.com";
  const from = process.env["REVIEW_FROM_EMAIL"] || "JILLOW CLUB <onboarding@resend.dev>";

  if (!lovableApiKey || !resendApiKey) {
    console.error("[review-email] Missing LOVABLE_API_KEY or RESEND_API_KEY; skipping notification");
    return;
  }

  try {
    const response = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableApiKey}`,
        "X-Connection-Api-Key": resendApiKey,
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `New ${data.rating}★ review from ${data.customerName}`,
        html: buildHtml(data),
        ...(data.email ? { reply_to: data.email } : {}),
      }),
    });

    if (!response.ok) {
      console.error(`[review-email] Resend failed [${response.status}]: ${await response.text()}`);
      return;
    }
    console.log("[review-email] Notification sent to", to);
  } catch (error) {
    console.error("[review-email] Notification error:", error);
  }
}
