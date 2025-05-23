export class AppConstants {
  static readonly PAGE_SIZE = 12;

  static readonly API = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || "",

    MEDIA_URL: import.meta.env.VITE_MEDIA_BASE_URL || "",
  };

  static readonly SEARCH = {
    MAX_RETRIES: 3,

    RETRY_DELAY: 500,

    TIMEOUT: 10000,

    DEBOUNCE_TIME: 300,
  };

  static readonly LOCAL_STORAGE = {
    CATEGORIES: "categories",
    HEADER_DATA_KEY: "header_data",
    LOGIN_TOKEN: "auth_token",
    REFRESH_TOKEN: "refresh_token",
  };
}
