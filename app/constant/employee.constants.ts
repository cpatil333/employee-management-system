export const SORT_FIELDS = [
  "name",
  "email",
  "department",
  "designation",
  "status",
] as const;

export type SortField = (typeof SORT_FIELDS)[number];

export const GENDERS = ["Male", "Female", "Other"] as const;

export const GENDER_OPTIONS = Object.values(GENDERS).map((gender) => ({
  label: gender,
  value: gender,
}));

export const ROLES = ["Admin", "Employee"] as const;

export const MARITAL_STATUSES = [
  "Married",
  "Unmarried",
  "Single",
  "Divorced",
] as const;

export const STATUS = ["Active", "Inactive"] as const;

export const STATUS_OPTIONS = Object.values(STATUS).map((status) => ({
  label: status,
  value: status,
}));
