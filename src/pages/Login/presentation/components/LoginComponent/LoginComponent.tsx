import React, { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { RootState } from "@/app/store/store";
import { Eye, EyeOff, Phone, Lock, Settings } from "lucide-react";
import { useLoginPageViewModel } from "../../page.di";
import CustomButton from "@/commons/components/Button";
import CustomInput from "@/commons/components/Input/CustomInput";
import CustomCheckbox from "@/commons/components/checkbox/CustomCheckbox";
import DashboardPreview from "../DashBoardPreview/DashBoardPreview";
import { useAuth } from "@/commons/hooks/useAuth";

const LoginComponent = () => {
  const viewModel = useLoginPageViewModel();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { isLoading } = useSelector(
    (state: RootState) => state.LoginPageReducerSlice
  );

  const redirectPath = searchParams.get("redirect") || "/dashboard";

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectPath]);

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPhone(e.target.value);
      setError("");
    },
    []
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setError("");
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!phone) {
        setError("Phone number is required");
        return;
      }

      if (!password) {
        setError("Password is required");
        return;
      }

      try {
        await viewModel.loginUser(phone, password);
        navigate(redirectPath, { replace: true });
      } catch {
        setError("Invalid credentials. Please try again.");
      }
    },
    [phone, password, viewModel, navigate, redirectPath]
  );

  return (
    <div className="min-h-screen bg-gray-50 flex md:flex-col lg:flex-row flex-col-reverse">
      {/* Left Panel - Login Form */}
      <DashboardPreview />
      {/* Right Panel - Dashboard Preview */}

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 ">
        <div className="w-full max-w-md border border-gray-200 p-[20px] md:p-[40px] shadow-lg">
          {/* Logo */}
          <div className="flex items-center mb-8 lg:mb-12">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                Sparto
              </span>
            </div>
          </div>

          {/* Welcome Back */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Enter your phone number and password to access your car parts
              inventory.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <div className="flex">
                <div>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Phone Field */}
            <CustomInput
              leftIcon={<Phone size={18} />}
              id="phone"
              type="text"
              label="Phone Number"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Enter your phone number"
              required
            />

            {/* Password Field */}
            <div className="space-y-4">
              <CustomInput
                leftIcon={<Lock size={18} />}
                id="password"
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                required
                showPasswordToggle={true}
                visibleIcon={<EyeOff size={18} />}
                hiddenIcon={<Eye size={18} />}
              />

              {/* Remember Me & Forgot Password */}
              <div className="flex flex-col justify-start items-start md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 ">
                <CustomCheckbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  label="Remember Me"
                />
                <CustomButton
                  variant="link"
                  size="sm"
                  className="text-right sm:text-right"
                >
                  Forgot Your Password?
                </CustomButton>
              </div>
            </div>

            {/* Login Button */}
            <CustomButton
              onClick={(e) =>
                handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
              }
              variant="primary"
              size="md"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Log In"
              )}
            </CustomButton>
          </form>

          {/* Copyright */}
          <div className="mt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-400">
              Copyright © 2025 Sparto Car Parts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
