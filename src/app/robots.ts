import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Die alte Seite sperrte über die Standard-robots.txt von Cloudflare sämtliche
 * KI-Systeme aus - GPTBot, ClaudeBot, Google-Extended und weitere. Wer ChatGPT
 * nach einem Coach in Düsseldorf fragt, bekam die Seite deshalb nie zu sehen.
 * Hier ist ausdrücklich alles offen.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/intern/"] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
