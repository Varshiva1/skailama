import { useState } from "react";
import fetchApi from "../../api-service";
import styles from "./styles.module.css";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import LogoHeading from "../../components/LogoHeading";
import { Checkbox, Form, Input, notification } from "antd";
import apiEndPoints from "../../api-service/apiEndPoints.json";

export default function Login() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [userDetails, setUserDetails] = useState({});

  const handleLogin = async (v) => {
    const res = await fetchApi.post(apiEndPoints.LOGIN, v);
    if (res.status) {
      navigate("/projects");
    } else {
      notification.warning({ message: "Invalid usename or password" });
    }
  };

  return (
    <div className={styles.welcome_page}>
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
        <br />
        <br />
        <div className="flex-col">
          <Form form={form} onFinish={handleLogin}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "" }]}
            >
              <Input
                placeholder="Email Address"
                size="large"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, username: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "" }]}
            >
              <Input
                placeholder="Password"
                type="password"
                size="large"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
              />
            </Form.Item>
            <div className="space-between">
              <p>
                <Checkbox />
                &nbsp; Remember me
              </p>
              <p style={{ color: "var(--link)" }}>Forgot password?</p>
            </div>
            <br />
            <Button
              type="submit"
              theme="primary"
              styles={{ width: "100%", justifyContent: "center" }}
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
