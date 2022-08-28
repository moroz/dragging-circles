import clsx from "clsx";
import { AssetType } from "../../../../interfaces/assets";
import styles from "../UploadAsset.module.sass";

export interface Props {
  type: AssetType;
}

export default function DropzonePlaceholder({ type }: Props) {
  return (
    <div className={styles.placeholder}>
      <p>請將{type === AssetType.Image ? "圖片" : "音訊檔"}拖放到這裏</p>
      <p className={styles.separator}>或者</p>
      <label className={clsx("button is-primary")}>
        <input type="file" hidden />
        點擊來選擇檔案
      </label>
    </div>
  );
}
