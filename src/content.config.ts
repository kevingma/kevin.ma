import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";
import { parse } from "yaml";

// Each data file is a plain YAML list. The loader needs an id per entry, so
// the position in the file is the id; that also keeps the file's order.
const list = (text: string) =>
  ((parse(text) ?? []) as Record<string, unknown>[]).map((entry, i) => ({
    ...entry,
    id: String(i).padStart(4, "0"),
  }));

const data = (name: string) => file(`src/data/${name}.yaml`, { parser: list });

// Strict, so a misspelled key fails the build. `id` is the one the loader adds.
const entry = <S extends z.ZodRawShape>(shape: S) => z.strictObject({ id: z.string(), ...shape });

const shelf = defineCollection({
  loader: data("shelf"),
  schema: entry({
    kind: z.enum(["book", "film", "article"]),
    title: z.string().min(1),
    creator: z.string().min(1).optional(),
    year: z.number().int().optional(),
    status: z.enum(["done", "now", "next"]),
    // Month only. No days are stored.
    finished: z
      .string()
      .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "use YYYY-MM")
      .optional(),
    rating: z.number().min(0.5).max(5).multipleOf(0.5).optional(),
    favorite: z.boolean().default(false),
  }).superRefine((e, ctx) => {
    const issue = (message: string) => ctx.addIssue({ code: "custom", message });
    if (e.status === "done" && !e.finished) issue("a done entry needs `finished`");
    if (e.status !== "done" && e.finished) issue("only a done entry has `finished`");
    if (e.status !== "done" && e.rating !== undefined) issue("only a done entry has a rating");
    if (e.status !== "done" && e.favorite) issue("only a done entry can be a favorite");
    if (e.kind === "article" && e.favorite) issue("articles can't be favorites");
  }),
});

// The wall at the top of the shelf: up to 4 per kind, in rank order. The cap
// is checked in src/lib/shelf.ts because it spans entries.
const favorites = defineCollection({
  loader: data("favorites"),
  schema: ({ image }) =>
    entry({
      kind: z.enum(["book", "film"]),
      title: z.string().min(1),
      creator: z.string().min(1).optional(),
      year: z.number().int().optional(),
      cover: image(),
    }),
});

const projects = defineCollection({
  loader: data("projects"),
  schema: entry({
    name: z.string().min(1),
    line: z.string().min(1),
    url: z.url().optional(),
  }),
});

const now = defineCollection({
  loader: data("now"),
  schema: entry({
    label: z.string().min(1).max(9),
    text: z.string().min(1),
  }),
});

export const collections = { shelf, favorites, projects, now };
