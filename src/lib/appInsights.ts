import { ApplicationInsights } from "@microsoft/applicationinsights-web";


let ai: ApplicationInsights | null = null;

export function initAppInsights() {
  if (ai) return ai; 
  const connectionString = import.meta.env.VITE_APPINSIGHTS_CONNECTION_STRING;
  if (!connectionString) return null;

  ai = new ApplicationInsights({
    config: {
      connectionString,
      enableAutoRouteTracking: true,
      disableTelemetry:
        typeof window !== "undefined" &&
        window.location.hostname === "localhost",
    },
  });
  ai.loadAppInsights();
  ai.trackPageView();
  return ai;
}

export function getAppInsights() {
  return ai;
}
