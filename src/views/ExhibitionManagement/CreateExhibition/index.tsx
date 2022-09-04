import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../../../components/FormWrapper";
import InputField from "../../../components/InputField";
import SubmitButton from "../../../components/SubmitButton";
import {
  CreateExhibitionParams,
  useCreateExhibitionMutation
} from "../../../gql/mutations/ExhibitionMutations";
import useAuth from "../../../hooks/useAuth";
import Layout from "../../../layout";
import NotFound from "../../NotFound";

interface Props {}

const CreateExhibition: React.FC<Props> = () => {
  const { isAdmin } = useAuth();
  const methods = useForm<CreateExhibitionParams>();
  const [mutate] = useCreateExhibitionMutation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (params: CreateExhibitionParams) => {
      const res = await mutate({ variables: { params } });

      if (res.data?.result.success) {
        navigate("/exhibitions");
      }
    },
    [mutate]
  );

  if (!isAdmin) return <NotFound />;

  const { register } = methods;

  return (
    <Layout admin title="新增展覽">
      <FormWrapper {...methods} onSubmit={onSubmit}>
        <InputField label="展覽名稱" {...register("title")} />
        <SubmitButton />
      </FormWrapper>
    </Layout>
  );
};

export default CreateExhibition;
