// // // import React from "react";
// // // import CustomCheckbox from "@/commons/components/checkbox/CustomCheckbox";
// // // import IconButton from "@/commons/components/IconButton/IconButton";
// // // import type { UserEntity } from "@/commons/domain/entities/UserEntity";
// // // import { Edit, Eye, Trash2 } from "lucide-react";

// // // export type UsersTableProps = {
// // //   users: UserEntity[];
// // //   selectedUsers: string[];
// // //   onSelectAll: (checked: boolean) => void;
// // //   onSelectUser: (id: string, checked: boolean) => void;
// // //   onStatusChange: (id: string, status: UserEntity["status"]) => void;
// // //   onEditUser: (user: UserEntity) => void;
// // //   onViewUser: (user: UserEntity) => void;
// // //   onDeleteUser: (id: string) => void;
// // // };

// // // const STATUS_OPTIONS: { value: UserEntity["status"]; label: string }[] = [
// // //   { value: "active", label: "Active" },
// // //   { value: "inactive", label: "Inactive" },
// // //   { value: "suspended", label: "Suspended" },
// // // ];

// // // const UsersTable: React.FC<UsersTableProps> = ({
// // //   users,
// // //   selectedUsers,
// // //   onSelectAll,
// // //   onSelectUser,
// // //   onStatusChange,
// // //   onEditUser,
// // //   onViewUser,
// // //   onDeleteUser,
// // // }) => {
// // //   const allChecked = users.length > 0 && selectedUsers.length === users.length;

// // //   return (
// // //     <div className="overflow-x-auto">
// // //       <table className="w-full border-collapse">
// // //         <thead>
// // //           <tr className="border-b border-gray-200">
// // //             <th className="text-left p-4">
// // //               <CustomCheckbox
// // //                 checked={allChecked}
// // //                 onChange={(e) => onSelectAll(e.target.checked)}
// // //                 className="m-0"
// // //               />
// // //             </th>
// // //             <th className="text-left p-4 font-semibold text-gray-900">User</th>
// // //             <th className="text-left p-4 font-semibold text-gray-900">
// // //               Contact
// // //             </th>
// // //             <th className="text-left p-4 font-semibold text-gray-900">
// // //               Status
// // //             </th>
// // //             <th className="text-left p-4 font-semibold text-gray-900">
// // //               Actions
// // //             </th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {users.map((user) => (
// // //             <tr
// // //               key={user.id}
// // //               className="border-b border-gray-100 hover:bg-gray-50"
// // //             >
// // //               <td className="p-4">
// // //                 <CustomCheckbox
// // //                   checked={selectedUsers.includes(user.id)}
// // //                   onChange={(e) => onSelectUser(user.id, e.target.checked)}
// // //                   className="m-0"
// // //                 />
// // //               </td>
// // //               <td className="p-4">
// // //                 <div>
// // //                   <div className="font-medium text-gray-900">{user.name}</div>
// // //                   <div className="text-sm text-gray-500">ID: {user.id}</div>
// // //                 </div>
// // //               </td>
// // //               <td className="p-4">
// // //                 <div>
// // //                   <div className="text-sm text-gray-900">
// // //                     {user.emails[0]?.email}
// // //                   </div>
// // //                   <div className="text-sm text-gray-500">
// // //                     {user.phones[0]?.number}
// // //                   </div>
// // //                 </div>
// // //               </td>
// // //               <td className="p-4">
// // //                 <div className="relative inline-block w-40">
// // //                   <select
// // //                     value={user.status}
// // //                     onChange={(e) => {
// // //                       const newStatus = e.target.value as UserEntity["status"];
// // //                       const confirmMessage = `Are you sure you want to change status of ${user.name} to ${newStatus}?`;
// // //                       if (window.confirm(confirmMessage)) {
// // //                         onStatusChange(user.id, newStatus);
// // //                       } else {
// // //                         // revert select to previous value
// // //                         e.target.value = user.status;
// // //                       }
// // //                     }}
// // //                     className="
// // //                       block w-full appearance-none bg-white border border-gray-300 rounded-md
// // //                       py-2 pl-3 pr-8 text-sm text-gray-700
// // //                       focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition
// // //                     "
// // //                   >
// // //                     {STATUS_OPTIONS.map(({ value, label }) => (
// // //                       <option key={value} value={value}>
// // //                         {label}
// // //                       </option>
// // //                     ))}
// // //                   </select>
// // //                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
// // //                     <svg
// // //                       className="h-4 w-4 text-gray-500"
// // //                       xmlns="http://www.w3.org/2000/svg"
// // //                       viewBox="0 0 20 20"
// // //                       fill="currentColor"
// // //                     >
// // //                       <path
// // //                         fillRule="evenodd"
// // //                         d="M5.23 7.21a.75.75 0 011.06-.02L10 10.584l3.71-3.398a.75.75 0 111.02 1.098l-4 3.667a.75.75 0 01-1.02 0l-4-3.667a.75.75 0 01-.02-1.06z"
// // //                         clipRule="evenodd"
// // //                       />
// // //                     </svg>
// // //                   </div>
// // //                 </div>
// // //               </td>
// // //               <td className="p-4">
// // //                 <div className="flex items-center gap-2">
// // //                   <IconButton
// // //                     icon={Edit}
// // //                     title="Edit User"
// // //                     onClick={() => onEditUser(user)}
// // //                     className="text-blue-600 hover:bg-blue-100"
// // //                   />
// // //                   <IconButton
// // //                     icon={Eye}
// // //                     title="View Details"
// // //                     onClick={() => onViewUser(user)}
// // //                     className="p-1 text-green-600 hover:bg-green-100 rounded"
// // //                   />
// // //                   <IconButton
// // //                     icon={Trash2}
// // //                     title="Delete User"
// // //                     onClick={() => onDeleteUser(user.id)}
// // //                     className="p-1 text-red-600 hover:bg-red-100 rounded"
// // //                   />
// // //                 </div>
// // //               </td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // };

