import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Frischt die Supabase-Session bei jeder Anfrage auf und schuetzt /intern.
 *
 * Der Aufruf von getUser() ist hier Absicht und darf nicht durch getSession()
 * ersetzt werden: getSession() glaubt dem Cookie, getUser() prueft das Token
 * gegen Supabase. Nur das zweite haelt einer gefaelschten Cookie stand.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && request.nextUrl.pathname.startsWith("/intern")) {
    const login = request.nextUrl.clone();
    login.pathname = "/login";
    login.searchParams.set("weiter", request.nextUrl.pathname);
    return NextResponse.redirect(login);
  }

  return response;
}
