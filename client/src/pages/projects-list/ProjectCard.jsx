import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ data }) {
  const navigate = useNavigate();

  const getInitials = () => {
    const name = data.project_name.split(" ");
    let initials = "";
    if (name.length === 1) {
      initials = name[0][0] + name[0][1];
    } else {
      initials = name[0][0] + name[1][0];
    }
    return initials;
  };

  return (
    <div
      className={`flex ${styles.project_card}`}
      onClick={() => navigate(`/${data.project_name}/Add your podcast`)}
    >
      <div className={styles.project_name_initials}>{getInitials()}</div>
      <div>
        <p className={styles.project_name}>{data.project_name}</p>
        <p style={{ fontSize: 12 }}>4 Episodes</p>
        <br />
        <p style={{ fontSize: 12 }}>Last edited a week ago</p>
      </div>
    </div>
  );
}
