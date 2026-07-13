"use client";

import { INSTAGRAM_URL } from "@/lib/site";
import { InstagramIcon } from "./InstagramIcon";

const links = [
  { href: "#soundbank", label: "Soundbank" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-transparent" />
      <div className="pointer-events-auto relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5 md:px-10">
        <a
          href="#hero"
          className="shrink-0 font-[family-name:var(--font-syne)] text-xs font-bold tracking-[0.18em] text-white uppercase transition-colors hover:text-accent-icy sm:text-sm sm:tracking-[0.2em]"
        >
          yungspacey
        </a>
        <nav
          aria-label="Primary"
          className="flex min-w-0 items-center justify-end gap-3 overflow-x-auto sm:gap-6 md:gap-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 py-2 text-[10px] tracking-[0.14em] text-muted uppercase transition-colors hover:text-white active:text-white sm:text-[11px] sm:tracking-[0.22em]"
            >
              {link.label}
            </a>
          ))}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @yxngspacey"
            className="shrink-0 py-2 text-muted transition-colors hover:text-white active:text-white"
          >
            <InstagramIcon size={15} />
          </a>
        </nav>
      </div>
    </header>
  );
}
