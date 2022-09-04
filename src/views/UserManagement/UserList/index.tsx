import React from "react";
import { Link } from "react-router-dom";
import { useListUsersQuery } from "../../../gql/queries/UserQueries";
import Layout from "../../../layout";

interface Props {}

const UserList: React.FC<Props> = () => {
  const { data, loading } = useListUsersQuery();

  return (
    <Layout
      title="使用者列表"
      admin
      actions={
        <Link to="/users/new" className="button is-success">
          新增使用者
        </Link>
      }
    >
      <table className="table is-bordered">
        <thead>
          <th>信箱</th>
          <th>角色</th>
          <th></th>
        </thead>
        <tbody>
          {data?.users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/users/${user.id}`}>編輯</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default UserList;
