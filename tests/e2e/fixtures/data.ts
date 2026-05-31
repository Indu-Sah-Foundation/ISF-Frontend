// Deterministic fixture payloads that mirror the backend's JSON shapes.
// Keep these in sync with src/lib/api.ts response types.
//
// Articles use Paginated<T> { items, count, limit, offset }.
// Projects/gallery/achievements/volunteers/team use Listing<T> { items, count }.

export const articles = {
  items: [
    {
      id: "a1",
      slug: "free-dental-camp-mahottari",
      title: "Free Dental Camp in Mahottari",
      body_md:
        '<!-- thumbnail: https://example.com/poster-dental.jpg -->\n<p>We ran a two-day free dental camp serving over 500 patients.</p><img src="https://example.com/inline-dental.jpg" alt="camp" />',
      source_lang: "en",
      published_at: "2025-03-12T00:00:00Z",
      created_at: "2025-03-01T00:00:00Z",
      updated_at: "2025-03-12T00:00:00Z",
    },
    {
      id: "a2",
      slug: "isf-robotics-program",
      title: "ISF Robotics Program Launch",
      // No <!-- thumbnail --> and no <img> → must fall back to a local asset.
      body_md: "<p>Bringing FIRST LEGO League to rural Nepal.</p>",
      source_lang: "en",
      published_at: "2025-02-02T00:00:00Z",
      created_at: "2025-02-01T00:00:00Z",
      updated_at: "2025-02-02T00:00:00Z",
    },
    {
      id: "a3",
      slug: "winter-relief-drive",
      title: "Winter Relief Drive 2025",
      body_md:
        '<p>Distributing blankets across four districts.</p><img src="https://example.com/inline-relief.jpg" alt="relief" />',
      source_lang: "en",
      published_at: "2025-01-15T00:00:00Z",
      created_at: "2025-01-10T00:00:00Z",
      updated_at: "2025-01-15T00:00:00Z",
    },
  ],
  count: 3,
  limit: 20,
  offset: 0,
};

export const singleArticle = articles.items[0];

export const projects = {
  items: [
    {
      id: "p1",
      title: "Mobile Dental Clinic",
      slug: "mobile-dental-clinic",
      kind: "current",
      label: "Healthcare",
      lede: "A mobile dental clinic providing free oral healthcare.",
      blocks: [{ type: "paragraph", text: "Serving 3,000 community members." }],
      image_url: "",
      image_variant: "default",
      position: 0,
      published: true,
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-01-01T00:00:00Z",
    },
    {
      id: "p2",
      title: "STEM Robotics",
      slug: "stem-robotics",
      kind: "current",
      label: "Education",
      lede: "Hands-on robotics education to ignite curiosity.",
      blocks: [{ type: "paragraph", text: "LEGO Spike Prime in classrooms." }],
      image_url: "",
      image_variant: "alt",
      position: 1,
      published: true,
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-01-01T00:00:00Z",
    },
    {
      id: "p3",
      title: "Clean Water Initiative",
      slug: "clean-water",
      kind: "upcoming",
      label: "Infrastructure",
      lede: "Bringing clean water to remote villages.",
      blocks: [],
      image_url: "",
      image_variant: "default",
      position: 2,
      published: true,
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-01-01T00:00:00Z",
    },
  ],
  count: 3,
};

export const gallery = {
  items: [
    {
      id: "g1",
      src: "https://example.com/gallery-1.jpg",
      title: "Dental camp",
      caption: "Dental camp",
      size: "M",
      tags: ["health"],
      position: 0,
      published: true,
    },
    {
      id: "g2",
      src: "https://example.com/gallery-2.jpg",
      title: "Classroom",
      caption: "Classroom",
      size: "L",
      tags: ["education"],
      position: 1,
      published: true,
    },
  ],
  count: 2,
};

export const galleryTags = {
  items: [
    { id: "t1", name: "health", position: 0, created_at: "2025-01-01T00:00:00Z" },
    { id: "t2", name: "education", position: 1, created_at: "2025-01-01T00:00:00Z" },
  ],
  count: 2,
};

export const achievements = {
  items: [
    {
      id: "ac1",
      slot: "letter",
      title: "Municipality Appreciation Letter",
      organization: "Mahottari Municipality",
      place: "Mahottari, Nepal",
      body: "Recognized for the free dental camp serving the community.",
      image_url: "https://example.com/cert-1.jpg",
      awarded_at: "2025-01-01T00:00:00Z",
      position: 0,
      published: true,
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-01-01T00:00:00Z",
    },
  ],
  count: 1,
};

export const volunteers = {
  items: [
    {
      id: "v1",
      kind: "volunteer_field",
      name: "Asha Sharma",
      bio: "Field nurse supporting the mobile dental clinic.",
      image_url: "",
      position: 0,
      published: true,
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-01-01T00:00:00Z",
    },
  ],
  count: 1,
};

export const team = {
  items: [
    {
      id: "tm1",
      kind: "team",
      name: "Shubham Sah",
      bio: "Co-founder leading the foundation.",
      image_url: "",
      position: 0,
      published: true,
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-01-01T00:00:00Z",
    },
  ],
  count: 1,
};

export const donationAmounts = {
  amounts_cents: [1000, 2500, 5000, 10000],
  currency: "usd",
};

export const checkoutSession = {
  url: "https://checkout.stripe.com/c/pay/cs_test_mocksession",
  session_id: "cs_test_mocksession",
};

export const loginToken = {
  token: "header.payload.signature-mock-jwt-token-value",
  user: { id: "u1", email: "admin@test.local", role: "admin" },
};
