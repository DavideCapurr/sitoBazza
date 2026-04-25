"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function ContactForm({ to }: { to: string }) {
  const t = useTranslations("contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Richiesta informazioni — ${name}`);
    const body = encodeURIComponent(
      `${message}\n\n—\n${name}\n${email}`,
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  }

  const inputBase =
    "w-full rounded-md border border-[--color-line] bg-white px-4 py-3 text-sm text-[--color-ink] placeholder:text-[--color-muted] focus:border-[--color-brand-gold] focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div>
        <label htmlFor="cf-name" className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-[--color-muted]">
          {t("nameLabel")}
        </label>
        <input
          id="cf-name"
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputBase}
        />
      </div>
      <div>
        <label htmlFor="cf-email" className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-[--color-muted]">
          {t("emailLabel")}
        </label>
        <input
          id="cf-email"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputBase}
        />
      </div>
      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-[--color-muted]">
          {t("messageLabel")}
        </label>
        <textarea
          id="cf-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputBase}
        />
      </div>
      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center gap-2 self-start rounded-full bg-[--color-brand-gold] px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-[--color-brand-brass]"
      >
        {t("submit")}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}