// // // export default UsersTable;

// // import React, { useState } from "react";
// // import CustomCheckbox from "@/commons/components/checkbox/CustomCheckbox";
// // import IconButton from "@/commons/components/IconButton/IconButton";
// // import type { UserEntity } from "@/commons/domain/entities/UserEntity";
// // import { Edit, Eye, Trash2 } from "lucide-react";

// // export type UsersTableProps = {
// //   users: UserEntity[];
// //   selectedUsers: string[];
// //   onSelectAll: (checked: boolean) => void;
// //   onSelectUser: (id: string, checked: boolean) => void;
// //   onStatusChange: (id: string, status: UserEntity["status"]) => void;
// //   onEditUser: (user: UserEntity) => void;
// //   onViewUser: (user: UserEntity) => void;
// //   onDeleteUser: (id: string) => void;
// // };

// // const STATUS_OPTIONS: { value: UserEntity["status"]; label: string }[] = [
// //   { value: "active", label: "Active" },
// //   { value: "inactive", label: "Inactive" },
// // ];

// // /**
// //  * A styled confirmation modal.
// //  */
// // const ConfirmModal: React.FC<{
// //   message: string;
// //   onConfirm: () => void;
// //   onCancel: () => void;
// // }> = ({ message, onConfirm, onCancel }) => (
// //   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
// //     <div className="bg-white rounded-lg shadow-lg p-6 w-80">
// //       <p className="text-gray-800 mb-4">{message}</p>
// //       <div className="flex justify-end space-x-3">
// //         <button
// //           className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
// //           onClick={onCancel}
// //         >
// //           Cancel
// //         </button>
// //         <button
// //           className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
// //           onClick={onConfirm}
// //         >
// //           Confirm
// //         </button>
// //       </div>
// //     </div>
// //   </div>
// // );

