import { useState } from "react";
import ProjectCard from "./ProjectCard";
import styles from "./styles.module.css";
import Button from "../../components/Button";
import CreateProjectModal from "./CreateProjectModal";
import LogoHeading from "../../components/LogoHeading";
import noProjectIcon from "../../assets/icons/new-project.svg";
import { BellOutlined, SettingOutlined } from "@ant-design/icons";

export default function ProjectsList() {
  const [projectList, setProjectList] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex-col" style={{ padding: "3em 5em" }}>
      <div className={`space-between`}>
        <LogoHeading />
        <div className="flex">
          <SettingOutlined style={{ fontSize: 30 }} />
          <BellOutlined style={{ fontSize: 30 }} />
        </div>
      </div>

      {!projectList.length ? (
        <div className={`flex-col ${styles.no_project_container}`}>
          <h2 style={{ fontSize: 28, color: "var(--primary-color)" }}>
            Create a New Project
          </h2>
          <img src={noProjectIcon} alt="new project" />
          <p className={styles.no_project_text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in
          </p>
          <CreateButton {...{ setOpenModal }} />
        </div>
      ) : (
        <div className="flex-col" style={{ gap: "2em" }}>
          <div />
          <div className="space-between">
            <h2 style={{ color: "var(--primary-color)" }}>Projects</h2>
            <CreateButton {...{ setOpenModal }} />
          </div>
          <div className="flex" style={{ flexWrap: "wrap" }}>
            {projectList.map((ele, idx) => (
              <ProjectCard key={idx} data={ele} />
            ))}
          </div>
        </div>
      )}

      <CreateProjectModal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onSave={(v) => {
          setProjectList([...projectList, v]);
          setOpenModal(false);
        }}
      />
    </div>
  );
}

const CreateButton = ({ setOpenModal }) => {
  return (
    <Button theme="#211935" onClick={() => setOpenModal(true)}>
      <p
        style={{
          width: 25,
          height: 25,
          background: "#F8F8F8",
          borderRadius: "100%",
          color: "#211935",
        }}
      >
        +
      </p>
      Create New Project
    </Button>
  );
};
