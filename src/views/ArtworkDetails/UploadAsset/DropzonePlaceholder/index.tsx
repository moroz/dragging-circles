import clsx from "clsx";
import { AssetType } from "../../../../interfaces/assets";
import styles from "../UploadAsset.module.sass";

export interface Props {
  type: AssetType;
}

export default function DropzonePlaceholder({ type }: Props) {
  return (
    <label className={styles.placeholder}>
      <p>請將{type === AssetType.Image ? "圖片" : "音訊檔"}拖放到這裏</p>
      <p className={styles.separator}>或者</p>
      <div className={clsx("button is-primary")}>
        <input type="file" hidden />
        點擊來選擇檔案
      </div>
      <small>
        若選擇檔案過程中遇到問題，
        <br />
        請嘗試將圖片拖放到這一區或使用 Mozilla Firefox 瀏覽器。
        <br />
        （此為 Webkit 瀏覽器引擎才有的臭蟲）
      </small>
    </label>
  );
}
