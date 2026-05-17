import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <Navigate to="/admin/articles" />,
});
