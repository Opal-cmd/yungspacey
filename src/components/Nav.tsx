"use client";

import { motion } from "framer-motion";

const links = [
  { href: "#soundbank", label: "Soundbank" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
    >
      <div className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <a
          href="#hero"
          className="font-[family-name:var(--font-syne)] text-sm font-bold tracking-[0.2em] text-white uppercase transition-colors hover:text-accent-icy"
        >
          yungspacey
        </a>
        <nav className="hidden items-center gap-8 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] tracking-[0.22em] text-muted uppercase transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
