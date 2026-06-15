// In dev, Vite proxies /api → http://localhost:8080 (see vite.config.js).
// In production, Nginx proxies /api → backend.
const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

type ApiOptions = { token?: string };

const getStoredToken = (): string | null => {
  try {
    const raw = localStorage.getItem("star_auth");
    return raw ? (JSON.parse(raw) as { token: string }).token : null;
  } catch {
    return null;
  }
};

export const getToken = getStoredToken;

function authHeaders(opts: ApiOptions = {}): Record<string, string> {
  const token = opts.token ?? getStoredToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function parseResponse<T>(res: Response): Promise<T> {
  const data = (await res.json().catch(() => ({}))) as { message?: string };
  if (!res.ok) throw new Error(data.message || "Something went wrong. Please try again.");
  return data as T;
}

/** GET — auto-attaches stored auth token. */
export async function apiGet<T = unknown>(path: string, opts: ApiOptions = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, { headers: authHeaders(opts) });
  } catch {
    throw new Error("Can't reach the server. Please try again later.");
  }
  return parseResponse<T>(res);
}

/** POST JSON — auto-attaches stored auth token. */
export async function apiPost<T = unknown>(path: string, body: unknown, opts: ApiOptions = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders(opts) },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Can't reach the server. Please try again later.");
  }
  return parseResponse<T>(res);
}

/** PATCH JSON — auto-attaches stored auth token. */
export async function apiPatch<T = unknown>(path: string, body: unknown, opts: ApiOptions = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...authHeaders(opts) },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Can't reach the server. Please try again later.");
  }
  return parseResponse<T>(res);
}

/** DELETE — auto-attaches stored auth token. */
export async function apiDelete<T = unknown>(path: string, opts: ApiOptions = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method: "DELETE",
      headers: authHeaders(opts),
    });
  } catch {
    throw new Error("Can't reach the server. Please try again later.");
  }
  return parseResponse<T>(res);
}
