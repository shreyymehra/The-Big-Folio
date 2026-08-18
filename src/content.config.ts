import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    index: z.number(),
    title: z.string(),
    subject: z.string(),
    teaser: z.string(),
    lead: z.string(),
    support: z.string().optional(),
    // "spec" discloses itself in the first line, per house rule.
    kind: z.enum(["spec", "real"]),
    status: z.enum(["published", "in-development"]),
    // Each scene owns one colour move. Kept in frontmatter so a case study
    // is fully described by its file.
    tone: z.enum(["light", "dark"]).default("light"),
    accent: z.string().optional(),
  }),
});

export const collections = { work };
