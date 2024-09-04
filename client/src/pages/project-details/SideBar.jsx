import { Avatar } from "antd";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import editIcon from "../../assets/icons/edit.svg";
import LogoHeading from "../../components/LogoHeading";
import plusIcon from "../../assets/icons/plus-icon.svg";
import upgradeIcon from "../../assets/icons/upgrade.svg";
import podacstWidgetIcon from "../../assets/icons/copy.svg";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";

export default function SideBar({ filename, tab, projectId }) {
  const user = useSelector((state) => state.auth);

  const menuOptions = [
    {
      label: "Add your Podcast(s)",
      icon: plusIcon,
      route: "Add your podcast",
    },
    {
      label: "Create & Repurpose",
      icon: editIcon,
      route: "Create & repurpose",
    },
    {
      label: "Podcast Widget",
      icon: podacstWidgetIcon,
      route: "Podcast widget",
    },
    {
      label: "Upgrade",
      icon: upgradeIcon,
      route: "Upgrade",
    },
  ];

  return (
    <div className={`flex-col ${styles.sidebar_container}`}>
      <div style={{ padding: "0 3em 1em" }}>
        <LogoHeading />
      </div>
      <div
        className="space-between"
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          height: "82vh",
        }}
      >
        <div>
          {menuOptions.map((ele) => (
            <Link
              key={ele.route}
              to={`/${filename}/${ele.route}?id=${projectId}`}
              className={`flex ${styles.sidebar_menu_link} ${
                tab === ele.route && styles.sidebar_menu_link_active
              }`}
            >
              <img src={ele.icon} alt={ele.label} /> {ele.label}
            </Link>
          ))}
          <br />
          <div className={styles.line} />
        </div>
        <div>
          <Link
            to={`/${filename}/help?id=${projectId}`}
            className={`flex ${styles.sidebar_menu_link} ${
              tab === "help" && styles.sidebar_menu_link_active
            }`}
          >
            <SettingOutlined /> Help
          </Link>
          <div className={styles.line} style={{ marginBlock: "1em" }} />
          <Link
            to={`/${filename}/account settings?id=${projectId}`}
            className={`flex ${styles.sidebar_menu_link}`}
            style={{ gap: "0.5em" }}
          >
            <Avatar shape="square" size="large" icon={<UserOutlined />} />
            <div>
              <p>{user?.name}</p>
              <p style={{ fontSize: 12, color: "#3C3C3C" }}>{user?.email}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
