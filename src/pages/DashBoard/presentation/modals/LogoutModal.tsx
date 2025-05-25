import { useEffect } from "react";
import { LogOut, X } from "lucide-react";
import CustomButton from "@/commons/components/Button";

// Types
interface LogoutModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal = ({ isOpen, onConfirm, onCancel }: LogoutModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors group"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogOut className="w-8 h-8 text-red-500" />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            Logout Confirmation
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Are you sure you want to logout from your admin account? You will
            need to sign in again to access the dashboard.
          </p>

          {/* Actions */}
          <div className="flex items-center justify-center gap-4">
            <CustomButton
              onClick={onCancel}
              variant="secondary"
              size="md"
              fullWidth
              disabled={false}
            >
              <p className="text-white"> Cancel</p>
            </CustomButton>
            <CustomButton
              onClick={onConfirm}
              variant="danger"
              size="md"
              disabled={false}
            >
              <p className="text-white whitespace-nowrap"> Yes, Logout</p>
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
