import React from "react";
import styles from "./AspectRatioBox.module.sass";
import clsx from "clsx";

interface Props extends React.HTMLProps<HTMLDivElement> {
  ratio: number;
}

const AspectRatioBox: React.FC<Props> = ({
  ratio,
  children,
  className,
  ...props
}) => {
  const style = {
    "--aspect-ratio": ratio
  } as React.CSSProperties;

  return (
    <div className={clsx(styles.box, className)} style={style} {...props}>
      {children}
    </div>
  );
};

export default AspectRatioBox;
