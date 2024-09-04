import SideBar from "./SideBar";
import Upgrade from "./Upgrade";
import AddPodcast from "./AddPodcast";
import styles from "./styles.module.css";
import PodcastWidget from "./PodcastWidget";
import { useParams } from "react-router-dom";
import CreateAndRepurse from "./CreateAndRepurse";

export default function ProjectDetails() {
  const { filename, tab } = useParams();

  const activeTabContent = {
    "Add your podcast": <AddPodcast />,
    "Create & repurpose": <CreateAndRepurse />,
    "Podcast widget": <PodcastWidget />,
    Upgrade: <Upgrade />,
  };

  return (
    <div className="flex" style={{ gap: 0, alignItems: "flex-start" }}>
      <SideBar {...{ filename, tab }} />
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
          <div className={styles.breadcrumbs}>
            Home Page / {filename} /{" "}
            <span style={{ color: "var(--primary-color)" }}>{tab}</span>
          </div>
        </div>
        <div>{activeTabContent[tab]}</div>
      </div>
    </div>
  );
}
