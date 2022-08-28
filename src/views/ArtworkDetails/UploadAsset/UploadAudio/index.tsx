import clsx from "clsx";
import React, { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import AspectRatioBox from "../../../../components/AspectRatioBox";
import { Artwork } from "../../../../interfaces/artwork";
import { AssetType } from "../../../../interfaces/assets";
import DropzonePlaceholder from "../DropzonePlaceholder";
import styles from "../UploadAsset.module.sass";

interface Props {
  artwork: Artwork;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const ACCEPTED_FILE_TYPES = {
  "audio/mp3": [".mp3"],
  "audio/mpeg": [".mp3"]
};

const UploadAudio: React.FC<Props> = ({ setFile, file }) => {
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
      setFile(file);
    },
    []
  );

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
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
          className={clsx(styles.previewImage, styles.empty)}
        >
          <DropzonePlaceholder type={AssetType.Audio} />
        </AspectRatioBox>
      </div>
      <div className={styles.options}>
        <button
          type="submit"
          className={clsx("button is-success is-fullwidth", styles.submit)}
        >
          確認上傳
        </button>
      </div>
    </>
  );
};

export default UploadAudio;
