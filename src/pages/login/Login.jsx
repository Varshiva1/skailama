import styles from "./styles.module.css";
import LogoHeading from "../../components/LogoHeading";
import logo from "../../assets/icons/logo.svg";

export default function Login() {
  return (
    <div className={`flex`}>
      <div className={`${styles.login_mask_bg}`}>
        <LogoHeading theme="white" />
        <br />
        <br />
        <br />
        <h1>
          Your Podcast <br />
          will no longer <br />
          be just a hobby
        </h1>
        <br />
        <br />
        <p style={{ fontSize: 24 }}>
          Supercharge Your Distribution <br /> using our AI assistant!
        </p>
      </div>
      <div className={styles.login_container}>
        <img src={logo} alt="Ques.AI" width={90} height={90} />
        <p className={styles.welcome_text}>
          Welcome to <br />
          <span>Ques.AI</span>
        </p>
      </div>
    </div>
  );
}
