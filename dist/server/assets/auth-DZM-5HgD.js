import { r as reactExports } from "./server-Crqfv4f8.js";
import { g as getToken, s as setToken } from "./api-C6z2MzOX.js";
function decodeToken(token) {
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
    );
    return payload;
  } catch {
    return null;
  }
}
function isExpired(claims) {
  if (!claims) return true;
  return Date.now() / 1e3 >= claims.exp;
}
function useAuth() {
  const [claims, setClaims] = reactExports.useState(
    () => decodeToken(getToken())
  );
  reactExports.useEffect(() => {
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
    logout
  };
}
export {
  useAuth as u
};
