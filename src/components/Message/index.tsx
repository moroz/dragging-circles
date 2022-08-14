import clsx from "clsx";
import React from "react";

interface Props {
  children: React.ReactNode;
  variant?: "warning" | "danger";
}

const Message: React.FC<Props> = ({ children, variant = "info" }) => {
  return (
    <div className={clsx("notification", { [`is-${variant}`]: variant })}>
      {children}
    </div>
  );
};

export default Message;
