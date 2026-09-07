"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signIn, type LoginState } from "@/app/login/actions";

export function LoginForm({ weiter }: { weiter: string }) {
  const [state, formAction] = useActionState(signIn, {} as LoginState);

  return (
    <form action={formAction} className="mt-8 grid max-w-sm gap-5">
      <input type="hidden" name="weiter" value={weiter} />

      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          E-Mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="rounded-lg border border-line px-4 py-3"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="password" className="text-sm font-medium">
          Passwort
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="rounded-lg border border-line px-4 py-3"
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm font-medium text-ink">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="justify-self-start rounded-full bg-brand px-7 py-3 font-semibold text-paper transition-colors hover:bg-brand-dark disabled:opacity-60"
    >
      {pending ? "Wird geprüft …" : "Anmelden"}
    </button>
  );
}
