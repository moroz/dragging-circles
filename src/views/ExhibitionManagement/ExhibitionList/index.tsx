import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useSetActiveExhibitionMutation } from "../../../gql/mutations/ExhibitionMutations";
import { useListExhibitionsQuery } from "../../../gql/queries/ExhibitionQueries";
import useAuth from "../../../hooks/useAuth";
import { Exhibition } from "../../../interfaces/exhibitions";
import Layout from "../../../layout";
import NotFound from "../../NotFound";

interface Props {}

const ExhibitionList: React.FC<Props> = () => {
  const { isAdmin } = useAuth();
  const { data } = useListExhibitionsQuery();
  const [mutate] = useSetActiveExhibitionMutation();

  const onSetActive = useCallback(({ id, title }: Exhibition) => {
    return async () => {
      const confirmation = `您確定希望將「${title}」設為活躍展覽嗎？`;
      if (!confirm(confirmation)) return;
      await mutate({
        variables: { id },
        refetchQueries: ["ListExhibitions"],
        awaitRefetchQueries: true
      });
    };
  }, []);

  if (!isAdmin) return <NotFound />;

  return (
    <Layout
      title="展覽列表"
      admin
      actions={
        <Link to="/exhibitions/new" className="button is-info">
          新增展覽
        </Link>
      }
    >
      <table className="table is-bordered">
        <thead>
          <th>名稱</th>
          <th>是否活躍展覽</th>
          <th></th>
        </thead>
        <tbody>
          {data?.exhibitions.map((e) => (
            <tr key={e.id}>
              <td>{e.title}</td>
              <td>{e.active ? "是" : "否"}</td>
              <td>
                {!e.active && (
                  <button type="button" onClick={onSetActive(e)}>
                    設為活躍展覽
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default ExhibitionList;
