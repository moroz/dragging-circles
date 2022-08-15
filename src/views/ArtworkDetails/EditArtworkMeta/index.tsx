import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import FormWrapper from "../../../components/FormWrapper";
import InputField from "../../../components/InputField";
import { useUpdateArtworkMutation } from "../../../gql/mutations/ArtworkMutations";
import { useGetCurrentArtworkQuery } from "../../../gql/queries/ArtworkQueries";
import { UpdateArtworkInput } from "../../../interfaces/artwork";

interface Props {}

const EditArtworkMeta: React.FC<Props> = () => {
  const { data, loading } = useGetCurrentArtworkQuery();
  const methods = useForm<UpdateArtworkInput>();
  const {
    register,
    reset,
    formState: { isDirty }
  } = methods;
  const [mutate] = useUpdateArtworkMutation();

  useEffect(() => {
    if (data?.artwork) {
      const { title, author } = data.artwork;
      reset({ title, author });
    }
  }, [loading, data]);

  const onSubmit = useCallback(
    async (params: UpdateArtworkInput) => {
      if (!data?.artwork?.id) return;
      await mutate({ variables: { id: data.artwork.id, params } });
    },
    [mutate, data?.artwork?.id]
  );

  return (
    <FormWrapper {...methods} onSubmit={onSubmit}>
      <InputField {...register("title")} label="名稱" />
      <InputField {...register("author")} label="作者" />
      <button type="submit" className="button is-success" disabled={!isDirty}>
        儲存更改
      </button>
    </FormWrapper>
  );
};

export default EditArtworkMeta;
