import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Role } from "../../interfaces/users";
import styles from "../Layout.module.sass";

interface Props {
  children: React.ReactNode;
  to: string;
  admin?: boolean;
}

const SidebarLink: React.FC<Props> = ({ children, to, admin }) => {
  const { user } = useAuth();
  if (admin && user?.role !== Role.Admin) {
    return null;
  }
  return (
    <Link to={to} className={styles.sidebarLink}>
      {children}
    </Link>
  );
};

export default SidebarLink;
