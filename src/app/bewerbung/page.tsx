import type { Metadata } from "next";
import { ApplicationForm } from "@/components/application-form";

export const metadata: Metadata = {
  title: "Unverbindlich bewerben",
  description:
    "Fragebogen für ein unverbindliches Kennenlerngespräch – Antwort innerhalb von 48 Stunden.",
  alternates: { canonical: "/bewerbung" },
};

export default function BewerbungPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-section">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Unverbindlich bewerben
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        Der Fragebogen dauert etwa fünf Minuten. Danach melde ich mich innerhalb
        von 48 Stunden für ein Kennenlerngespräch – kostenlos und unverbindlich.
      </p>
      <p className="mt-4 max-w-xl text-muted">
        Es entsteht dadurch keine Zahlungspflicht. Ob und wie wir zusammen
        arbeiten, besprechen wir erst im Gespräch.
      </p>
      <ApplicationForm />
    </section>
  );
}
