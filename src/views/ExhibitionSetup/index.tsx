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
  fontColor: string | null;
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
      const { title, showTitle, borderColor, titlePosition, fontColor } =
        exhibition;
      reset({
        title,
        showTitle,
        borderColor,
        fontColor,
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
      fontColor,
      titlePosition
    }: UpdateExhibitionRawParams) => {
      const res = await mutate({
        title,
        showTitle,
        borderColor,
        fontColor,
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
    <Layout title="????????????">
      {success && <div className="notification is-success">????????????</div>}
      <FormWrapper {...methods} onSubmit={onSubmit}>
        <InputField label="????????????" {...register("title")} />
        <InputField
          type="color"
          label="????????????"
          {...register("borderColor")}
        />
        <InputField type="color" label="????????????" {...register("fontColor")} />
        <div className={styles.backgroundGroup}>
          <div>
            <InputField
              type="file"
              label="????????????"
              helperText="?????????16:9?????????????????? 1920&times;1080 ?????????"
              {...register("background")}
            />
            <div className="field">
              <label>
                <input type="checkbox" {...register("showTitle")} />{" "}
                ??????????????????????????????
              </label>
            </div>
            {showTitle && <TitlePositionInput {...register("titlePosition")} />}
          </div>
          {exhibition?.background ? (
            <div className={styles.background}>
              <img src={exhibition.background} />
            </div>
          ) : (
            <p>???????????????</p>
          )}
        </div>
        <SubmitButton disabled={!isDirty || mutating}>
          {mutating ? "?????????..." : "????????????"}
        </SubmitButton>
      </FormWrapper>
    </Layout>
  );
};

export default ExhibitionSetup;
