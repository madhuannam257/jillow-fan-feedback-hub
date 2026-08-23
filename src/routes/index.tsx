import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Truck, RefreshCw, HeartHandshake } from "lucide-react";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ReviewForm } from "@/components/ReviewForm";
import jerseyBlack from "@/assets/jersey-black-7.jpg";
import jerseyRed from "@/assets/jersey-red-16.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JILLOW CLUB — Share Your Jersey Review" },
      {
        name: "description",
        content:
          "Tell the JILLOW CLUB family about your jersey. Rate the quality, fit and delivery — your feedback fuels our passion.",
      },
      { property: "og:title", content: "JILLOW CLUB — Share Your Jersey Review" },
      {
        property: "og:description",
        content:
          "Real people. Real reviews. Real impact. Share your JILLOW CLUB jersey experience with us.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const benefits = [
  { icon: ShieldCheck, title: "PREMIUM QUALITY", text: "Top notch quality in every stitch." },
  { icon: Truck, title: "FAST DELIVERY", text: "Quick and reliable shipping." },
  { icon: RefreshCw, title: "EASY RETURNS", text: "Hassle-free returns within 7 days." },
  { icon: HeartHandshake, title: "CUSTOMER FIRST", text: "We're here for you, always." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <section id="review" className="relative overflow-hidden bg-hero-glow">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:py-20">
            <ReviewForm />

            <div id="about" className="flex flex-col justify-center">
              <h2 className="text-4xl leading-[1.05] sm:text-5xl xl:text-6xl">
                <span className="block text-white">REAL PEOPLE.</span>
                <span className="block text-primary">REAL REVIEWS.</span>
                <span className="block text-white">REAL IMPACT.</span>
              </h2>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/70">
                We don't just sell jerseys, we build a community. Your feedback fuels our
                passion. Thank you for being part of the JILLOW CLUB family!
              </p>

              <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6">
                {[
                  { src: jerseyBlack, alt: "JILLOW CLUB black jersey number 7" },
                  { src: jerseyRed, alt: "JILLOW CLUB red jersey number 16" },
                ].map((jersey) => (
                  <div
                    key={jersey.alt}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                  >
                    <img
                      src={jersey.src}
                      alt={jersey.alt}
                      width={912}
                      height={1104}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-3">
                <Icon className="mt-0.5 size-6 shrink-0 text-primary-foreground" strokeWidth={1.5} />
                <div>
                  <h3 className="text-sm tracking-[0.14em] text-primary-foreground">{title}</h3>
                  <p className="mt-1 text-sm text-primary-foreground/80">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
