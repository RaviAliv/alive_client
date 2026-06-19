import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  type ReactNode,
} from "react";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role?: string;
  systemRole?: "user" | "admin" | "superadmin";
  isVerified?: boolean;
  avatar?: string;
} | null;

type AuthValue = {
  user: AuthUser;
  token: string | null;
  isLoggedIn: boolean;
  initialized: boolean;            // true once localStorage has been read
  sessionKicked: boolean;          // true when another device logged in
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  clearKicked: () => void;
};

const STORAGE_KEY = "star_auth";
const AuthContext = createContext<AuthValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token,         setToken]         = useState<string | null>(null);
  const [user,          setUser]          = useState<AuthUser>(null);
  const [sessionKicked, setSessionKicked] = useState(false);
  const [initialized,   setInitialized]   = useState(false);
  const tokenRef = useRef<string | null>(null); // always mirrors token without closure issues

  // Restore session from localStorage on first load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { token: string; user: AuthUser };
        setToken(parsed.token);
        tokenRef.current = parsed.token;
        setUser(parsed.user);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setInitialized(true);
    }
  }, []);

  // Validate the stored token against the server.
  // Runs on mount and whenever the tab regains focus (catches kicked sessions).
  useEffect(() => {
    const validate = async () => {
      const t = tokenRef.current;
      if (!t) return;

      try {
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${t}` },
        });

        if (res.status === 401) {
          let data: any = {};
          const text = await res.text();
          if (text) { try { data = JSON.parse(text); } catch {} }

          if (data.code === "SESSION_INVALIDATED") {
            setSessionKicked(true);
          }
          hardLogout();
        } else if (res.ok) {
          // Sync user object from server — catches role changes made after login
          try {
            const data = await res.json();
            if (data.user) {
              setUser(data.user);
              const raw = localStorage.getItem(STORAGE_KEY);
              if (raw) {
                const parsed = JSON.parse(raw) as { token: string; user: AuthUser };
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: parsed.token, user: data.user }));
              }
            }
          } catch { /* ignore parse errors */ }
        }
      } catch {
        // Network offline — don't log out, just wait
      }
    };

    validate();

    // Poll every 60s to catch session invalidation even when tab stays focused
    const interval = setInterval(validate, 60_000);

    const onFocus = () => validate();
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hardLogout = () => {
    setToken(null);
    tokenRef.current = null;
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const login = (newToken: string, newUser: AuthUser) => {
    setToken(newToken);
    tokenRef.current = newToken;
    setUser(newUser);
    setSessionKicked(false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: newToken, user: newUser }));
  };

  const logout = () => {
    // Best-effort server-side session invalidation
    if (tokenRef.current) {
      fetch("/api/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${tokenRef.current}` },
      }).catch(() => {});
    }
    hardLogout();
  };

  const clearKicked = () => setSessionKicked(false);

  return (
    <AuthContext.Provider
      value={{ user, token, isLoggedIn: !!token, initialized, sessionKicked, login, logout, clearKicked }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
