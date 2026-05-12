import { createFileRoute, Navigate } from "@tanstack/react-router";

// Canonical page is /events ("Projects").
export const Route = createFileRoute("/programs")({
  component: () => <Navigate to="/events" />,
});
