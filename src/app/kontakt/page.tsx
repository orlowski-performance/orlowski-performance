import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Unverbindliches Erstgespräch anfragen – Antwort innerhalb von 48 Stunden.",
};

export default function KontaktPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-section">
      <h1 className="text-3xl font-semibold tracking-tight">Erstgespräch</h1>
      <p className="mt-3 max-w-xl text-muted">
        Schreib kurz, wo du stehst und was du erreichen willst. Ich melde mich
        innerhalb von 48 Stunden.
      </p>
      <ContactForm />
    </section>
  );
}
