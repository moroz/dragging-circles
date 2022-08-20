import clsx from "clsx";
import styles from "../UploadAsset.module.sass";

export default function DropzonePlaceholder() {
  return (
    <div className={styles.placeholder}>
      <p>請將圖片拖放到這裏</p>
      <p className={styles.separator}>或者</p>
      <label className={clsx("button is-primary")}>
        <input type="file" hidden />
        點擊來選擇檔案
      </label>
    </div>
  );
}