// // const UsersTable: React.FC<UsersTableProps> = ({
// //   users,
// //   selectedUsers,
// //   onSelectAll,
// //   onSelectUser,
// //   onStatusChange,
// //   onEditUser,
// //   onViewUser,
// //   onDeleteUser,
// // }) => {
// //   const [pendingChange, setPendingChange] = useState<{
// //     id: string;
// //     newStatus: UserEntity["status"];
// //     userName: string;
// //   } | null>(null);

// //   const allChecked = users.length > 0 && selectedUsers.length === users.length;

// //   const handleStatusSelect = (
// //     id: string,
// //     userName: string,
// //     newStatus: UserEntity["status"]
// //   ) => {
// //     setPendingChange({ id, newStatus, userName });
// //   };

// //   const confirmChange = () => {
// //     if (pendingChange) {
// //       onStatusChange(pendingChange.id, pendingChange.newStatus);
// //       setPendingChange(null);
// //     }
// //   };

// //   const cancelChange = () => {
// //     setPendingChange(null);
// //   };

// //   return (
// //     <div className="overflow-x-auto relative">
// //       <table className="w-full border-collapse">
// //         <thead>
// //           <tr className="border-b border-gray-200">
// //             <th className="text-left p-4">
// //               <CustomCheckbox
// //                 checked={allChecked}
// //                 onChange={(e) => onSelectAll(e.target.checked)}
// //                 className="m-0"
// //               />
// //             </th>
// //             <th className="text-left p-4 font-semibold text-gray-900">User</th>
// //             <th className="text-left p-4 font-semibold text-gray-900">
// //               Contact
// //             </th>
// //             <th className="text-left p-4 font-semibold text-gray-900">
// //               Status
// //             </th>
// //             <th className="text-left p-4 font-semibold text-gray-900">
// //               Actions
// //             </th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {users.map((user) => (
// //             <tr
// //               key={user.id}
// //               className="border-b border-gray-100 hover:bg-gray-50"
// //             >
// //               <td className="p-4">
// //                 <CustomCheckbox
// //                   checked={selectedUsers.includes(user.id)}
// //                   onChange={(e) => onSelectUser(user.id, e.target.checked)}
// //                   className="m-0"
// //                 />
// //               </td>
// //               <td className="p-4">
// //                 <div>
// //                   <div className="font-medium text-gray-900">{user.name}</div>
// //                   <div className="text-sm text-gray-500">ID: {user.id}</div>
// //                 </div>
// //               </td>
// //               <td className="p-4">
// //                 <div>
// //                   <div className="text-sm text-gray-900">
// //                     {user.emails[0]?.email}
// //                   </div>
// //                   <div className="text-sm text-gray-500">
// //                     {user.phones[0]?.number}
// //                   </div>
// //                 </div>
// //               </td>
// //               <td className="p-4">
// //                 <div className="relative inline-block w-40">
// //                   <select
// //                     value={user.status}
// //                     onChange={(e) =>
// //                       handleStatusSelect(
// //                         user.id,
// //                         user.name,
// //                         e.target.value as UserEntity["status"]
// //                       )
// //                     }
// //                     className="
// //                       block w-full appearance-none bg-white border border-gray-300 rounded-md
// //                       py-2 pl-3 pr-8 text-sm text-gray-700
// //                       focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition
// //                     "
// //                   >
// //                     {STATUS_OPTIONS.map(({ value, label }) => (
// //                       <option key={value} value={value}>
// //                         {label}
// //                       </option>
// //                     ))}
// //                   </select>
// //                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
// //                     <svg
// //                       className="h-4 w-4 text-gray-500"
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       viewBox="0 0 20 20"
// //                       fill="currentColor"
// //                     >
// //                       <path
// //                         fillRule="evenodd"
// //                         d="M5.23 7.21a.75.75 0 011.06-.02L10 10.584l3.71-3.398a.75.75 0 111.02 1.098l-4 3.667a.75.75 0 01-1.02 0l-4-3.667a.75.75 0 01-.02-1.06z"
// //                         clipRule="evenodd"
// //                       />
// //                     </svg>
// //                   </div>
// //                 </div>
// //               </td>
// //               <td className="p-4">
// //                 <div className="flex items-center gap-2">
// //                   <IconButton
// //                     icon={Edit}
// //                     title="Edit User"
// //                     onClick={() => onEditUser(user)}
// //                     className="text-blue-600 hover:bg-blue-100"
// //                   />
// //                   <IconButton
// //                     icon={Eye}
// //                     title="View Details"
// //                     onClick={() => onViewUser(user)}
// //                     className="p-1 text-green-600 hover:bg-green-100 rounded"
// //                   />
// //                   <IconButton
// //                     icon={Trash2}
// //                     title="Delete User"
// //                     onClick={() => onDeleteUser(user.id)}
// //                     className="p-1 text-red-600 hover:bg-red-100 rounded"
// //                   />
// //                 </div>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //       {pendingChange && (
// //         <ConfirmModal
// //           message={`Are you sure you want to change status of ${pendingChange.userName} to ${pendingChange.newStatus}?`}
// //           onConfirm={confirmChange}
// //           onCancel={cancelChange}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default UsersTable;
// import React, { useState } from "react";
// import CustomCheckbox from "@/commons/components/checkbox/CustomCheckbox";
// import IconButton from "@/commons/components/IconButton/IconButton";
// import type { UserEntity } from "@/commons/domain/entities/UserEntity";
// import { Edit, Eye, Trash2, AlertTriangle } from "lucide-react";

