import React, { useCallback, useEffect } from "react";
import { useGetExhibitionQuery } from "../../gql/queries/ExhibitionQueries";
import { useForm } from "react-hook-form";
import FormWrapper from "../../components/FormWrapper";
import { useUpdateExhibitionMutation } from "../../gql/mutations/ExhibitionMutations";
import InputField from "../../components/InputField";
import Layout from "../../layout";
import styles from "./ExhibitionSetup.module.sass";
import SubmitButton from "../../components/SubmitButton";

interface Props {}

interface UpdateExhibitionRawParams {
  title: string;
  background: FileList;
}

const ExhibitionSetup: React.FC<Props> = () => {
  const { data, loading, refetch } = useGetExhibitionQuery();
  const { success, mutate, mutating } = useUpdateExhibitionMutation();
  const methods = useForm<UpdateExhibitionRawParams>();
  const {
    reset,
    register,
    formState: { isDirty }
  } = methods;

  const exhibition = data?.getExhibition;

  useEffect(() => {
    if (exhibition) {
      reset({ title: exhibition.title });
    }
  }, [loading, exhibition]);

  const onSubmit = useCallback(
    async ({ title, background }: UpdateExhibitionRawParams) => {
      const res = await mutate({
        title,
        ...(background[0] ? { background: background[0] } : {})
      });
      if (res?.data.result.success && background[0]) {
        location.reload();
      } else {
        refetch();
      }
    },
    []
  );

  return (
    <Layout title="展覽設定">
      {success && <div className="notification is-success">更新成功</div>}
      <FormWrapper {...methods} onSubmit={onSubmit}>
        <InputField label="展覽名稱" {...register("title")} />
        <InputField type="file" label="背景圖片" {...register("background")} />
        {exhibition?.background ? (
          <div className={styles.background}>
            <img src={exhibition.background} />
          </div>
        ) : (
          <p>無背景圖片</p>
        )}
        <SubmitButton disabled={!isDirty || mutating}>
          {mutating ? "更新中..." : "儲存更改"}
        </SubmitButton>
      </FormWrapper>
    </Layout>
  );
};

export default ExhibitionSetup;
