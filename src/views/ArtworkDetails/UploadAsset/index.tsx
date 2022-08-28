import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import FormWrapper from "../../../components/FormWrapper";
import Modal from "../../../components/Modal";
import RadioButton from "../../../components/RadioButton";
import RadioGroup from "../../../components/RadioGroup";
import { Artwork } from "../../../interfaces/artwork";
import { AssetType } from "../../../interfaces/assets";
import UploadImage from "./UploadImage";
import styles from "./UploadAsset.module.sass";
import AddVideo from "./AddVideo";
import {
  uploadArtworkImage,
  useAddArtworkVideoMutation
} from "../../../gql/mutations/AssetMutations";
import UploadAudio from "./UploadAudio";

interface Props {
  show: boolean;
  onClose: VoidFunction;
  artwork: Artwork;
  refetch: VoidFunction;
}

interface FormParams {
  type: AssetType;
  videoId: string;
}

const UploadAsset: React.FC<Props> = ({ show, onClose, artwork, refetch }) => {
  const [file, setFile] = useState<File | null>(null);
  const methods = useForm<FormParams>({
    defaultValues: {
      type: AssetType.Image
    }
  });
  const { reset, register, watch } = methods;
  const [mutate] = useAddArtworkVideoMutation();

  const type = watch("type");

  const onSuccess = useCallback(() => {
    refetch();
    onClose();
    reset();
    setFile(null);
  }, [refetch, onClose, reset]);

  const onUploadImage = useCallback(async () => {
    const { data } = await uploadArtworkImage({
      file: file!,
      artworkId: artwork.id,
      type: AssetType.Image
    });
    if (data?.result.success) {
      onSuccess();
      return;
    }
  }, [file, artwork.id]);

  const onAddVideo = useCallback(async ({ videoId }: FormParams) => {
    const res = await mutate({ variables: { artworkId: artwork.id, videoId } });
    if (res.data?.addArtworkVideo.success) onSuccess();
  }, []);

  const onSubmit = useCallback(
    async (params: FormParams) => {
      switch (params.type) {
        case AssetType.Image:
        case AssetType.Audio:
          return onUploadImage();
        case AssetType.Video:
          return onAddVideo(params);
      }
    },
    [onUploadImage, onAddVideo]
  );

  return (
    <Modal
      show={show}
      onClose={onClose}
      className={styles.modal}
      title="上傳圖片/影片"
    >
      <FormWrapper {...methods} onSubmit={onSubmit}>
        <div className={styles.layout}>
          <RadioGroup label="檔案類型">
            <RadioButton
              label="圖片"
              {...register("type")}
              value={AssetType.Image}
            />
            <RadioButton
              label="影片"
              {...register("type")}
              value={AssetType.Video}
            />
            <RadioButton
              label="音訊"
              {...register("type")}
              value={AssetType.Audio}
            />
          </RadioGroup>
          {type === AssetType.Image ? (
            <UploadImage artwork={artwork} setImage={setFile} />
          ) : null}
          {type === AssetType.Video ? <AddVideo artwork={artwork} /> : null}
          {type === AssetType.Audio ? (
            <UploadAudio artwork={artwork} setFile={setFile} file={file} />
          ) : null}
        </div>
      </FormWrapper>
    </Modal>
  );
};

export default UploadAsset;
