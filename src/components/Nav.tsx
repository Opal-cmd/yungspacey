"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { INSTAGRAM_URL } from "@/lib/site";
import { InstagramIcon } from "./InstagramIcon";

const links = [
  { href: "#soundbank", label: "Soundbank" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-transparent" />
      <div className="pointer-events-auto relative z-50 mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5 md:px-10">
        <a
          href="#hero"
          onClick={() => setOpen(false)}
          className="shrink-0 font-[family-name:var(--font-syne)] text-xs font-bold tracking-[0.14em] text-white uppercase transition-colors hover:text-accent-icy sm:text-sm sm:tracking-[0.2em]"
        >
          yungspacey
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center justify-end gap-6 md:flex md:gap-8"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 text-[11px] tracking-[0.22em] text-muted uppercase transition-colors hover:text-white active:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @yxngspacey"
            className="py-2 text-muted transition-colors hover:text-white active:text-white"
          >
            <InstagramIcon size={15} />
          </a>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @yxngspacey"
            className="flex h-11 w-11 items-center justify-center text-muted transition-colors active:text-white"
          >
            <InstagramIcon size={16} />
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px]"
          >
            <span
              className={`block h-px w-5 bg-white transition-transform duration-200 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-white transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-px w-5 bg-white transition-transform duration-200 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto fixed inset-0 z-40 md:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-0 border-b border-white/10 bg-black/95 px-4 pt-[calc(4.5rem+env(safe-area-inset-top))] pb-8 shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
              aria-label="Mobile"
            >
              <ul className="flex flex-col">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-14 items-center border-b border-white/[0.06] font-[family-name:var(--font-syne)] text-xl font-semibold tracking-tight text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