// export type UsersTableProps = {
//   users: UserEntity[];
//   selectedUsers: string[];
//   onSelectAll: (checked: boolean) => void;
//   onSelectUser: (id: string, checked: boolean) => void;
//   onStatusChange: (id: string, status: UserEntity["status"]) => void;
//   onEditUser: (user: UserEntity) => void;
//   onViewUser: (user: UserEntity) => void;
//   onDeleteUser: (id: string) => void;
// };

// const STATUS_OPTIONS: { value: UserEntity["status"]; label: string }[] = [
//   { value: "active", label: "Active" },
//   { value: "inactive", label: "Inactive" },
// ];

// // Inline confirmation modal
// const ConfirmModal: React.FC<{
//   message: string;
//   onConfirm: () => void;
//   onCancel: () => void;
// }> = ({ message, onConfirm, onCancel }) => (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//     <div className="bg-white rounded-lg shadow-lg p-6 w-80 mx-4">
//       <div className="flex justify-center mb-4">
//         <AlertTriangle className="h-10 w-10 text-yellow-500" />
//       </div>
//       <p className="text-center text-gray-800 mb-6">{message}</p>
//       <div className="flex justify-center space-x-4">
//         <button
//           onClick={onCancel}
//           className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={onConfirm}
//           className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
//         >
//           Confirm
//         </button>
//       </div>
//     </div>
//   </div>
// );

// const UsersTable: React.FC<UsersTableProps> = ({
//   users,
//   selectedUsers,
//   onSelectAll,
//   onSelectUser,
//   onStatusChange,
//   onEditUser,
//   onViewUser,
//   onDeleteUser,
// }) => {
//   const [pendingChange, setPendingChange] = useState<{
//     id: string;
//     newStatus: UserEntity["status"];
//     userName: string;
//   } | null>(null);

//   const allChecked = users.length > 0 && selectedUsers.length === users.length;

//   const handleStatusSelect = (
//     id: string,
//     userName: string,
//     newStatus: UserEntity["status"]
//   ) => {
//     setPendingChange({ id, newStatus, userName });
//   };

