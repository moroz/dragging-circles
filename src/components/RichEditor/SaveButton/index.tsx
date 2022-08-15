import React, { useEffect, useMemo } from "react";
import styles from "../Toolbar/Toolbar.module.sass";
import clsx from "clsx";
import { ReactComponent as SaveIcon } from "./save.svg";

interface Props {
  onSave: VoidFunction;
  disabled?: boolean;
}

const SaveButton: React.FC<Props> = ({ onSave, disabled }) => {
  const isMac = useMemo(() => navigator.platform.startsWith("Mac"), []);
  const keyboardShortcut = isMac ? `\u2318S` : "Ctrl-S";

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isSaveKey =
        (window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) &&
        e.key === "s";
      if (!isSaveKey) return;
      e.preventDefault();
      if (disabled) return;
      onSave();
    };

    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  return (
    <button
      className={clsx(styles.saveButton)}
      onClick={onSave}
      disabled={disabled}
    >
      <SaveIcon />
      儲存更改 ({keyboardShortcut})
    </button>
  );
};

export default SaveButton;
