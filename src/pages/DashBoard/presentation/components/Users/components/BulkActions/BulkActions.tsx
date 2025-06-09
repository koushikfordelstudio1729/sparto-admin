import React from "react";

export type BulkActionsProps = {
  count: number;
  onActivate: () => void;
  onInactivate: () => void;
  onDelete: () => void;
};

const BulkActions: React.FC<BulkActionsProps> = ({
  count,
  onActivate,
  onInactivate,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-4 mb-4 p-3 bg-blue-50 rounded-lg">
      <span className="text-sm text-blue-700">
        {count} user{count !== 1 && "s"} selected
      </span>
      <button
        onClick={onActivate}
        className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
      >
        Activate
      </button>
      <button
        onClick={onInactivate}
        className="text-sm bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
      >
        Inactivate
      </button>
      <button
        onClick={onDelete}
        className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default BulkActions;
