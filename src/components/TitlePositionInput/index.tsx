import React, { HTMLProps } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./TitlePositionInput.module.sass";

interface Props extends HTMLProps<HTMLInputElement> {}

const TitlePositionInput: React.FC<Props> = () => {
  const { register } = useFormContext();

  return (
    <div className={styles.root}>
      <label className={styles.label}>標題位置</label>
      <fieldset className={styles.fieldset}>
        {new Array(9).fill(0).map((_, i) => (
          <input
            key={i}
            type="radio"
            value={i}
            {...register("titlePosition")}
          />
        ))}
      </fieldset>
    </div>
  );
};

export default TitlePositionInput;
