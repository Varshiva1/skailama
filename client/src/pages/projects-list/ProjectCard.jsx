import moment from "moment";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ data }) {
  const navigate = useNavigate();

  const getInitials = () => {
    const name = data.title.split(" ");
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
      onClick={() => navigate(`/${data.title}/Add your podcast?id=${data.id}`)}
    >
      <div className={styles.project_name_initials}>{getInitials()}</div>
      <div>
        <p className={styles.project_name}>{data.title}</p>
        <p style={{ fontSize: 12 }}>{data.episodes} Episodes</p>
        <br />
        <p style={{ fontSize: 12 }}>
          Last edited {moment(data.updatedAt).fromNow()}
        </p>
      </div>
    </div>
  );
}
