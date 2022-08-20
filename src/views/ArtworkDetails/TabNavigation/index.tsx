import React from "react";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import styles from "./TabNavigation.module.sass";
import { Artwork } from "../../../interfaces/artwork";

interface Props {
  artwork: Artwork;
}

const config = {
  基本資料: "",
  內文編輯: "/body",
  相簿: "/assets"
};

const TabNavigation: React.FC<Props> = ({ artwork }) => {
  const baseUrl = `/artworks/${artwork.id}`;
  const location = useLocation();

  return (
    <div className={clsx("tabs", styles.tabs)}>
      <ul>
        {Object.entries(config).map(([label, href]) => {
          const to = baseUrl + href;
          const active = location.pathname === to;
          return (
            <li className={clsx(active && "is-active")} key={href}>
              <Link to={to}>{label}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TabNavigation;
