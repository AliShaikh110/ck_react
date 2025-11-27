import { MeiliSearch } from "meilisearch";

if (!import.meta.env.VITE_MEILI_HOST) {
  throw new Error("VITE_MEILI_HOST is not defined");
}

export const meiliClient = new MeiliSearch({
  host: import.meta.env.VITE_MEILI_HOST,
  apiKey: import.meta.env.VITE_MEILI_SEARCH_KEY, // can be undefined if local has no key
});


// Use env so you can change index name without touching code
export function meiliIndex(routeName:string) {

  const topicIndex = meiliClient.index(
    routeName
  );

  return topicIndex


}
