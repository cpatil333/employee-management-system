export const SORT_FIELDS = [
  "name",
  "email",
  "department",
  "designation",
  "status",
] as const;

export type SortField = (typeof SORT_FIELDS)[number];
