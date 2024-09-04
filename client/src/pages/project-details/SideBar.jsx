import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import LogoHeading from "../../components/LogoHeading";
import { PlusOutlined } from "@ant-design/icons";

export default function SideBar({ filename, tab }) {
  const menuOptions = [
    {
      label: "Add your Podcast(s)",
      icon: <PlusOutlined />,
      route: "Add your podcast",
    },
    {
      label: "Create & Repurpose",
      icon: "",
      route: "Create & repurpose",
    },
    {
      label: "Podcast Widget",
      icon: "",
      route: "Podcast widget",
    },
    {
      label: "Upgrade",
      icon: "",
      route: "Upgrade",
    },
  ];
  return (
    <div className={`flex-col ${styles.sidebar_container}`}>
      <div style={{ paddingInline: "3em" }}>
        <LogoHeading />
      </div>
      {menuOptions.map((ele) => (
        <Link
          key={ele.route}
          to={`/${filename}/${ele.route}`}
          className={`${styles.sidebar_menu_link} ${
            tab === ele.route && styles.sidebar_menu_link_active
          }`}
        >
          {ele.icon} {ele.label}
        </Link>
      ))}
    </div>
  );
}
