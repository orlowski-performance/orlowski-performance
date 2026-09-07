"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { submitApplication, type ApplicationState } from "@/app/bewerbung/actions";

const initial: ApplicationState = { status: "idle" };

/**
 * Bewerbungsfragebogen.
 *
 * Bewusst ein einziges Formular statt mehrerer Schritte: Ein Schrittassistent
 * verliert Eingaben, sobald der Browser neu laedt, und braucht Zustand im
 * Client. Gruppiert und mobil untereinander gelesen ist das hier robuster -
 * und ueber zwei Drittel der Besucher kommen laut Analyse vom Handy.
 */
export function ApplicationForm() {
  const [state, formAction] = useActionState(submitApplication, initial);

  if (state.status === "success") {
    return (
      <p role="status" className="mt-8 max-w-xl rounded-lg border border-line bg-paper-soft p-6">
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="mt-10 max-w-xl space-y-10">
      <Fieldset legend="Wer du bist">
        <Text name="name" label="Name" autoComplete="name" required />
        <Text name="email" label="E-Mail" type="email" autoComplete="email" required />
        <Text name="phone" label="Telefon (freiwillig)" type="tel" autoComplete="tel" />
      </Fieldset>

      <Fieldset legend="Wo du stehst">
        <Area
          name="goal"
          label="Was willst du erreichen?"
          required
          hint="Ein bis drei Sätze genügen. Je konkreter, desto besser kann ich einschätzen, ob ich helfen kann."
        />
        <Area
          name="situation"
          label="Wie sieht dein Training und deine Ernährung heute aus?"
          hint="Auch „gar nichts“ ist eine Antwort."
        />
        <Area
          name="constraints"
          label="Gibt es gesundheitliche Einschränkungen?"
          hint="Verletzungen, Beschwerden, ärztliche Vorgaben."
        />
        <Text
          name="availability"
          label="Wie viel Zeit hast du in der Woche?"
          hint="Zum Beispiel: dreimal 60 Minuten, abends."
        />
      </Fieldset>

      <Fieldset legend="Rahmen">
        <Select
          name="package"
          label="Welches Paket interessiert dich?"
          options={[
            ["unentschieden", "Noch unentschieden"],
            ["3-monate", "3 Monate"],
            ["6-monate", "6 Monate"],
          ]}
        />
        <Select
          name="start_window"
          label="Wann möchtest du anfangen?"
          options={[
            ["sofort", "So bald wie möglich"],
            ["innerhalb-1-monat", "Innerhalb des nächsten Monats"],
            ["spaeter", "Später"],
          ]}
        />
        <Area name="message" label="Sonst noch etwas?" />
      </Fieldset>

      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" name="consent" className="mt-1" required />
        <span>
          Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner
          Bewerbung gespeichert werden. Details in der{" "}
          <Link href="/datenschutz" className="underline">
            Datenschutzerklärung
          </Link>
          .
        </span>
      </label>

      {state.status === "error" && (
        <p role="alert" className="text-sm font-semibold">
          {state.message}
        </p>
      )}

      <Submit />
    </form>
  );
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-5">
      <legend className="text-lg font-semibold tracking-tight">{legend}</legend>
      {children}
    </fieldset>
  );
}

function Label({ name, label, hint }: { name: string; label: string; hint?: string }) {
  return (
    <>
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      {hint && (
        <p id={`${name}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
    </>
  );
}

function Text({
  name,
  label,
  hint,
  type = "text",
  autoComplete,
  required,
}: {
  name: string;
  label: string;
  hint?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <Label name={name} label={label} hint={hint} />
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-describedby={hint ? `${name}-hint` : undefined}
        className="rounded-lg border border-line px-4 py-3"
      />
    </div>
  );
}

function Area({
  name,
  label,
  hint,
  required,
}: {
  name: string;
  label: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <Label name={name} label={label} hint={hint} />
      <textarea
        id={name}
        name={name}
        rows={4}
        required={required}
        aria-describedby={hint ? `${name}-hint` : undefined}
        className="rounded-lg border border-line px-4 py-3"
      />
    </div>
  );
}

function Select({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: [string, string][];
}) {
  return (
    <div className="grid gap-2">
      <Label name={name} label={label} />
      <select id={name} name={name} className="rounded-lg border border-line px-4 py-3">
        {options.map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-brand px-7 py-3 font-semibold text-paper transition-colors hover:bg-brand-dark disabled:opacity-60"
    >
      {pending ? "Wird gesendet …" : "Bewerbung absenden"}
    </button>
  );
}
