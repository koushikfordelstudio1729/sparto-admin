export class GlobalEnvironment {
  static readonly apiBaseUrl: string = import.meta.env.VITE_API_BASE_URL || "";
  static readonly mediaUrl: string = import.meta.env.VITE_MEDIA_BASE_URL || "";
  static readonly enableLogging: boolean =
    import.meta.env.VITE_ENABLE_LOGGING === "true";
}
