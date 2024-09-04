import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./styles.module.css";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import fetchApi from "../../services/api-call";
import logo from "../../assets/icons/logo.svg";
import LogoHeading from "../../components/LogoHeading";
import { Checkbox, Form, Input, notification } from "antd";
import apiEndPoints from "../../services/api-call/apiEndPoints.json";
import { saveAuthData } from "../../services/redux/actions/authActions";

export default function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [isLogin, setIsLogin] = useState(true); // Toggle state for login/register

  const handleLogin = async (v) => {
    const res = await fetchApi.post(
      v?.name ? apiEndPoints.REGISTER : apiEndPoints.LOGIN,
      v
    );
    if (res.status) {
      dispatch(saveAuthData(res));
      navigate("/projects");
    } else {
      notification.error({ message: res.error });
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

        {/* Toggle between Login and Register */}
        <div className="flex-col">
          <Form form={form} onFinish={handleLogin}>
            {isLogin ? (
              <>
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: "" }]}
                >
                  <Input placeholder="Email Address" size="large" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "" }]}
                >
                  <Input placeholder="Password" type="password" size="large" />
                </Form.Item>
                <div className="space-between">
                  <p>
                    <Checkbox />
                    &nbsp; Remember me
                  </p>
                  <p style={{ color: "var(--link)" }}>Forgot password?</p>
                </div>
              </>
            ) : (
              <>
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: "" }]}
                >
                  <Input placeholder="Name" size="large" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: "" }]}
                >
                  <Input placeholder="Email Address" size="large" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "" }]}
                >
                  <Input placeholder="Password" type="password" size="large" />
                </Form.Item>
              </>
            )}
            <br />
            <Button
              type="submit"
              theme="primary"
              styles={{ width: "100%", justifyContent: "center" }}
            >
              {isLogin ? "Login" : "Create Account"}
            </Button>
          </Form>
          <div>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span
              style={{ color: "var(--link)", cursor: "pointer" }}
              onClick={() => {
                form.resetFields();
                setIsLogin(!isLogin);
              }}
            >
              {isLogin ? "Create Account" : "Login"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
