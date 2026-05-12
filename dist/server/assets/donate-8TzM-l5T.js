import { r as reactExports, V as jsxRuntimeExports } from "./server-cqlUrkpC.js";
import { u as useQuery, a as api } from "./api-CN7HS6fA.js";
import { S as Subscribable, s as shallowEqualObjects, h as hashKey, g as getDefaultState, n as notifyManager, u as useQueryClient, a as noop, b as shouldThrowError } from "./router-Dff4uBNA.js";
import { S as SiteShell } from "./SiteShell-DYoRl1dq.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
var MutationObserver = class extends Subscribable {
  #client;
  #currentResult = void 0;
  #currentMutation;
  #mutateOptions;
  constructor(client, options) {
    super();
    this.#client = client;
    this.setOptions(options);
    this.bindMethods();
    this.#updateResult();
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    this.options = this.#client.defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      this.#client.getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: this.#currentMutation,
        observer: this
      });
    }
    if (prevOptions?.mutationKey && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (this.#currentMutation?.state.status === "pending") {
      this.#currentMutation.setOptions(this.options);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#currentMutation?.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    this.#updateResult();
    this.#notify(action);
  }
  getCurrentResult() {
    return this.#currentResult;
  }
  reset() {
    this.#currentMutation?.removeObserver(this);
    this.#currentMutation = void 0;
    this.#updateResult();
    this.#notify();
  }
  mutate(variables, options) {
    this.#mutateOptions = options;
    this.#currentMutation?.removeObserver(this);
    this.#currentMutation = this.#client.getMutationCache().build(this.#client, this.options);
    this.#currentMutation.addObserver(this);
    return this.#currentMutation.execute(variables);
  }
  #updateResult() {
    const state = this.#currentMutation?.state ?? getDefaultState();
    this.#currentResult = {
      ...state,
      isPending: state.status === "pending",
      isSuccess: state.status === "success",
      isError: state.status === "error",
      isIdle: state.status === "idle",
      mutate: this.mutate,
      reset: this.reset
    };
  }
  #notify(action) {
    notifyManager.batch(() => {
      if (this.#mutateOptions && this.hasListeners()) {
        const variables = this.#currentResult.variables;
        const onMutateResult = this.#currentResult.context;
        const context = {
          client: this.#client,
          meta: this.options.meta,
          mutationKey: this.options.mutationKey
        };
        if (action?.type === "success") {
          try {
            this.#mutateOptions.onSuccess?.(
              action.data,
              variables,
              onMutateResult,
              context
            );
          } catch (e) {
            void Promise.reject(e);
          }
          try {
            this.#mutateOptions.onSettled?.(
              action.data,
              null,
              variables,
              onMutateResult,
              context
            );
          } catch (e) {
            void Promise.reject(e);
          }
        } else if (action?.type === "error") {
          try {
            this.#mutateOptions.onError?.(
              action.error,
              variables,
              onMutateResult,
              context
            );
          } catch (e) {
            void Promise.reject(e);
          }
          try {
            this.#mutateOptions.onSettled?.(
              void 0,
              action.error,
              variables,
              onMutateResult,
              context
            );
          } catch (e) {
            void Promise.reject(e);
          }
        }
      }
      this.listeners.forEach((listener) => {
        listener(this.#currentResult);
      });
    });
  }
};
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
function DonatePage() {
  const amounts = useQuery({
    queryKey: ["donation-amounts"],
    queryFn: () => api.donationAmounts(),
    retry: 1
  });
  const [selected, setSelected] = reactExports.useState(null);
  const [custom, setCustom] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const fallbackAmounts = [1e3, 2500, 5e3, 1e4, 25e3];
  const choices = amounts.data?.amounts_cents ?? fallbackAmounts;
  const currency = (amounts.data?.currency ?? "usd").toUpperCase();
  const checkout = useMutation({
    mutationFn: () => {
      const cents = selected ?? (custom ? Math.round(parseFloat(custom) * 100) : 0);
      if (!cents || cents < 100) {
        throw new Error("Minimum donation is $1.00");
      }
      return api.checkout({
        amount_cents: cents,
        name: name || void 0,
        email: email || void 0
      });
    },
    onSuccess: (res) => {
      window.location.href = res.url;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-6 pt-20 pb-12 max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary text-xs uppercase tracking-[0.2em]", children: "Donate" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-7xl font-extrabold tracking-tighter mt-4 mb-6 text-balance", children: "Fund the next chapter." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-muted-foreground max-w-2xl", children: "100% goes to programs in Nepal. Donations are processed securely via Stripe — you'll be redirected to a hosted checkout." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 max-w-3xl mx-auto pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border p-8 md:p-12 space-y-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-4 block", children: [
          "Choose an amount (",
          currency,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-5 gap-2", children: choices.map((c) => {
          const active = selected === c;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
            setSelected(c);
            setCustom("");
          }, className: `py-4 font-display font-bold text-lg border transition-all ${active ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`, children: [
            "$",
            (c / 100).toFixed(0)
          ] }, c);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "custom", className: "font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3 block", children: "Or enter a custom amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border focus-within:border-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 font-display font-bold text-lg text-muted-foreground", children: "$" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "custom", type: "number", min: "1", step: "1", placeholder: "0", value: custom, onChange: (e) => {
            setCustom(e.target.value);
            setSelected(null);
          }, className: "w-full py-4 bg-transparent outline-none font-display font-bold text-lg" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name (optional)", value: name, onChange: setName, type: "text", placeholder: "Your name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email (optional)", value: email, onChange: setEmail, type: "email", placeholder: "you@example.com" })
      ] }),
      checkout.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive font-mono", children: checkout.error.message }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => checkout.mutate(), disabled: checkout.isPending, className: "w-full bg-primary text-primary-foreground py-5 font-display font-extrabold uppercase tracking-[0.2em] text-sm hover:brightness-110 transition-all disabled:opacity-50", children: checkout.isPending ? "Redirecting..." : "Continue to checkout →" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center font-mono", children: "Secure payment via Stripe. Indu Sah Foundation, Loharpatti, Nepal." })
    ] }) })
  ] });
}
function Field({
  label,
  value,
  onChange,
  type,
  placeholder
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, value, placeholder, onChange: (e) => onChange(e.target.value), className: "w-full py-3 px-4 bg-background border border-border focus:border-primary outline-none font-display" })
  ] });
}
export {
  DonatePage as component
};
