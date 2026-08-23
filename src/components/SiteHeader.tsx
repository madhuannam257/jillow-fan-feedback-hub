import logo from "@/assets/jillow-logo.jpg.asset.json";
import { Instagram, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "REVIEW", href: "#review" },
  { label: "ABOUT US", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#review" className="flex shrink-0 items-center">
          <img
            src={logo.url}
            alt="JILLOW CLUB"
            width={160}
            height={90}
            className="h-9 w-auto rounded-sm sm:h-11"
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-sm font-semibold tracking-[0.18em] text-white/80 transition-colors hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="JILLOW CLUB on Instagram"
            className="grid size-9 place-items-center rounded-full border border-white/20 text-white/80 transition-all hover:border-primary hover:text-primary"
          >
            <Instagram className="size-4" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-md bg-primary px-4 py-2.5 text-xs font-bold tracking-[0.14em] text-primary-foreground shadow-red transition-transform hover:-translate-y-0.5 hover:bg-primary-dark sm:inline-flex"
          >
            SHOP OUR JERSEYS
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-md border border-white/20 text-white md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/10 px-4 py-3 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2.5 text-sm font-semibold tracking-[0.18em] text-white/80 hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="mt-2 rounded-md bg-primary px-4 py-2.5 text-center text-xs font-bold tracking-[0.14em] text-primary-foreground sm:hidden"
          >
            SHOP OUR JERSEYS
          </a>
        </nav>
      )}
    </header>
  );
}
