export class Messages {
  static readonly GENERIC_ERROR = "Something went wrong. Please try again.";
  static readonly NETWORK_ERROR = "Please check your internet connection.";
  static readonly UNAUTHORIZED = "Your session has expired. Please log in.";
  static readonly FORBIDDEN = "You are not authorized to access this resource.";
  static readonly NOT_FOUND =
    "The resource you are looking for does not exist.";

  static readonly REQUIRED_FIELD = "This field is required.";
  static readonly INVALID_EMAIL = "Please enter a valid email address.";
  static readonly INVALID_PHONE = "Please enter a valid phone number.";
  static readonly PASSWORD_MISMATCH = "Passwords do not match.";
  static readonly INVALID_CREDENTIALS = "Invalid credentials.";

  static readonly LOGIN_SUCCESS = "Logged in successfully.";
  static readonly LOGIN_FAILED = "Invalid email or password.";
  static readonly LOGOUT_SUCCESS = "You have been logged out.";
  static readonly SESSION_EXPIRED = "Session expired. Please login again.";

  static readonly SAVE_SUCCESS = "Changes saved successfully.";
  static readonly DELETE_SUCCESS = "Deleted successfully.";
  static readonly UPDATE_SUCCESS = "Updated successfully.";
  static readonly ACTION_FAILED = "Unable to complete the action.";

  static readonly FORM_INCOMPLETE = "Please complete all required fields.";
  static readonly CONFIRM_DELETE = "Are you sure you want to delete this?";
}
