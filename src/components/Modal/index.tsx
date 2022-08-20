import clsx from "clsx";
import React, { useEffect } from "react";
import styles from "./Modal.module.sass";
import { ReactComponent as CloseIcon } from "./times.svg";

interface Props {
  show?: boolean;
  children?: React.ReactNode;
  onClose?: VoidFunction;
  className?: string;
  title?: string;
}

const Modal: React.FC<Props> = ({
  show = true,
  children,
  onClose,
  className,
  title
}) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && onClose) onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <>
      <div
        className={clsx(styles.overlay, show && styles.show)}
        onClick={onClose}
      />
      {show ? (
        <div className={clsx("card", styles.modal, className)}>
          {title ? (
            <div className={clsx("card-header", styles.header)}>
              <p className="card-header-title">{title}</p>
              <button className={styles.close} onClick={onClose}>
                (esc) <CloseIcon />
              </button>
            </div>
          ) : null}
          <div className="card-content">{children}</div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
