import clsx from "clsx";
import React, { MouseEvent } from "react";
import styles from "../Toolbar/Toolbar.module.sass";

interface Props {
  label: string;
  icon?: React.FC<any>;
  title?: string;
  active?: boolean;
  onToggle: (e: MouseEvent<HTMLButtonElement>) => void;
}

const ToolbarButton: React.FC<Props> = ({
  onToggle,
  label,
  icon: Icon,
  active,
  title
}) => {
  return (
    <button
      onMouseDown={onToggle}
      title={title || label}
      className={clsx(
        styles.button,
        Icon && styles.icon,
        active && styles.active
      )}
    >
      {Icon ? <Icon /> : label}
    </button>
  );
};

export default ToolbarButton;
