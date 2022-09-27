import React, { useCallback, useEffect } from "react";
import { useGetExhibitionQuery } from "../../gql/queries/ExhibitionQueries";
import { useForm } from "react-hook-form";
import FormWrapper from "../../components/FormWrapper";
import { useUpdateExhibitionMutation } from "../../gql/mutations/ExhibitionMutations";
import InputField from "../../components/InputField";
import Layout from "../../layout";
import styles from "./ExhibitionSetup.module.sass";
import SubmitButton from "../../components/SubmitButton";
import TitlePositionInput from "../../components/TitlePositionInput";

interface Props {}

interface UpdateExhibitionRawParams {
  title: string;
  showTitle: boolean;
  borderColor: string | null;
  background: FileList;
  titlePosition?: string;
}

const ExhibitionSetup: React.FC<Props> = () => {
  const { data, loading, refetch } = useGetExhibitionQuery();
  const { success, mutate, mutating } = useUpdateExhibitionMutation();
  const methods = useForm<UpdateExhibitionRawParams>();
  const {
    reset,
    register,
    watch,
    formState: { isDirty }
  } = methods;

  const exhibition = data?.getExhibition;
  const showTitle = watch("showTitle");

  useEffect(() => {
    if (exhibition) {
      const { title, showTitle, borderColor, titlePosition } = exhibition;
      reset({
        title,
        showTitle,
        borderColor,
        titlePosition: titlePosition ? String(titlePosition) : undefined
      });
    }
  }, [loading, exhibition]);

  const onSubmit = useCallback(
    async ({
      title,
      background,
      showTitle,
      borderColor,
      titlePosition
    }: UpdateExhibitionRawParams) => {
      const res = await mutate({
        title,
        showTitle,
        borderColor,
        titlePosition: titlePosition ? Number(titlePosition) : null,
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
        <InputField
          type="color"
          label="輪廓顏色"
          {...register("borderColor")}
        />
        <div className={styles.backgroundGroup}>
          <div>
            <InputField
              type="file"
              label="背景圖片"
              helperText="比例：16:9，最佳尺寸為 1920&times;1080 像素。"
              {...register("background")}
            />
            <div className="field">
              <label>
                <input type="checkbox" {...register("showTitle")} />{" "}
                在畫布上顯示展覽名稱
              </label>
            </div>
            {showTitle && <TitlePositionInput {...register("titlePosition")} />}
          </div>
          {exhibition?.background ? (
            <div className={styles.background}>
              <img src={exhibition.background} />
            </div>
          ) : (
            <p>無背景圖片</p>
          )}
        </div>
        <SubmitButton disabled={!isDirty || mutating}>
          {mutating ? "更新中..." : "儲存更改"}
        </SubmitButton>
      </FormWrapper>
    </Layout>
  );
};

export default ExhibitionSetup;
