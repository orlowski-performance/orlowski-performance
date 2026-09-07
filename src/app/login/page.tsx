import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Anmelden",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ weiter?: string }>;
}) {
  const { weiter } = await searchParams;

  return (
    <section className="mx-auto max-w-6xl px-6 py-section">
      <h1 className="text-3xl font-semibold tracking-tight">Anmelden</h1>
      <p className="mt-3 max-w-md text-muted">
        Interner Bereich. Zugänge werden vergeben, eine Registrierung gibt es
        nicht.
      </p>
      <LoginForm weiter={weiter ?? "/intern"} />
    </section>
  );
}
