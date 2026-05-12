import { createFileRoute, Navigate } from "@tanstack/react-router";

// Live site labels this page "WHAT WE DO : GALLERY"; we serve it at /gallery.
export const Route = createFileRoute("/our-work")({
  component: () => <Navigate to="/gallery" />,
});
