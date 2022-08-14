import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";

import {
  SignInMutationVars,
  useSignInMutation
} from "../../gql/mutations/AuthMutations";
import useAuth from "../../hooks/useAuth";
import Loader from "../../layout/Loader";
import Message from "../../components/Message";
import { APP_NAME } from "../../config";
import styles from "./SignIn.module.sass";
import clsx from "clsx";

const SignIn = () => {
  const { user, loading } = useAuth();
  const [mutate, { loading: working }] = useSignInMutation();
  const { register, handleSubmit } = useForm<SignInMutationVars>();
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);

  const onSubmit = useCallback(
    async (params: SignInMutationVars) => {
      try {
        const res = await mutate({ variables: params });
        if (res.data?.signIn) {
          navigate("/");
        } else {
          setHasError(true);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [mutate]
  );

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.login}>
      <Helmet>
        <title>登入・{APP_NAME}</title>
      </Helmet>
      <h1 className="title is-2">{APP_NAME}</h1>
      <div className={clsx("card", styles.loginCard)}>
        <div className="card-content">
          <h2 className="title is-3">登入</h2>
          {hasError && !working ? (
            <Message variant="warning">您所輸入的帳號或密碼有誤。</Message>
          ) : null}
          {working ? <Message>處理中，請稍候……</Message> : null}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label htmlFor="email" className="label">
                用戶名或信箱
              </label>
              <input
                type="text"
                id="email"
                className="input"
                autoFocus
                {...register("email")}
              />
            </div>
            <div className="field">
              <label htmlFor="password" className="label">
                密碼
              </label>
              <input
                type="password"
                id="password"
                className="input"
                {...register("password")}
              />
            </div>
            <button className="button is-primary is-fullwidth">登入</button>
          </form>
        </div>
      </div>
      <footer>
        <p>
          Version: v0.0.1 (for demonstration purposes only)
          <br />
          Copyright &copy; 2022 Karol Moroz
        </p>
      </footer>
    </div>
  );
};

export default SignIn;
