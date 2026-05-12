import { O as useRouter, r as reactExports, V as jsxRuntimeExports } from "./server-Crqfv4f8.js";
import { u as useMutation } from "./useMutation-C2_EPMqf.js";
import { L as Logo } from "./Logo-CLEyNjjI.js";
import { a as api } from "./api-C6z2MzOX.js";
import { u as useAuth } from "./auth-DZM-5HgD.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-Dv_1nnSX.js";
function LoginPage() {
  const router = useRouter();
  const {
    isAdmin,
    refresh
  } = useAuth();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (isAdmin) router.navigate({
      to: "/admin/articles"
    });
  }, [isAdmin, router]);
  const login = useMutation({
    mutationFn: () => api.login(email, password),
    onSuccess: () => {
      refresh();
      router.navigate({
        to: "/admin/articles"
      });
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex flex-col items-center justify-center bg-background px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: "Administration" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      login.mutate();
    }, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", type: "email", value: email, onChange: setEmail, autoComplete: "email", autoFocus: true, required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Password", type: "password", value: password, onChange: setPassword, autoComplete: "current-password", required: true }),
      login.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-destructive", children: login.error.message }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: login.isPending || !email || !password, className: "w-full bg-primary text-primary-foreground py-4 font-display font-extrabold uppercase tracking-[0.2em] text-xs hover:brightness-110 transition-all disabled:opacity-50", children: login.isPending ? "Signing in…" : "Sign in" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-10 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: "Restricted access" })
  ] }) });
}
function Field({
  label,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...rest, onChange: (e) => rest.onChange(e.target.value), className: "w-full py-3 px-4 bg-background border border-border focus:border-primary outline-none font-display" })
  ] });
}
export {
  LoginPage as component
};
