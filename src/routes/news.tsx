import { createFileRoute, Navigate } from "@tanstack/react-router";

// Live site has /news; we publish news as Articles backed by the API.
export const Route = createFileRoute("/news")({
  component: () => <Navigate to="/stories" />,
});
