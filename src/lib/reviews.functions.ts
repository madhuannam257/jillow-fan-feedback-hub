import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const reviewSchema = z.object({
  customerName: z.string().trim().min(2).max(80),
  jerseyProduct: z.string().trim().min(2).max(120),
  rating: z.number().int().min(1).max(5),
  howDidYouHear: z.string().trim().min(2).max(200),
  review: z.string().trim().min(10).max(2000),
  email: z.string().trim().max(254).email().optional().or(z.literal("")),
  photoPath: z.string().trim().max(300).optional().or(z.literal("")),
  website: z.string().max(0).optional(), // honeypot
});

export const submitReview = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => reviewSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // basic spam guard: identical review text submitted very recently
    const { count } = await supabaseAdmin
      .from("reviews")
      .select("id", { count: "exact", head: true })
      .eq("review", data.review)
      .gte("created_at", new Date(Date.now() - 60_000).toISOString());

    if ((count ?? 0) > 0) {
      throw new Error("Looks like this review was just submitted. Thank you!");
    }

    let photoUrl: string | null = null;
    if (data.photoPath) {
      const { data: signed } = await supabaseAdmin.storage
        .from("review-photos")
        .createSignedUrl(data.photoPath, 60 * 60 * 24 * 365);
      photoUrl = signed?.signedUrl ?? null;
    }

    const { error } = await supabaseAdmin.from("reviews").insert({
      customer_name: data.customerName,
      jersey_product: data.jerseyProduct,
      rating: data.rating,
      how_did_you_hear: data.howDidYouHear,
      review: data.review,
      email: data.email ? data.email : null,
      photo_url: photoUrl,
    });

    if (error) throw new Error("We couldn't save your review. Please try again.");

    return { ok: true as const };
  });
