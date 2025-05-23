export const StorageKeys = {
  AUTH_TOKEN: "auth_token",

  REFRESH_TOKEN: "refresh_token",

  USER_PROFILE: "user_profile",

  LANGUAGE: "language",
} as const;

export type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys];
