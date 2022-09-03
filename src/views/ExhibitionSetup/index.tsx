import React, { useCallback, useEffect } from "react";
import { useGetExhibitionQuery } from "../../gql/queries/ExhibitionQueries";
import { useForm } from "react-hook-form";
import FormWrapper from "../../components/FormWrapper";
import {
  updateExhibitionMutation,
  UpdateExhibitionParams
} from "../../gql/mutations/ExhibitionMutations";
import InputField from "../../components/InputField";
import Layout from "../../layout";

interface Props {}

interface UpdateExhibitionRawParams {
  title: string;
  background: FileList;
}

const ExhibitionSetup: React.FC<Props> = () => {
  const { data, loading, refetch } = useGetExhibitionQuery();
  const methods = useForm<UpdateExhibitionRawParams>();
  const {
    reset,
    register,
    formState: { isDirty }
  } = methods;

  useEffect(() => {
    if (data?.getExhibition) {
      reset({ title: data?.getExhibition.title });
    }
  }, [loading, data?.getExhibition]);

  const onSubmit = useCallback(
    async ({ title, background }: UpdateExhibitionRawParams) => {
      const res = await updateExhibitionMutation({
        title,
        background: background[0]
      });
      console.log({ res });
      refetch();
    },
    []
  );

  return (
    <Layout title="展覽設定">
      <FormWrapper {...methods} onSubmit={onSubmit}>
        <InputField label="展覽名稱" {...register("title")} />
        <InputField type="file" label="背景圖片" {...register("background")} />
        <button type="submit" className="button is-success" disabled={!isDirty}>
          儲存更改
        </button>
      </FormWrapper>
    </Layout>
  );
};

export default ExhibitionSetup;
