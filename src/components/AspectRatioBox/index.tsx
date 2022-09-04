import React from "react";
import styles from "./AspectRatioBox.module.sass";
import clsx from "clsx";

interface Props extends React.HTMLProps<HTMLDivElement> {
  ratio: string;
}

const AspectRatioBox: React.FC<Props> = ({
  ratio,
  children,
  className,
  ...props
}) => {
  const style = { aspectRatio: ratio };

  return (
    <div className={clsx(styles.box, className)} style={style} {...props}>
      {children}
    </div>
  );
};

export default AspectRatioBox;
