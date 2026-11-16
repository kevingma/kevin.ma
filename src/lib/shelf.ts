import { type CollectionEntry, getCollection } from "astro:content";

export type Item = CollectionEntry<"shelf">["data"];
type Name = "shelf" | "favorites" | "projects" | "now";

const WALL_KINDS = ["book", "film", "tv"] as const;
const WALL_CAP = 4;
const WALL_LABEL = { book: "books", film: "films", tv: "tv" } as const;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const VERB = { book: "reading", article: "reading", film: "watching", tv: "watching" } as const;

/** Entries of a collection in the order they are written in the file. */
async function inFileOrder<C extends Name>(name: C): Promise<CollectionEntry<C>["data"][]> {
  const entries: CollectionEntry<C>[] = await getCollection(name);
  return entries.sort((a, b) => a.id.localeCompare(b.id)).map((e) => e.data);
}

export const month = (finished: string) => MONTHS[Number(finished.slice(5)) - 1];
export const verb = (item: Item) => VERB[item.kind];

export async function getShelf() {
  const items = await inFileOrder("shelf");
  // Newest month first. The sort is stable, so entries in the same month keep
  // the file's order.
  const done = items
    .filter((i) => i.status === "done")
    .sort((a, b) => b.finished!.localeCompare(a.finished!));

  const years: { year: string; items: Item[] }[] = [];
  for (const item of done) {
    const year = item.finished!.slice(0, 4);
    if (years.at(-1)?.year !== year) years.push({ year, items: [] });
    years.at(-1)!.items.push(item);
  }

  return {
    now: items.filter((i) => i.status === "now"),
    next: items.filter((i) => i.status === "next"),
    done,
    years,
  };
}

export async function getWall() {
  const favorites = await inFileOrder("favorites");
  return WALL_KINDS.map((kind) => {
    const items = favorites.filter((f) => f.kind === kind);
    if (items.length > WALL_CAP) {
      throw new Error(
        `favorites.yaml has ${items.length} ${WALL_LABEL[kind]}; the wall holds ${WALL_CAP} per kind`,
      );
    }
    return { label: WALL_LABEL[kind], items };
  }).filter((row) => row.items.length > 0);
}

export const getProjects = () => inFileOrder("projects");
export const getNowLines = () => inFileOrder("now");
