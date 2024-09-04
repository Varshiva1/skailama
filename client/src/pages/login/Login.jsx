import fetchApi from "../../api-service";
import styles from "./styles.module.css";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import LogoHeading from "../../components/LogoHeading";
import { Checkbox, Form, Input, notification } from "antd";
import apiEndPoints from "../../api-service/apiEndPoints.json";
import { useState } from "react";

export default function Auth() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [isLogin, setIsLogin] = useState(true); // Toggle state for login/register

  const handleLogin = async (v) => {
    const body = {
      email: v.email,
      password: v.password
    };
    const res = await fetchApi.post(apiEndPoints.LOGIN, body);
    if (res.status) {
      navigate("/projects");
    } else {
      notification.warning({ message: "Invalid username or password" });
    }
  };

  const handleRegister = async (v) => {
    const body = {
      name: v.name,            // Include name for registration
      email: v.email,
      password: v.password
    };
    const res = await fetchApi.post(apiEndPoints.REGISTER, body);
    if (res.status) {
      navigate("/projects");
    } else {
      notification.warning({ message: "Registration failed" });
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
        {isLogin ? (
          <div className="flex-col">
            <Form form={form} onFinish={handleLogin}>
              <Form.Item name="email" rules={[{ required: true, message: "Email is required" }]}>
                <Input placeholder="Email Address" size="large" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Password is required" }]}
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
              <br />
              <Button
                type="submit"
                theme="primary"
                styles={{ width: "100%", justifyContent: "center" }}
              >
                Login
              </Button>
            </Form>

            <div style={{ marginTop: "20px" }}>
              <p>
                Don't have an account?{" "}
                <span
                  style={{ color: "var(--link)", cursor: "pointer" }}
                  onClick={() => setIsLogin(false)} // Switch to Register
                >
                  Create Account
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-col">
            <Form form={registerForm} onFinish={handleRegister}>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Name is required" }]}
              >
                <Input placeholder="Name" size="large" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input placeholder="Email Address" size="large" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input placeholder="Password" type="password" size="large" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                rules={[{ required: true, message: "Please confirm your password" }]}
              >
                <Input placeholder="Confirm Password" type="password" size="large" />
              </Form.Item>
              <br />
              <Button
                type="submit"
                theme="primary"
                styles={{ width: "100%", justifyContent: "center" }}
              >
                Create Account
              </Button>
            </Form>

            <div style={{ marginTop: "20px" }}>
              <p>
                Already have an account?{" "}
                <span
                  style={{ color: "var(--link)", cursor: "pointer" }}
                  onClick={() => setIsLogin(true)} // Switch to Login
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
