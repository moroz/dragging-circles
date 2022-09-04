import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../../layout";

interface Props {}

const UserList: React.FC<Props> = () => {
  return (
    <Layout
      title="使用者列表"
      admin
      actions={
        <Link to="/users/new" className="button is-success">
          新增使用者
        </Link>
      }
    ></Layout>
  );
};

export default UserList;
