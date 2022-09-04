import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import FormWrapper from "../../../components/FormWrapper";
import SubmitButton from "../../../components/SubmitButton";
import { UpdateUserPasswordParams } from "../../../gql/mutations/UserMutations";
import { useGetUserQuery } from "../../../gql/queries/UserQueries";
import Layout from "../../../layout";
import { LayoutLoader } from "../../../layout/Loader";
import NotFound from "../../NotFound";
import FormFields from "../FormFields";
import { useUpdateUserPasswordMutation } from "../../../gql/mutations/UserMutations";

interface Props {}

const UpdateUser: React.FC<Props> = () => {
  const { id } = useParams();
  const { data, loading } = useGetUserQuery(id);
  const user = data?.user;
  const navigate = useNavigate();

  const methods = useForm<UpdateUserPasswordParams>();
  const { getValues } = methods;
  const [mutate] = useUpdateUserPasswordMutation();
  const onSubmit = useCallback(async (params: UpdateUserPasswordParams) => {
    if (getValues("password")) {
      const res = await mutate({ variables: { userId: id!, params } });
      if (!res.data?.result.success) return;
    }
    navigate("/users");
  }, []);

  if (loading) return <LayoutLoader />;
  if (!user) return <NotFound />;

  return (
    <Layout title={`編輯使用者：${user.email}`}>
      <FormWrapper {...methods} onSubmit={onSubmit}>
        <FormFields isUpdate />
        <SubmitButton />
      </FormWrapper>
    </Layout>
  );
};

export default UpdateUser;
