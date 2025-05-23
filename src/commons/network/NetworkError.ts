export class NetworkError extends Error {
  constructor(
    message = "Network error. Please check your internet connection."
  ) {
    super(message);
    this.name = "NetworkError";
  }
}
