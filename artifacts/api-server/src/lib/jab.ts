import { createClient, type JabClient } from "@workspace/sdk/client";

let cached: JabClient | undefined;

export function getJabClient(): JabClient {
  if (cached) return cached;

  const wpUrl = process.env["WP_URL"];
  const user = process.env["WP_USER"];
  const password = process.env["WP_APP_PASSWORD"];

  if (!wpUrl || !user || !password) {
    throw new Error(
      "Missing WP credentials. Set WP_URL, WP_USER, WP_APP_PASSWORD in .env.local.",
    );
  }

  cached = createClient({ wpUrl, user, password });
  return cached;
}
