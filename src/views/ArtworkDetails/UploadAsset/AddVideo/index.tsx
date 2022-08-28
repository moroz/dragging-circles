import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import AspectRatioBox from "../../../../components/AspectRatioBox";
import InputField from "../../../../components/InputField";
import {
  extractYoutubeId,
  fetchMetadata,
  validateByThumbnail
} from "../../../../helpers/youtubeHelpers";
import { Artwork } from "../../../../interfaces/artwork";
import styles from "../UploadAsset.module.sass";

interface Props {
  artwork: Artwork;
}

const AddVideo: React.FC<Props> = () => {
  const [youtubeId, setYoutubeId] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const { register, watch, setValue } = useFormContext();

  const validateUrl = useCallback(async (url: string) => {
    const id = extractYoutubeId(url);
    if (!id) return;
    const isValid = await validateByThumbnail(id);
    if (!isValid) return;
    setYoutubeId(id);
    setValue("videoId", id);
    const metadata = await fetchMetadata(id);
    setMetadata(metadata);
  }, []);

  const url = watch("url");

  useEffect(() => {
    validateUrl(url);
  }, [url]);

  return (
    <>
      <div className={clsx(styles.previewBox, !youtubeId && styles.empty)}>
        <AspectRatioBox
          ratio={16 / 9}
          className={clsx(
            styles.landscape,
            styles.video,
            !youtubeId && styles.empty
          )}
        >
          {youtubeId ? (
            <img
              src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
            />
          ) : null}
        </AspectRatioBox>
      </div>
      <div className={styles.options}>
        <InputField
          {...register("url")}
          label="Youtube ID或URL"
          helperText="www.youtube.com 或 youtu.be"
          autoFocus
        />
        {metadata ? (
          <div>
            <p>
              <strong>名稱：</strong> {metadata.title}
            </p>
            <p>
              <strong>頻道：</strong> {metadata.author_name}
            </p>
          </div>
        ) : null}
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

export default AddVideo;
