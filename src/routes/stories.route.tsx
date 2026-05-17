import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * Pathless layout for the /stories segment.
 *
 * TanStack's flat-file router treats `stories.index.tsx` and
 * `stories.$slug.tsx` as siblings under a parent `stories` route. Without an
 * explicit layout file here, the generated route tree references an
 * undefined `StoriesRoute` parent and the detail page (`/stories/$slug`)
 * mounts but renders nothing.
 *
 * This component is intentionally trivial — it just provides the mount
 * point (<Outlet />) so children show up.
 */
export const Route = createFileRoute("/stories")({
  component: () => <Outlet />,
});
