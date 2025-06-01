import React, { useEffect } from "react";
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
  const redirectPath = searchParams.get("redirect") || "/dashboard";
  const { isAuthenticated } = useAuth();
  const { isLoading } = useSelector(
    (state: RootState) => state.LoginPageReducerSlice
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectPath]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await viewModel.loginUser(redirectPath, navigate);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex md:flex-col lg:flex-row flex-col-reverse">
      <DashboardPreview />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md border border-gray-200 p-[20px] md:p-[40px] shadow-lg">
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

          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Enter your phone number and password to access your car parts
              inventory.
            </p>
          </div>

          {viewModel.error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <p className="text-sm text-red-700">{viewModel.error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <CustomInput
              leftIcon={<Phone size={18} />}
              id="phone"
              type="text"
              label="Phone Number"
              value={viewModel.phone}
              onChange={(e) => viewModel.updatePhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />

            <CustomInput
              leftIcon={<Lock size={18} />}
              id="password"
              label="Password"
              value={viewModel.password}
              onChange={(e) => viewModel.updatePassword(e.target.value)}
              placeholder="Enter your password"
              required
              showPasswordToggle
              visibleIcon={<EyeOff size={18} />}
              hiddenIcon={<Eye size={18} />}
            />

            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
              <CustomCheckbox
                checked={viewModel.rememberMe}
                onChange={(e) => viewModel.updateRememberMe(e.target.checked)}
                label="Remember Me"
              />
              <CustomButton variant="link" size="sm">
                Forgot Your Password?
              </CustomButton>
            </div>

            <CustomButton
              type="submit"
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
