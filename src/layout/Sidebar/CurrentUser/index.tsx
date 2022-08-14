import React from "react";
import useAuth from "../../../hooks/useAuth";
import styles from "../../Layout.module.sass";

interface Props {}

const CurrentUser: React.FC<Props> = () => {
  const { user } = useAuth();

  return (
    <div className={styles.currentUser}>
      <p className={styles.label}>目前使用者</p>
      <p className={styles.name}>{user!.displayName}</p>
    </div>
  );
};

export default CurrentUser;
