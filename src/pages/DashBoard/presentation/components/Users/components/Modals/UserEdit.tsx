import React, { useState, useEffect } from "react";
import type { UserEditModalProps } from "./UserEdit.types";
import CustomButton from "@/commons/components/Button";
import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import type { PhoneEntity } from "@/commons/domain/entities/PhoneEntity";
import type { AddressEntity } from "@/commons/domain/entities/AddressEntity";
const addressFields: (keyof AddressEntity)[] = [
  "line1",
  "line2",
  "city",
  "state",
  "pincode",
  "country",
];

const UserEditModal: React.FC<UserEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  user,
}) => {
  const [formData, setFormData] = useState<UserEntity | null>(null);
  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);
  if (!isOpen) return null;

  const handleInputChange = (
    field: keyof UserEntity,
    value: string | number
  ) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleAddressChange = (field: string, value: string | boolean) => {
    if (!formData) return;

    const address = formData.addresses?.[0] || {
      line1: "",
      line2: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      is_default: true,
    };

    const updatedAddress = { ...address, [field]: value };
    setFormData({ ...formData, addresses: [updatedAddress] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg max-w-lg w-full mx-4 h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b">
          <h3 className="text-2xl font-semibold">Edit User</h3>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto px-6 py-4 space-y-4 flex-1"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData?.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData?.emails?.[0]?.email || ""}
              onChange={(e) => {
                const phones: PhoneEntity[] = formData?.phones?.length
                  ? [...formData.phones]
                  : [{ number: "", isVerified: false }];

                phones[0].number = e.target.value;
                setFormData({ ...formData!, phones });
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData?.phones?.[0]?.number || ""}
              onChange={(e) => {
                const phones: PhoneEntity[] = formData?.phones?.length
                  ? [...formData.phones]
                  : [{ number: "", isVerified: false }];

                phones[0].number = e.target.value;
                setFormData({ ...formData!, phones });
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Address */}
          <div className="border-t pt-4">
            <h4 className="text-lg font-medium text-gray-900 mb-3">
              Address Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {addressFields.map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {field}
                  </label>
                  <input
                    type="text"
                    value={String(formData?.addresses?.[0]?.[field] ?? "")}
                    onChange={(e) => handleAddressChange(field, e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Profile Picture URL */}
          <div className="flex-1">
            <div className="relative group">
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // Convert file to URL for preview (in real app, upload to server first)
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const imageUrl = event.target?.result as string;
                      handleInputChange("profilePictureUrl", imageUrl);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                id="profile-upload"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200 group-hover:border-blue-400 group-hover:bg-blue-50">
                <div className="space-y-2">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, JPEG up to 5MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white px-6 py-4 border-t flex justify-end gap-4">
          <CustomButton onClick={onClose} variant="danger" size="md">
            <p className="text-white">Cancel</p>
          </CustomButton>
          <CustomButton
            variant="secondary"
            size="md"
            fullWidth
            onClick={handleSubmit}
          >
            <p className="text-white">Save Changes</p>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;
// import React, { useState, useEffect } from "react";
// import type { UserEditModalProps } from "./UserEdit.types";
// import CustomButton from "@/commons/components/Button";
// import type { UserEntity } from "@/commons/domain/entities/UserEntity";

// import type { AddressEntity } from "@/commons/domain/entities/AddressEntity";

// const addressFields: (keyof AddressEntity)[] = [
//   "line1",
//   "line2",
//   "city",
//   "state",
//   "pincode",
//   "country",
// ];

// const UserEditModal: React.FC<UserEditModalProps> = ({
//   isOpen,
//   onClose,
//   onSave,
//   user,
// }) => {
//   const [formData, setFormData] = useState<UserEntity | null>(null);
//   const [originalData, setOriginalData] = useState<UserEntity | null>(null);

//   useEffect(() => {
//     if (user) {
//       // Deep clone to avoid reference issues
//       const userData = JSON.parse(JSON.stringify(user)) as UserEntity;
//       setFormData(userData);
//       setOriginalData(userData);
//     }
//   }, [user]);

//   if (!isOpen) return null;

//   const handleInputChange = (
//     field: keyof UserEntity,
//     value: string | number
//   ) => {
//     if (formData) {
//       setFormData({ ...formData, [field]: value });
//     }
//   };

//   const handleAddressChange = (field: string, value: string | boolean) => {
//     if (!formData) return;

//     const address = formData.addresses?.[0] || {
//       line1: "",
//       line2: "",
//       city: "",
//       state: "",
//       pincode: "",
//       country: "",
//       is_default: true,
//     };

//     const updatedAddress = { ...address, [field]: value };
//     setFormData({ ...formData, addresses: [updatedAddress] });
//   };

//   const handleEmailChange = (value: string) => {
//     if (!formData) return;

//     const emails = formData.emails?.length
//       ? [...formData.emails]
//       : [{ email: "", isVerified: false }];

//     emails[0] = { ...emails[0], email: value };
//     setFormData({ ...formData, emails });
//   };

//   const handlePhoneChange = (value: string) => {
//     if (!formData) return;

//     const phones = formData.phones?.length
//       ? [...formData.phones]
//       : [{ number: "", isVerified: false }];

//     phones[0] = { ...phones[0], number: value };
//     setFormData({ ...formData, phones });
//   };

//   // Helper function to deep compare values
//   const isEqual = (val1: unknown, val2: unknown): boolean => {
//     if (val1 === val2) return true;
//     if (val1 == null || val2 == null) return val1 === val2;
//     if (typeof val1 !== typeof val2) return false;

//     if (typeof val1 === "object") {
//       return JSON.stringify(val1) === JSON.stringify(val2);
//     }

//     return val1 === val2;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData || !originalData) return;

//     // Object to store only the changed fields
//     const changedFields: Record<string, unknown> = {};
//     let hasChanges = false;

//     // Check each field for changes
//     (Object.keys(formData) as Array<keyof UserEntity>).forEach((key) => {
//       const newValue = formData[key];
//       const oldValue = originalData[key];

//       if (!isEqual(newValue, oldValue)) {
//         changedFields[key] = newValue;
//         hasChanges = true;
//       }
//     });

//     if (hasChanges) {
//       // Add the user ID to identify which user to update
//       changedFields.id = formData.id;

//       // Type-safe way to handle partial updates
//       const updateData = {
//         ...originalData,
//         ...changedFields,
//       } as UserEntity;

//       // Send only the changed fields to the API
//       onSave(updateData);

//       console.log("Fields to update:", changedFields); // For debugging
//     } else {
//       console.log("No changes detected");
//     }

//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
//       <div className="bg-white rounded-lg max-w-lg w-full mx-4 h-[90vh] flex flex-col overflow-hidden">
//         {/* Header */}
//         <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b">
//           <h3 className="text-2xl font-semibold">Edit User</h3>
//         </div>

//         {/* Body */}
//         <form
//           onSubmit={handleSubmit}
//           className="overflow-y-auto px-6 py-4 space-y-4 flex-1"
//         >
//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Name
//             </label>
//             <input
//               type="text"
//               value={formData?.name || ""}
//               onChange={(e) => handleInputChange("name", e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-3 py-2"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               value={formData?.emails?.[0]?.email || ""}
//               onChange={(e) => handleEmailChange(e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-3 py-2"
//               required
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Phone
//             </label>
//             <input
//               type="tel"
//               value={formData?.phones?.[0]?.number || ""}
//               onChange={(e) => handlePhoneChange(e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-3 py-2"
//               required
//             />
//           </div>

//           {/* Address */}
//           <div className="border-t pt-4">
//             <h4 className="text-lg font-medium text-gray-900 mb-3">
//               Address Information
//             </h4>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//               {addressFields.map((field) => (
//                 <div key={field}>
//                   <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
//                     {field}
//                   </label>
//                   <input
//                     type="text"
//                     value={String(formData?.addresses?.[0]?.[field] ?? "")}
//                     onChange={(e) => handleAddressChange(field, e.target.value)}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2"
//                   />
//                 </div>
//               ))}
//             </div>

//             <div className="mt-3">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={formData?.addresses?.[0]?.is_default || false}
//                   onChange={(e) =>
//                     handleAddressChange("is_default", e.target.checked)
//                   }
//                   className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//                 />
//                 <span className="ml-2 text-sm text-gray-700">
//                   Set as default address
//                 </span>
//               </label>
//             </div>
//           </div>

//           {/* Profile Picture URL */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Profile Picture URL
//             </label>
//             <input
//               type="url"
//               value={formData?.profilePictureUrl || ""}
//               onChange={(e) =>
//                 handleInputChange("profilePictureUrl", e.target.value)
//               }
//               className="w-full border border-gray-300 rounded-md px-3 py-2"
//               placeholder="https://example.com/profile.jpg"
//             />
//           </div>
//         </form>

//         {/* Footer */}
//         <div className="sticky bottom-0 bg-white px-6 py-4 border-t flex justify-end gap-4">
//           <CustomButton onClick={onClose} variant="danger" size="md">
//             <p className="text-white">Cancel</p>
//           </CustomButton>
//           <CustomButton
//             variant="secondary"
//             size="md"
//             fullWidth
//             onClick={handleSubmit}
//           >
//             <p className="text-white">Save Changes</p>
//           </CustomButton>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserEditModal;
