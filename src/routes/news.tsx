import { createFileRoute, Navigate } from "@tanstack/react-router";

// Canonical page is /stories ("Letters from the Foundation").
export const Route = createFileRoute("/news")({
  component: () => <Navigate to="/stories" />,
});
