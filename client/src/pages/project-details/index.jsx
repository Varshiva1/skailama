import SideBar from "./SideBar";
import Upgrade from "./Upgrade";
import AddPodcast from "./AddPodcast";
import styles from "./styles.module.css";
import PodcastWidget from "./PodcastWidget";
import { Link, useParams } from "react-router-dom";
import CreateAndRepurse from "./CreateAndRepurse";
import Help from "./Help";
import AccountSettings from "./AccountSettings";
import { BellOutlined } from "@ant-design/icons";
import logOutIcon from "../../assets/icons/logout.svg";
import homeIcon from "../../assets/icons/home.svg";

export default function ProjectDetails() {
  const { filename, tab } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const projectId = queryParams.get("id");

  const activeTabContent = {
    "Add your podcast": <AddPodcast {...{ projectId }} />,
    "Create & repurpose": <CreateAndRepurse />,
    "Podcast widget": <PodcastWidget />,
    Upgrade: <Upgrade />,
    help: <Help />,
    "account settings": <AccountSettings />,
  };

  const breadcrumbs = [
    {
      label: "Home Page",
      icon: homeIcon,
      link: "/projects",
    },
    {
      label: filename,
      link: "/projects",
    },
    {
      label: tab,
      link: window.location.href,
    },
  ];

  return (
    <div className="flex" style={{ gap: 0, alignItems: "flex-start" }}>
      <SideBar {...{ filename, tab, projectId }} />
      <div
        className="flex-col"
        style={{
          background: "#F9F9F9",
          padding: "2em 3em",
          width: "100%",
          height: "91vh",
        }}
      >
        <div className="space-between">
          <div className={`flex`} style={{ gap: 8 }}>
            {breadcrumbs.map((ele, index) => (
              <Link
                key={index}
                to={ele.link}
                style={{
                  color: index === 2 ? "var(--primary-color)" : "#999999",
                  textDecoration: "none",
                }}
              >
                {ele?.icon && (
                  <>
                    <img src={ele?.icon} alt={ele.label} width={15} />
                    &nbsp;
                  </>
                )}
                {ele.label} {index < 2 && "/"}
              </Link>
            ))}
          </div>
          <div className="flex">
            <div className={styles.icon_bg}>
              <BellOutlined />
            </div>
            <div className={styles.icon_bg}>
              <img src={logOutIcon} alt="logout" width={16} height={16} />
            </div>
          </div>
        </div>
        <br />
        <div>{activeTabContent[tab]}</div>
      </div>
    </div>
  );
}
