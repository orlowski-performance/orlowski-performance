"use server";

import { createClient } from "@/lib/supabase/server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const MAX = { name: 120, email: 254, message: 4000 } as const;

/**
 * Nimmt eine Kontaktanfrage entgegen und legt sie in Supabase ab.
 *
 * Geschrieben wird mit dem anon key. Die Tabelle erlaubt per RLS ausschliesslich
 * INSERT - lesen kann die Anfragen nur, wer in Supabase angemeldet ist. Der
 * Service-Role-Key hat hier nichts zu suchen.
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: Ein fuer Menschen unsichtbares Feld. Ist es gefuellt, war es ein Bot.
  if (typeof formData.get("website") === "string" && formData.get("website")) {
    return { status: "success" };
  }

  const name = str(formData.get("name")).slice(0, MAX.name);
  const email = str(formData.get("email")).slice(0, MAX.email);
  const message = str(formData.get("message")).slice(0, MAX.message);
  const consent = formData.get("consent") === "on";

  if (!name || !email || !message) {
    return { status: "error", message: "Bitte fülle alle Felder aus." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { status: "error", message: "Diese E-Mail-Adresse sieht nicht gültig aus." };
  }
  if (!consent) {
    return {
      status: "error",
      message: "Ohne Einwilligung in die Datenverarbeitung geht es leider nicht.",
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("leads")
      .insert({ name, email, message });

    if (error) {
      console.error("Kontaktanfrage konnte nicht gespeichert werden:", error.message);
      return {
        status: "error",
        message:
          "Das hat gerade nicht geklappt. Schreib mir bitte direkt per E-Mail.",
      };
    }
  } catch (cause) {
    console.error("Supabase nicht erreichbar:", cause);
    return {
      status: "error",
      message:
        "Das hat gerade nicht geklappt. Schreib mir bitte direkt per E-Mail.",
    };
  }

  return {
    status: "success",
    message: "Danke – deine Anfrage ist da. Ich melde mich innerhalb von 48 Stunden.",
  };
}

function str(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}
