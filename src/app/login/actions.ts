"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type LoginState = { error?: string };

/**
 * Anmeldung mit E-Mail und Passwort.
 *
 * Es gibt bewusst keine oeffentliche Registrierung: Zugaenge werden in der
 * Supabase-Oberflaeche angelegt. Damit gibt es keine Selbstbedienung an einem
 * Bereich, hinter dem Kontaktanfragen liegen.
 */
export async function signIn(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const weiter = String(formData.get("weiter") ?? "/intern");

  if (!email || !password) {
    return { error: "Bitte E-Mail und Passwort eingeben." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Kein Hinweis darauf, ob die Adresse existiert - das waere eine Auskunft
    // ueber fremde Konten.
    return { error: "Anmeldung fehlgeschlagen. Bitte Angaben prüfen." };
  }

  revalidatePath("/", "layout");
  redirect(weiter.startsWith("/") ? weiter : "/intern");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
