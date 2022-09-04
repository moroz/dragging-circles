import clsx from "clsx";
import React, { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import AspectRatioBox from "../../../../components/AspectRatioBox";
import readAsDataUrl from "../../../../helpers/readAsDataUrl";
import { Artwork } from "../../../../interfaces/artwork";
import { AssetType } from "../../../../interfaces/assets";
import DropzonePlaceholder from "../DropzonePlaceholder";
import styles from "../UploadAsset.module.sass";

interface Props {
  artwork: Artwork;
  setImage: (file: File) => void;
}

const ACCEPTED_IMAGE_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"]
};

const UploadImage: React.FC<Props> = ({ setImage }) => {
  const [preview, setPreview] = useState<null | string>(null);
  const [error, setError] = useState(false);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);

  const onDrop = useCallback(
    async (files: File[], rejected: FileRejection[]) => {
      if (rejected.length > 0) {
        setRejectedFiles(rejected);
        setTimeout(() => {
          setRejectedFiles([]);
        }, 5000);
        return;
      }

      const file = files[0];
      if (!file) return;

      try {
        const preview = await readAsDataUrl(file);
        if (typeof preview === "string") setPreview(preview);
        setImage(file);
        setRejectedFiles([]);
      } catch (e) {
        setError(true);
      }
    },
    []
  );

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept: ACCEPTED_IMAGE_TYPES,
    maxSize: 2.5 * 1024 * 1024
  });

  return (
    <>
      <div
        className={clsx(styles.previewBox, styles.empty)}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <AspectRatioBox
          ratio={1}
          className={clsx(styles.previewImage, !preview && styles.empty)}
        >
          {preview ? (
            <img src={preview} />
          ) : (
            <DropzonePlaceholder type={AssetType.Image} />
          )}
        </AspectRatioBox>
        {rejectedFiles.length ? (
          <div
            className={clsx("notification is-danger is-light", styles.error)}
          >
            <p>以下檔案被拒絕：</p>
            <ul>
              {rejectedFiles.map((rej, i) => (
                <li key={i}>
                  <strong>{rej.file.name}:</strong> {rej.errors[0].message}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div className={styles.options}>
        <button
          type="submit"
          disabled={!preview}
          className={clsx("button is-success is-fullwidth", styles.submit)}
        >
          確認上傳
        </button>
      </div>
    </>
  );
};

export default UploadImage;
