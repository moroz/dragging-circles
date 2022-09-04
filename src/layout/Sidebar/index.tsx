import useAuth from "../../hooks/useAuth";
import styles from "../Layout.module.sass";
import { Link } from "react-router-dom";
import { APP_NAME, APP_LONG_NAME } from "../../config";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  const { signOut } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <Link to="/" className={styles.title}>
        <h1 className="title">{APP_NAME}</h1>
        <h2 className="subtitle">{APP_LONG_NAME}</h2>
      </Link>
      <nav>
        <SidebarLink to="/">編輯藝術作品</SidebarLink>
        <SidebarLink to="/exhibition">展覽設定</SidebarLink>
        <SidebarLink to="/exhibitions" admin>
          展覽列表
        </SidebarLink>
      </nav>
      <button onClick={signOut} className={styles.logout}>
        登出
      </button>
    </aside>
  );
};

export default Sidebar;
