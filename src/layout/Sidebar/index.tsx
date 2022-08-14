import useAuth from "../../hooks/useAuth";
import styles from "../Layout.module.sass";
import { Link } from "react-router-dom";
import CurrentUser from "./CurrentUser";
import { APP_NAME, APP_LONG_NAME } from "../../config";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  const { signOut } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <Link to="/" className={styles.title}>
        <h1 className="title">{APP_LONG_NAME}</h1>
        <h2 className="subtitle">{APP_NAME}</h2>
      </Link>
      <nav>
        <SidebarLink to="/">官網部署狀態</SidebarLink>
        <SidebarLink to="/import">匯入文章資料</SidebarLink>
      </nav>
      <section className={styles.userSection}>
        <CurrentUser />
      </section>
      <button onClick={signOut} className={styles.logout}>
        登出
      </button>
    </aside>
  );
};

export default Sidebar;
