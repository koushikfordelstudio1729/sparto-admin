import { expect, it, describe, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import LoginComponent from "../../pages/Login/presentation/components/LoginComponent/LoginComponent";
import type { ReactElement } from "react";

// Mock the custom hook
const mockLoginUser = vi.fn();
const mockInitialize = vi.fn();

vi.mock("../../pages/Login/presentation/page.di", () => ({
  useLoginPageViewModel: () => ({
    loginUser: mockLoginUser,
    initialize: mockInitialize,
  }),
}));

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams()],
  };
});

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
  writable: true,
});

// Mock store setup
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      LoginPageReducer: (state = { isLoading: false }, action) => {
        switch (action.type) {
          case "SET_LOADING":
            return { ...state, isLoading: action.payload };
          default:
            return { ...state, ...initialState };
        }
      },
    },
  });
};

const renderWithProvider = (component: ReactElement, initialState = {}) => {
  const store = createMockStore(initialState);
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe("LoginComponent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  describe("Component Rendering", () => {
    it("should render input placeholders correctly", () => {
      renderWithProvider(<LoginComponent />);

      expect(
        screen.getByPlaceholderText("Enter your phone number")
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Enter your password")
      ).toBeInTheDocument();
    });
  });

  describe("Form Input Handling", () => {
    it("should update phone input value when user types", async () => {
      const user = userEvent.setup();
      renderWithProvider(<LoginComponent />);

      const phoneInput = screen.getByLabelText("Phone Number");
      await user.type(phoneInput, "1234567890");

      expect(phoneInput).toHaveValue("1234567890");
    });

    it("should update password input value when user types", async () => {
      const user = userEvent.setup();
      renderWithProvider(<LoginComponent />);

      const passwordInput = screen.getByLabelText("Password");
      await user.type(passwordInput, "password123");

      expect(passwordInput).toHaveValue("password123");
    });

    it("should clear error when phone input changes", async () => {
      const user = userEvent.setup();
      renderWithProvider(<LoginComponent />);

      // First trigger an error by submitting empty form
      const submitButton = screen.getByRole("button", { name: "Log In" });
      await user.click(submitButton);

      expect(screen.getByText("Phone number is required")).toBeInTheDocument();

      // Then type in phone input
      const phoneInput = screen.getByLabelText("Phone Number");
      await user.type(phoneInput, "123");

      expect(
        screen.queryByText("Phone number is required")
      ).not.toBeInTheDocument();
    });

    it("should clear error when password input changes", async () => {
      const user = userEvent.setup();
      renderWithProvider(<LoginComponent />);

      // First enter phone and submit to get password error
      const phoneInput = screen.getByLabelText("Phone Number");
      await user.type(phoneInput, "1234567890");

      const submitButton = screen.getByRole("button", { name: "Log In" });
      await user.click(submitButton);

      expect(screen.getByText("Password is required")).toBeInTheDocument();

      // Then type in password input
      const passwordInput = screen.getByLabelText("Password");
      await user.type(passwordInput, "pass");

      expect(
        screen.queryByText("Password is required")
      ).not.toBeInTheDocument();
    });
  });

  describe("Form Validation", () => {
    it("should show error when phone number is empty", async () => {
      const user = userEvent.setup();
      renderWithProvider(<LoginComponent />);

      const submitButton = screen.getByRole("button", { name: "Log In" });
      await user.click(submitButton);

      expect(screen.getByText("Phone number is required")).toBeInTheDocument();
      expect(mockLoginUser).not.toHaveBeenCalled();
    });

    it("should show error when password is empty", async () => {
      const user = userEvent.setup();
      renderWithProvider(<LoginComponent />);

      const phoneInput = screen.getByLabelText("Phone Number");
      await user.type(phoneInput, "1234567890");

      const submitButton = screen.getByRole("button", { name: "Log In" });
      await user.click(submitButton);

      expect(screen.getByText("Password is required")).toBeInTheDocument();
      expect(mockLoginUser).not.toHaveBeenCalled();
    });

    it("should show error when both fields are empty", async () => {
      const user = userEvent.setup();
      renderWithProvider(<LoginComponent />);

      const submitButton = screen.getByRole("button", { name: "Log In" });
      await user.click(submitButton);

      expect(screen.getByText("Phone number is required")).toBeInTheDocument();
      expect(mockLoginUser).not.toHaveBeenCalled();
    });
  });

  describe("Form Submission", () => {
    it("should call loginUser with correct parameters on valid form submission", async () => {
      const user = userEvent.setup();
      mockLoginUser.mockResolvedValue({});
      renderWithProvider(<LoginComponent />);

      const phoneInput = screen.getByLabelText("Phone Number");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByRole("button", { name: "Log In" });

      await user.type(phoneInput, "1234567890");
      await user.type(passwordInput, "password123");
      await user.click(submitButton);

      expect(mockLoginUser).toHaveBeenCalledWith("1234567890", "password123");
    });

    it("should prevent form submission when form is submitted via Enter key", async () => {
      const user = userEvent.setup();
      mockLoginUser.mockResolvedValue({});
      renderWithProvider(<LoginComponent />);

      const phoneInput = screen.getByLabelText("Phone Number");
      const passwordInput = screen.getByLabelText("Password");

      await user.type(phoneInput, "1234567890");
      await user.type(passwordInput, "password123");
      await user.keyboard("{Enter}");

      expect(mockLoginUser).toHaveBeenCalledWith("1234567890", "password123");
    });

    it("should show error message when login fails", async () => {
      const user = userEvent.setup();
      mockLoginUser.mockRejectedValue(new Error("Login failed"));
      renderWithProvider(<LoginComponent />);

      const phoneInput = screen.getByLabelText("Phone Number");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByRole("button", { name: "Log In" });

      await user.type(phoneInput, "1234567890");
      await user.type(passwordInput, "wrongpassword");
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("Invalid credentials. Please try again.")
        ).toBeInTheDocument();
      });
    });
  });

  describe("Loading State", () => {
    it("should show loading state when isLoading is true", () => {
      renderWithProvider(<LoginComponent />, { isLoading: true });

      expect(screen.getByText("Signing in...")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /signing in/i })
      ).toBeDisabled();
    });

    it("should show normal state when isLoading is false", () => {
      renderWithProvider(<LoginComponent />, { isLoading: false });

      expect(screen.getByText("Log In")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Log In" })).not.toBeDisabled();
    });

    it("should disable submit button when loading", () => {
      renderWithProvider(<LoginComponent />, { isLoading: true });

      const submitButton = screen.getByRole("button", { name: /signing in/i });
      expect(submitButton).toBeDisabled();
    });

    it("should show loading spinner when loading", () => {
      renderWithProvider(<LoginComponent />, { isLoading: true });

      const spinner = screen
        .getByRole("button", { name: /signing in/i })
        .querySelector("svg");
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass("animate-spin");
    });
  });

  describe("Error Display", () => {
    it("should display error message with correct styling", async () => {
      const user = userEvent.setup();
      renderWithProvider(<LoginComponent />);

      const submitButton = screen.getByRole("button", { name: "Log In" });
      await user.click(submitButton);

      const errorElement = screen.getByText("Phone number is required");
      expect(errorElement).toBeInTheDocument();

      // Find the error container div that should have the styling classes
      const errorContainer = errorElement.closest(".bg-red-50");
      expect(errorContainer).toBeInTheDocument();
      expect(errorContainer).toHaveClass(
        "bg-red-50",
        "border-l-4",
        "border-red-400"
      );
    });

    it("should only show one error at a time", async () => {
      const user = userEvent.setup();
      renderWithProvider(<LoginComponent />);

      // First show phone error
      const submitButton = screen.getByRole("button", { name: "Log In" });
      await user.click(submitButton);
      expect(screen.getByText("Phone number is required")).toBeInTheDocument();

      // Add phone, should show password error
      const phoneInput = screen.getByLabelText("Phone Number");
      await user.type(phoneInput, "123");
      await user.click(submitButton);

      expect(
        screen.queryByText("Phone number is required")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  describe("Remember Me Checkbox", () => {
    it("should render remember me checkbox", () => {
      renderWithProvider(<LoginComponent />);

      const checkbox = screen.getByLabelText("Remember Me");
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute("type", "checkbox");
    });

    it("should toggle remember me checkbox when clicked", async () => {
      const user = userEvent.setup();
      renderWithProvider(<LoginComponent />);

      const checkbox = screen.getByLabelText("Remember Me");
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
  });

  describe("Accessibility", () => {
    it("should have proper form labels", () => {
      renderWithProvider(<LoginComponent />);

      expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
      expect(screen.getByLabelText("Remember Me")).toBeInTheDocument();
    });

    it("should have proper input attributes", () => {
      renderWithProvider(<LoginComponent />);

      const phoneInput = screen.getByLabelText("Phone Number");
      const passwordInput = screen.getByLabelText("Password");

      // These attributes depend on your CustomInput component implementation
      // You may need to adjust based on what attributes your component actually sets
      expect(phoneInput).toHaveAttribute("type", "text");
      expect(passwordInput).toHaveAttribute("type", "password");
    });

    it("should have proper button roles", () => {
      renderWithProvider(<LoginComponent />);

      expect(
        screen.getByRole("button", { name: "Log In" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("checkbox", { name: "Remember Me" })
      ).toBeInTheDocument();
    });
  });

  describe("Form Reset on Input Change", () => {
    it("should clear all errors when inputs are modified after validation errors", async () => {
      const user = userEvent.setup();
      mockLoginUser.mockRejectedValue(new Error("Login failed"));
      renderWithProvider(<LoginComponent />);

      // First create login error
      const phoneInput = screen.getByLabelText("Phone Number");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByRole("button", { name: "Log In" });

      await user.type(phoneInput, "1234567890");
      await user.type(passwordInput, "wrongpassword");
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("Invalid credentials. Please try again.")
        ).toBeInTheDocument();
      });

      // Clear error by changing phone
      await user.clear(phoneInput);
      await user.type(phoneInput, "0987654321");

      expect(
        screen.queryByText("Invalid credentials. Please try again.")
      ).not.toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle form submission with whitespace-only inputs", async () => {
      const user = userEvent.setup();
      renderWithProvider(<LoginComponent />);

      const phoneInput = screen.getByLabelText("Phone Number");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByRole("button", { name: "Log In" });

      await user.type(phoneInput, "   ");
      await user.type(passwordInput, "   ");
      await user.click(submitButton);

      // Should still call loginUser with whitespace values
      expect(mockLoginUser).toHaveBeenCalledWith("   ", "   ");
    });
  });
});
