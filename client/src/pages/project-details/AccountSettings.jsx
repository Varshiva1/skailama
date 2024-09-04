import { Avatar, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

export default function AccountSettings() {
  const user = useSelector((state) => state.auth);

  return (
    <>
      <h2>Account Settings</h2>
      <br />
      <br />
      <div className="flex" style={{ gap: "2em" }}>
        <Avatar size={100} icon={<UserOutlined />} />
        <div>
          <p>User Name</p>
          <Input size="large" value={user?.name || ""} />
        </div>
        <div>
          <p>Email</p>
          <Input size="large" value={user?.email || ""} />
        </div>
      </div>
    </>
  );
}
