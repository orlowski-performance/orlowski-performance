"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { submitContact, type ContactState } from "@/app/kontakt/actions";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);

  if (state.status === "success") {
    return (
      <p
        role="status"
        className="rounded-lg border border-line bg-paper-soft p-6 text-ink"
      >
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="mt-8 grid max-w-xl gap-5">
      <Field label="Name" name="name" autoComplete="name" />
      <Field label="E-Mail" name="email" type="email" autoComplete="email" />

      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          Worum geht es?
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          maxLength={4000}
          className="rounded-lg border border-line px-4 py-3"
        />
      </div>

      {/* Honeypot - vor Menschen und Screenreadern verborgen. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" name="consent" className="mt-1" required />
        <span>
          Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner
          Anfrage gespeichert werden. Details in der{" "}
          <Link href="/datenschutz" className="underline">
            Datenschutzerklärung
          </Link>
          .
        </span>
      </label>

      {state.status === "error" && (
        <p role="alert" className="text-sm font-medium text-accent">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        className="rounded-lg border border-line px-4 py-3"
      />
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="justify-self-start rounded-full bg-accent px-7 py-3 font-semibold text-paper transition-colors hover:bg-accent-dark disabled:opacity-60"
    >
      {pending ? "Wird gesendet …" : "Anfrage senden"}
    </button>
  );
}
