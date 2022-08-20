import clsx from "clsx";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import AspectRatioBox from "../../../../components/AspectRatioBox";
import Textarea from "../../../../components/Textarea";
import { ORIENTATION_RATIO_MAPPING } from "../../../../helpers/orientation";
import readAsDataUrl from "../../../../helpers/readAsDataUrl";
import { Artwork } from "../../../../interfaces/artwork";
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
  const { register, watch } = useFormContext();
  const orientation = watch("orientation") as ImageOrientation;
  const ratio = ORIENTATION_RATIO_MAPPING[orientation];

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
      <div className={clsx(styles.previewBox)} {...getRootProps()}>
        <input {...getInputProps()} />
        <AspectRatioBox
          ratio={ratio}
          className={clsx(styles.previewImage, !preview && styles.empty)}
        >
          {preview ? <img src={preview} /> : <DropzonePlaceholder />}
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
        <Textarea
          {...register("altText")}
          label="圖片備用文字（alt text）"
          helperText="用於圖片無法正常顯示時，以及無障礙工具使用者。"
        />
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
