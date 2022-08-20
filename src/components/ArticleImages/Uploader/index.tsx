import React, { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import styles from "./ArticleImageUploader.module.sass";
import { Article } from "../../../interfaces/articles";
import readAsDataUrl from "../../../helpers/readAsDataUrl";

interface Props {
  article: Article;
  file: File | null;
  onSuccess: VoidFunction;
}

const ArticleImageUploader: React.FC<Props> = ({
  file,
  article,
  onSuccess
}) => {
  const [preview, setPreview] = useState<null | string>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState(false);

  const onSelectFile = useCallback(async (file: File) => {
    try {
      const preview = await readAsDataUrl(file);
      if (typeof preview === "string") setPreview(preview);
    } catch (e) {
      setError(true);
    }
  }, []);

  useEffect(() => {
    file && onSelectFile(file);
  }, [file]);

  if (!file) return null;

  return (
    <div className={clsx("card", styles.root, error && styles.error)}>
      {preview ? <img className={styles.preview} src={preview} /> : null}
      {error ? <p>Error</p> : <p className={styles.uploading}>上傳中</p>}
    </div>
  );
};

export default ArticleImageUploader;
