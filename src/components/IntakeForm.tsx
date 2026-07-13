"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type FormEvent } from "react";
import {
  INTAKE_SERVICES,
  validateIntake,
  type IntakeFieldErrors,
  type IntakePayload,
} from "@/lib/intake";

const initialValues: IntakePayload = {
  artistName: "",
  instagram: "",
  service: "",
  description: "",
  demoLink: "",
};

const fieldClass =
  "min-h-12 w-full border bg-black/60 px-4 py-3 text-base text-white outline-none transition-[border-color,box-shadow] placeholder:text-white/30 focus:border-accent/50 focus:shadow-[0_0_0_1px_rgba(167,139,250,0.25)]";

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="mt-2 text-[11px] tracking-wide text-red-300/90"
          role="alert"
        >
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

export function IntakeForm() {
  const reduce = useReducedMotion();
  const [values, setValues] = useState<IntakePayload>(initialValues);
  const [errors, setErrors] = useState<IntakeFieldErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof IntakePayload, boolean>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function updateField<K extends keyof IntakePayload>(
    key: K,
    value: IntakePayload[K],
  ) {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      if (touched[key] || errors[key]) {
        const nextErrors = validateIntake(next);
        setErrors((e) => ({ ...e, [key]: nextErrors[key] }));
      }
      return next;
    });
  }

  function handleBlur(key: keyof IntakePayload) {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const nextErrors = validateIntake(values);
    setErrors((prev) => ({ ...prev, [key]: nextErrors[key] }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validateIntake(values);
    setErrors(nextErrors);
    setTouched({
      artistName: true,
      instagram: true,
      service: true,
      description: true,
      demoLink: true,
    });
    setSubmitError(null);

    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        errors?: IntakeFieldErrors;
      };

      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        setSubmitError(data.error ?? "Something went wrong. Try again.");
        return;
      }

      setSuccess(true);
    } catch {
      setSubmitError("Network error. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitError(null);
    setSuccess(false);
  }

  return (
    <div className="relative overflow-hidden border border-white/12 bg-obsidian/95 shadow-[0_0_0_1px_rgba(167,139,250,0.08),0_0_60px_rgba(139,92,246,0.14)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-40 w-[80%] -translate-x-1/2 opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.22), transparent 70%)",
        }}
      />

      <div className="relative min-h-[28rem] p-4 sm:p-6 md:p-10">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={
                reduce ? { opacity: 1 } : { opacity: 0, scale: 0.94, y: 12 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex min-h-[24rem] flex-col items-center justify-center px-4 text-center"
              role="status"
              aria-live="polite"
            >
              <motion.div
                initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.12,
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                }}
                className="mb-8 flex h-14 w-14 items-center justify-center border border-accent/40 bg-accent/10 text-accent-icy shadow-[0_0_28px_rgba(139,92,246,0.35)]"
                aria-hidden
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                </svg>
              </motion.div>
              <p className="font-[family-name:var(--font-syne)] text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                Project Received.
              </p>
              <p className="mt-3 font-[family-name:var(--font-syne)] text-lg font-semibold tracking-tight text-accent-icy sm:text-xl">
                Let&apos;s Build.
              </p>
              <p className="mt-5 max-w-sm text-sm text-muted">
                Your intake hit the inbox. Expect a reply with next steps soon.
              </p>
              <motion.button
                type="button"
                onClick={resetForm}
                whileHover={reduce ? undefined : { scale: 1.03 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                className="mt-10 inline-flex min-h-11 items-center border border-white/20 bg-white/[0.03] px-5 text-[11px] tracking-[0.22em] text-white uppercase"
              >
                [ SEND ANOTHER ]
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              onSubmit={handleSubmit}
              noValidate
              className="grid gap-5 sm:gap-6 md:grid-cols-2"
              aria-label="Project intake and booking form"
            >
              <label className="block md:col-span-1">
                <span className="mb-2 block text-[10px] tracking-[0.22em] text-muted uppercase">
                  Artist / Stage Name
                </span>
                <input
                  type="text"
                  name="artistName"
                  autoComplete="nickname"
                  placeholder="YungSpacey"
                  value={values.artistName}
                  onChange={(e) => updateField("artistName", e.target.value)}
                  onBlur={() => handleBlur("artistName")}
                  aria-invalid={Boolean(errors.artistName)}
                  className={`${fieldClass} ${
                    errors.artistName ? "border-red-400/50" : "border-white/10"
                  }`}
                />
                <FieldError message={errors.artistName} />
              </label>

              <label className="block md:col-span-1">
                <span className="mb-2 block text-[10px] tracking-[0.22em] text-muted uppercase">
                  Instagram Handle
                </span>
                <input
                  type="text"
                  name="instagram"
                  autoComplete="off"
                  placeholder="@yungspacey"
                  value={values.instagram}
                  onChange={(e) => updateField("instagram", e.target.value)}
                  onBlur={() => handleBlur("instagram")}
                  aria-invalid={Boolean(errors.instagram)}
                  className={`${fieldClass} ${
                    errors.instagram ? "border-red-400/50" : "border-white/10"
                  }`}
                />
                <FieldError message={errors.instagram} />
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-[10px] tracking-[0.22em] text-muted uppercase">
                  Service Needed
                </span>
                <div className="relative">
                  <select
                    name="service"
                    value={values.service}
                    onChange={(e) => updateField("service", e.target.value)}
                    onBlur={() => handleBlur("service")}
                    aria-invalid={Boolean(errors.service)}
                    className={`${fieldClass} appearance-none pr-10 ${
                      values.service ? "text-white" : "text-white/35"
                    } ${errors.service ? "border-red-400/50" : "border-white/10"}`}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {INTAKE_SERVICES.map((s) => (
                      <option
                        key={s.value}
                        value={s.value}
                        className="bg-black text-white"
                      >
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <span
                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted"
                    aria-hidden
                  >
                    ▾
                  </span>
                </div>
                <FieldError message={errors.service} />
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-[10px] tracking-[0.22em] text-muted uppercase">
                  Project Description &amp; Reference Tracks
                </span>
                <textarea
                  name="description"
                  rows={5}
                  placeholder="Vibe, references, deadlines, what you need locked in..."
                  value={values.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  onBlur={() => handleBlur("description")}
                  aria-invalid={Boolean(errors.description)}
                  className={`${fieldClass} min-h-[8rem] resize-y ${
                    errors.description
                      ? "border-red-400/50"
                      : "border-white/10"
                  }`}
                />
                <FieldError message={errors.description} />
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-[10px] tracking-[0.22em] text-muted uppercase">
                  Demo / Stem Link
                </span>
                <input
                  type="text"
                  name="demoLink"
                  inputMode="url"
                  placeholder="Google Drive, Dropbox, or WeTransfer link"
                  value={values.demoLink}
                  onChange={(e) => updateField("demoLink", e.target.value)}
                  onBlur={() => handleBlur("demoLink")}
                  aria-invalid={Boolean(errors.demoLink)}
                  className={`${fieldClass} ${
                    errors.demoLink ? "border-red-400/50" : "border-white/10"
                  }`}
                />
                <FieldError message={errors.demoLink} />
              </label>

              <div className="flex flex-col gap-4 pt-2 md:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-[10px] leading-relaxed tracking-[0.14em] text-muted uppercase sm:tracking-[0.18em]">
                    All fields required · Sent directly to inbox
                  </p>
                  <AnimatePresence>
                    {submitError ? (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-2 text-[11px] text-red-300/90"
                        role="alert"
                      >
                        {submitError}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </div>
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={
                    reduce || submitting ? undefined : { scale: 1.04 }
                  }
                  whileTap={
                    reduce || submitting ? undefined : { scale: 0.97 }
                  }
                  className="inline-flex min-h-12 w-full items-center justify-center border border-accent/40 bg-accent/10 px-6 py-3.5 text-[11px] tracking-[0.22em] text-accent-icy uppercase shadow-[0_0_24px_rgba(139,92,246,0.2)] transition-colors hover:border-accent/60 hover:bg-accent/15 disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:tracking-[0.28em]"
                >
                  {submitting ? "[ SENDING... ]" : "[ SUBMIT PROJECT ]"}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
