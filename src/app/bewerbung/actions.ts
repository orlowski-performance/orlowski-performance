"use server";

import { createClient } from "@/lib/supabase/server";

export type ApplicationState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const PACKAGES = ["3-monate", "6-monate", "unentschieden"] as const;
const STARTS = ["sofort", "innerhalb-1-monat", "spaeter"] as const;

/**
 * Nimmt eine Bewerbung entgegen.
 *
 * Tritt an die Stelle des externen Google-Formulars: Die Daten bleiben in der
 * eigenen Datenbank, und der Besucher verlaesst die Seite nicht mehr.
 */
export async function submitApplication(
  _prev: ApplicationState,
  formData: FormData,
): Promise<ApplicationState> {
  if (formData.get("website")) return { status: "success" }; // Honeypot

  const get = (k: string, max: number) =>
    String(formData.get(k) ?? "").trim().slice(0, max);

  const name = get("name", 120);
  const email = get("email", 254);
  const goal = get("goal", 2000);

  if (!name || !email || !goal) {
    return { status: "error", message: "Name, E-Mail und dein Ziel brauche ich mindestens." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { status: "error", message: "Diese E-Mail-Adresse sieht nicht gültig aus." };
  }
  if (formData.get("consent") !== "on") {
    return { status: "error", message: "Ohne Einwilligung in die Datenverarbeitung geht es leider nicht." };
  }

  const paket = get("package", 20);
  const start = get("start_window", 30);

  const row = {
    name,
    email,
    phone: get("phone", 40) || null,
    goal,
    situation: get("situation", 2000) || null,
    constraints: get("constraints", 2000) || null,
    availability: get("availability", 200) || null,
    // Nur bekannte Werte durchlassen - die Auswahlfelder kommen aus dem Browser
    // und sind damit veraenderbar.
    package: (PACKAGES as readonly string[]).includes(paket) ? paket : null,
    start_window: (STARTS as readonly string[]).includes(start) ? start : null,
    message: get("message", 4000) || null,
  };

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("applications").insert(row);
    if (error) {
      console.error("Bewerbung konnte nicht gespeichert werden:", error.message);
      return {
        status: "error",
        message: "Das hat gerade nicht geklappt. Schreib mir bitte direkt per E-Mail.",
      };
    }
  } catch (cause) {
    console.error("Supabase nicht erreichbar:", cause);
    return {
      status: "error",
      message: "Das hat gerade nicht geklappt. Schreib mir bitte direkt per E-Mail.",
    };
  }

  return {
    status: "success",
    message:
      "Danke – deine Bewerbung ist da. Ich sehe sie mir an und melde mich innerhalb von 48 Stunden für ein Kennenlerngespräch.",
  };
}
