import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../../../components/FormWrapper";
import InputField from "../../../components/InputField";
import SubmitButton from "../../../components/SubmitButton";
import {
  CreateUserParams,
  useCreateUserMutation
} from "../../../gql/mutations/UserMutations";
import Layout from "../../../layout";
import FormFields from "../FormFields";

interface Props {}

const NewUser: React.FC<Props> = () => {
  const methods = useForm<CreateUserParams>();
  const { register } = methods;
  const [mutate] = useCreateUserMutation();
  const navigate = useNavigate();

  const onSubmit = useCallback(async (params: CreateUserParams) => {
    const res = await mutate({ variables: { params } });
    if (res.data?.result.success) {
      navigate("/users");
    }
  }, []);

  return (
    <Layout title="新增使用者" admin>
      <FormWrapper {...methods} onSubmit={onSubmit}>
        <InputField label="信箱" {...register("email")} autoFocus />
        <FormFields />
        <div className="mb-3 field">
          <label className="label">角色</label>
          <div className="select">
            <select {...register("role")} className="select">
              <option value="REGULAR">一般使用者</option>
              <option value="ADMIN">管理員</option>
            </select>
          </div>
        </div>
        <SubmitButton />
      </FormWrapper>
    </Layout>
  );
};

export default NewUser;
