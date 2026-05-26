// Base URL of the backend API. Override via client/.env (VITE_API_URL).
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

type ApiOptions = { token?: string };

/** POST JSON to the API. Throws an Error with the server's message on failure. */
export async function apiPost<T = unknown>(
  path: string,
  body: unknown,
  opts: ApiOptions = {}
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {}),
      },
      body: JSON.stringify(body),
    });
  } catch {
    // Network/connection error (e.g. backend not running)
    throw new Error("Can't reach the server. Please try again later.");
  }

  const data = (await res.json().catch(() => ({}))) as { message?: string };
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }
  return data as T;
}
