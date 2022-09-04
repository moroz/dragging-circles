import React from "react";
import { Link } from "react-router-dom";
import { useListExhibitionsQuery } from "../../../gql/queries/ExhibitionQueries";
import Layout from "../../../layout";

interface Props {}

const ExhibitionList: React.FC<Props> = () => {
  const { data } = useListExhibitionsQuery();

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
          <th>ID</th>
          <th>名稱</th>
          <th>是否活躍展覽</th>
        </thead>
        <tbody>
          {data?.exhibitions.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.title}</td>
              <td>{e.active ? "是" : "否"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default ExhibitionList;
