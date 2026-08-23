import logo from "@/assets/jillow-logo.jpg.asset.json";
import { Instagram, Mail, MessageCircle, ArrowRight } from "lucide-react";

const columns = [
  { title: "QUICK LINKS", items: ["Review", "About Us", "Contact"] },
  {
    title: "SUPPORT",
    items: ["FAQs", "Shipping Policy", "Returns & Exchanges", "Contact Us"],
  },
];

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              src={logo.url}
              alt="JILLOW CLUB"
              width={200}
              height={112}
              loading="lazy"
              className="h-11 w-auto rounded-sm"
            />
            <p className="mt-5 text-sm text-white/70">Premium jerseys for real fans.</p>
            <p className="text-sm text-white/70">Designed with passion.</p>
            <p className="text-sm text-white/70">Delivered with pride.</p>
            <div className="mt-5 flex gap-3">
              {[
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: MessageCircle, href: "https://wa.me/", label: "WhatsApp" },
                { icon: Mail, href: "#contact", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full border border-white/20 text-white/80 transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm tracking-[0.18em]">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#review"
                      className="text-sm text-white/70 transition-colors hover:text-primary"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm tracking-[0.18em]">STAY CONNECTED</h3>
            <p className="mt-5 text-sm text-white/70">
              Join our community and be the first to know about new drops and exclusive
              offers.
            </p>
            <form
              className="mt-5 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                e.currentTarget.reset();
              }}
            >
              <input
                type="email"
                required
                placeholder="Your email"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-primary"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid shrink-0 place-items-center rounded-lg bg-primary px-4 text-primary-foreground transition-colors hover:bg-primary-dark"
              >
                <ArrowRight className="size-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          © 2026 JILLOW CLUB. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
