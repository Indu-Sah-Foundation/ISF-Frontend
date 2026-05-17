import { useEffect, useState } from "react";
import { getToken, setToken } from "./api";

export interface JwtClaims {
  uid: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

export function decodeToken(token: string | null): JwtClaims | null {
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")),
    );
    return payload as JwtClaims;
  } catch {
    return null;
  }
}

export function isExpired(claims: JwtClaims | null): boolean {
  if (!claims) return true;
  return Date.now() / 1000 >= claims.exp;
}

export function useAuth() {
  // Always start as logged-out on first render so SSR + client first paint
  // agree. We hydrate from localStorage in the effect below.
  const [claims, setClaims] = useState<JwtClaims | null>(null);

  useEffect(() => {
    setClaims(decodeToken(getToken()));
    const onStorage = () => setClaims(decodeToken(getToken()));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const refresh = () => setClaims(decodeToken(getToken()));
  const logout = () => {
    setToken(null);
    setClaims(null);
  };

  return {
    claims,
    isAuthenticated: !!claims && !isExpired(claims),
    isAdmin: !!claims && !isExpired(claims) && claims.role === "admin",
    refresh,
    logout,
  };
}
