import React from "react";
import styles from "./Picker.module.sass";
import clsx from "clsx";
import { ReactComponent as UploadIcon } from "./file-upload.svg";

interface Props {
  onOpenModal: VoidFunction;
}

const Picker: React.FC<Props> = ({ onOpenModal }) => {
  return (
    <div className={clsx(styles.root)} onClick={onOpenModal}>
      <UploadIcon />
      <p>上傳圖片</p>
    </div>
  );
};

export default Picker;
