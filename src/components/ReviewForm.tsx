import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Send, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { submitReview } from "@/lib/reviews.functions";
import { StarRating } from "./StarRating";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/jpg", "image/png"];

const labelClass =
  "block text-[11px] font-bold tracking-[0.18em] text-ink-soft mb-2";
const inputClass =
  "w-full rounded-lg border border-border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10";

export function ReviewForm() {
  const send = useServerFn(submitReview);
  const [rating, setRating] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError(null);

    const form = event.currentTarget;
    const fd = new FormData(form);
    const get = (key: string) => String(fd.get(key) ?? "").trim();

    if (!get("customerName") || !get("jerseyProduct") || !get("howDidYouHear")) {
      setError("Please fill in all required fields.");
      return;
    }
    if (get("review").length < 10) {
      setError("Please tell us a little more in your review (min 10 characters).");
      return;
    }
    if (!rating) {
      setError("Please select a star rating.");
      return;
    }
    if (file) {
      if (!ALLOWED.includes(file.type)) {
        setError("Photo must be a JPG, JPEG or PNG file.");
        return;
      }
      if (file.size > MAX_BYTES) {
        setError("Photo must be smaller than 5 MB.");
        return;
      }
    }

    setBusy(true);
    try {
      let photoPath = "";
      if (file) {
        const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
        photoPath = `${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("review-photos")
          .upload(photoPath, file, { contentType: file.type, upsert: false });
        if (uploadError) throw new Error("We couldn't upload your photo. Please try again.");
      }

      await send({
        data: {
          customerName: get("customerName"),
          jerseyProduct: get("jerseyProduct"),
          rating,
          howDidYouHear: get("howDidYouHear"),
          review: get("review"),
          email: get("email"),
          photoPath,
          website: get("website"),
        },
      });

      setDone(true);
      form.reset();
      setRating(0);
      setFile(null);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl bg-card p-8 text-center shadow-card sm:p-12">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10">
          <CheckCircle2 className="size-9 text-primary" />
        </div>
        <h2 className="mt-6 text-2xl text-ink sm:text-3xl">THANK YOU FOR YOUR REVIEW!</h2>
        <p className="mt-3 text-[15px] text-muted-foreground">
          Your feedback means a lot to the JILLOW CLUB family.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-8 rounded-lg bg-primary px-6 py-3 text-xs font-bold tracking-[0.16em] text-primary-foreground shadow-red transition-transform hover:-translate-y-0.5 hover:bg-primary-dark"
        >
          WRITE ANOTHER REVIEW
        </button>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-card p-6 shadow-card sm:p-9">
      <div className="absolute -right-16 -top-16 size-44 rounded-full bg-primary/10" />
      <div className="relative">
        <div className="h-1.5 w-16 rounded-full bg-primary" />
        <h1 className="mt-5 text-3xl text-ink sm:text-4xl">REVIEW</h1>
        <p className="mt-3 text-[15px] font-semibold text-ink-soft">
          Loved your jersey? We'd love to hear from you!
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Your feedback helps JILLOW CLUB grow and serve you better.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div>
            <label className={labelClass} htmlFor="customerName">
              YOUR NAME*
            </label>
            <input
              id="customerName"
              name="customerName"
              maxLength={80}
              placeholder="Enter your name"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="jerseyProduct">
              JERSEY / PRODUCT*
            </label>
            <input
              id="jerseyProduct"
              name="jerseyProduct"
              maxLength={120}
              placeholder="e.g. Barcelona Home Jersey"
              className={inputClass}
            />
          </div>

          <div>
            <span className={labelClass}>RATING*</span>
            <StarRating value={rating} onChange={setRating} />
          </div>

          <div>
            <label className={labelClass} htmlFor="howDidYouHear">
              HOW DID YOU HEAR ABOUT US?*
            </label>
            <input
              id="howDidYouHear"
              name="howDidYouHear"
              maxLength={200}
              placeholder="Tell us how you got to know about JILLOW CLUB"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="review">
              YOUR REVIEW*
            </label>
            <textarea
              id="review"
              name="review"
              rows={5}
              maxLength={2000}
              placeholder="Share your experience with the product, quality, fit, delivery, etc."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <span className={labelClass}>UPLOAD PHOTO (OPTIONAL)</span>
            <label
              htmlFor="photo"
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border bg-muted/60 px-4 py-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-ink"
            >
              <Upload className="size-4 shrink-0" />
              <span className="truncate">
                {file ? file.name : "JPG, JPEG or PNG — max 5 MB"}
              </span>
            </label>
            <input
              id="photo"
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              className="sr-only"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="email">
              YOUR EMAIL (OPTIONAL)
            </label>
            <input
              id="email"
              name="email"
              type="email"
              maxLength={254}
              placeholder="Enter your email"
              className={inputClass}
            />
          </div>

          {error && (
            <p className="flex items-start gap-2 rounded-lg bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-bold tracking-[0.16em] text-primary-foreground shadow-red transition-all hover:-translate-y-0.5 hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {busy ? "SENDING..." : "SUBMIT REVIEW"}
            <Send className="size-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
