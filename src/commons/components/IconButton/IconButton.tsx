import React from "react";
import type { IconButtonProps } from "./IconButton.types";

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  onClick,
  title,
  className = "",
  size = 16,
}) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-1 rounded transition-colors duration-150 ${className}`}
    >
      <Icon size={size} />
    </button>
  );
};

export default IconButton;
