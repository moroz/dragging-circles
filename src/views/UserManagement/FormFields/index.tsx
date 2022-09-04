import React from "react";
import { useFormContext } from "react-hook-form";
import InputField from "../../../components/InputField";

interface Props {
  isUpdate?: boolean;
}

const FormFields: React.FC<Props> = ({ isUpdate }) => {
  const { register, watch } = useFormContext();
  const password = watch("password");

  return (
    <>
      <InputField
        label={isUpdate ? "輸入新密碼" : "設定密碼"}
        type="password"
        autoFocus={isUpdate}
        {...register("password")}
      />
      <InputField
        label="確認密碼"
        type="password"
        {...register("passwordConfirmation", {
          validate: (value) =>
            value && password && value !== password ? "密碼不相符" : true
        })}
      />
    </>
  );
};

export default FormFields;
