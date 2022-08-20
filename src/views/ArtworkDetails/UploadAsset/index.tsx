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
  uploadArticleImage,
  useAddArticleVideoMutation
} from "../../../gql/mutations/assetMutations";

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
  const [image, setImage] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const methods = useForm<FormParams>({
    defaultValues: {
      type: AssetType.Image
    }
  });
  const { reset, register, watch } = methods;
  const [mutate] = useAddArticleVideoMutation();

  const type = watch("type");

  const onSuccess = useCallback(() => {
    refetch();
    onClose();
    reset();
    setImage(null);
  }, [refetch, onClose, reset]);

  const onUploadImage = useCallback(async () => {
    const { data } = await uploadArticleImage(
      {
        image: image!,
        artworkId: artwork.id
      },
      setProgress
    );
    if (data?.result.success) {
      onSuccess();
      return;
    }
  }, [image, artwork.id, setProgress]);

  const onAddVideo = useCallback(async ({ videoId }: FormParams) => {
    const res = await mutate({ variables: { artworkId: artwork.id, videoId } });
    if (res.data?.addArticleVideo.success) onSuccess();
  }, []);

  const onSubmit = useCallback(
    async (params: FormParams) => {
      switch (params.type) {
        case AssetType.Image:
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
          </RadioGroup>
          {type === AssetType.Image ? (
            <UploadImage artwork={artwork} setImage={setImage} />
          ) : (
            <AddVideo artwork={artwork} />
          )}
        </div>
      </FormWrapper>
    </Modal>
  );
};

export default UploadAsset;