//   const confirmChange = () => {
//     if (pendingChange) {
//       onStatusChange(pendingChange.id, pendingChange.newStatus);
//       setPendingChange(null);
//     }
//   };

//   const cancelChange = () => setPendingChange(null);

//   return (
//     <div className="overflow-x-auto relative">
//       <table className="w-full border-collapse">
//         <thead>
//           <tr className="border-b border-gray-200">
//             <th className="text-left p-4">
//               <CustomCheckbox
//                 checked={allChecked}
//                 onChange={(e) => onSelectAll(e.target.checked)}
//                 className="m-0"
//               />
//             </th>
//             <th className="text-left p-4 font-semibold text-gray-900">User</th>
//             <th className="text-left p-4 font-semibold text-gray-900">
//               Contact
//             </th>
//             <th className="text-left p-4 font-semibold text-gray-900">
//               Status
//             </th>
//             <th className="text-left p-4 font-semibold text-gray-900">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr
//               key={user.id}
//               className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
//             >
//               <td className="p-4">
//                 <CustomCheckbox
//                   checked={selectedUsers.includes(user.id)}
//                   onChange={(e) => onSelectUser(user.id, e.target.checked)}
//                   className="m-0"
//                 />
//               </td>
//               <td className="p-4">
//                 <div>
//                   <div className="font-medium text-gray-900">{user.name}</div>
//                   <div className="text-sm text-gray-500">ID: {user.id}</div>
//                 </div>
//               </td>
//               <td className="p-4">
//                 <div>
//                   <div className="text-sm text-gray-900">
//                     {user.emails[0]?.email}
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     {user.phones[0]?.number}
//                   </div>
//                 </div>
//               </td>
//               <td className="p-4">
//                 <div className="relative inline-block w-40">
//                   <select
//                     value={user.status}
//                     onChange={(e) =>
//                       handleStatusSelect(
//                         user.id,
//                         user.name,
//                         e.target.value as UserEntity["status"]
//                       )
//                     }
//                     className="
//                       block w-full appearance-none bg-white border border-gray-300 rounded-md
//                       py-2 pl-3 pr-8 text-sm text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500
//                     "
//                   >
//                     {STATUS_OPTIONS.map(({ value, label }) => (
//                       <option key={value} value={value}>
//                         {label}
//                       </option>
//                     ))}
//                   </select>
//                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//                     <svg
//                       className="h-4 w-4 text-gray-500"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M5.23 7.21a.75.75 0 011.06-.02L10 10.584l3.71-3.398a.75.75 0 111.02 1.098l-4 3.667a.75.75 0 01-1.02 0l-4-3.667a.75.75 0 01-.02-1.06z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               </td>
//               <td className="p-4">
//                 <div className="flex items-center gap-2">
//                   <IconButton
//                     icon={Edit}
//                     title="Edit User"
//                     onClick={() => onEditUser(user)}
//                     className="text-blue-600 hover:bg-blue-100 rounded p-1"
//                   />
//                   <IconButton
//                     icon={Eye}
//                     title="View Details"
//                     onClick={() => onViewUser(user)}
//                     className="text-green-600 hover:bg-green-100 rounded p-1"
//                   />
//                   <IconButton
//                     icon={Trash2}
//                     title="Delete User"
//                     onClick={() => onDeleteUser(user.id)}
//                     className="text-red-600 hover:bg-red-100 rounded p-1"
//                   />
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {pendingChange && (
//         <ConfirmModal
//           message={`Are you sure you want to change status of ${pendingChange.userName} to ${pendingChange.newStatus}?`}
//           onConfirm={confirmChange}
//           onCancel={cancelChange}
//         />
//       )}
//     </div>
//   );
// };

// export default UsersTable;

import React, { useState } from "react";
import CustomCheckbox from "@/commons/components/checkbox/CustomCheckbox";
import IconButton from "@/commons/components/IconButton/IconButton";
import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import { Edit, Eye, Trash2, AlertTriangle } from "lucide-react";

import type { UsersTableProps } from "../../User.types";

const STATUS_OPTIONS: { value: UserEntity["status"]; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

// Inline confirmation modal
const ConfirmModal: React.FC<{
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-80 mx-4">
      <div className="flex justify-center mb-4">
        <AlertTriangle className="h-10 w-10 text-yellow-500 animate-pulse" />
      </div>
      <p className="text-center text-gray-800 mb-6">{message}</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
);

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  selectedUsers,
  onSelectAll,
  onSelectUser,
  onStatusChange,
  onEditUser,
  onViewUser,
  onDeleteUser,
}) => {
  const [pendingChange, setPendingChange] = useState<{
    id: string;
    newStatus: UserEntity["status"];
    userName: string;
  } | null>(null);

  const allChecked = users.length > 0 && selectedUsers.length === users.length;

  const handleStatusSelect = (
    id: string,
    userName: string,
    newStatus: UserEntity["status"]
  ) => setPendingChange({ id, newStatus, userName });

  const confirmChange = () => {
    if (pendingChange) {
      onStatusChange(pendingChange.id, pendingChange.newStatus);
      setPendingChange(null);
    }
  };

  const cancelChange = () => setPendingChange(null);

  return (
    <div className="overflow-x-auto relative">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left p-4">
              <CustomCheckbox
                checked={allChecked}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="m-0"
              />
            </th>
            <th className="text-left p-4 font-semibold text-gray-900">User</th>
            <th className="text-left p-4 font-semibold text-gray-900">
              Contact
            </th>
            <th className="text-left p-4 font-semibold text-gray-900">
              Status
            </th>
            <th className="text-left p-4 font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="p-4">
                <CustomCheckbox
                  checked={selectedUsers.includes(user.id)}
                  onChange={(e) => onSelectUser(user.id, e.target.checked)}
                  className="m-0"
                />
              </td>
              <td className="p-4">
                <div>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">ID: {user.id}</div>
                </div>
              </td>
              <td className="p-4">
                <div>
                  <div className="text-sm text-gray-900">
                    {user.emails[0]?.email}
                  </div>
                  <div className="text-sm text-gray-500">
                    {user.phones[0]?.number}
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="relative inline-block w-40">
                  <select
                    value={
                      user.status === "deleted" ? "suspended" : user.status
                    }
                    onChange={(e) =>
                      handleStatusSelect(
                        user.id,
                        user.name,
                        e.target.value as UserEntity["status"]
                      )
                    }
                    className="block w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {/* Show suspended as hidden option when status is deleted */}
                    {user.status === "deleted" && (
                      <option value="suspended" hidden>
                        Suspended
                      </option>
                    )}
                    {STATUS_OPTIONS.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg
                      className="h-4 w-4 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06-.02L10 10.584l3.71-3.398a.75.75 0 111.02 1.098l-4 3.667a.75.75 0 01-1.02 0l-4-3.667a.75.75 0 01-.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <IconButton
                    icon={Edit}
                    title="Edit User"
                    onClick={() => onEditUser(user)}
                    className="text-blue-600 hover:bg-blue-100 rounded p-1"
                  />
                  <IconButton
                    icon={Eye}
                    title="View Details"
                    onClick={() => onViewUser(user)}
                    className="text-green-600 hover:bg-green-100 rounded p-1"
                  />
                  <IconButton
                    icon={Trash2}
                    title="Delete User"
                    onClick={() => onDeleteUser(user.id)}
                    className="text-red-600 hover:bg-red-100 rounded p-1"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {pendingChange && (
        <ConfirmModal
          message={`Are you sure you want to change status of ${pendingChange.userName} to ${pendingChange.newStatus}?`}
          onConfirm={confirmChange}
          onCancel={cancelChange}
        />
      )}
    </div>
  );
};

export default UsersTable;
