import { createFileRoute, Navigate } from "@tanstack/react-router";

// Canonical page is /volunteers ("ISF Volunteers").
export const Route = createFileRoute("/join-us")({
  component: () => <Navigate to="/volunteers" />,
});
