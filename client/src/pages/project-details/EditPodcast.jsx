import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import styles from "./styles.module.css";
import TextArea from "antd/es/input/TextArea";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function EditPodcast({ data, onBack, onSave }) {
  const [form] = Form.useForm();

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      name: data.name,
      link: data.link,
    });
  }, [data]);

  return (
    <div>
      <div className="space-between">
        <div className="flex">
          <ArrowLeftOutlined style={{ fontSize: 20 }} onClick={onBack} />
          <h2>Edit Transcript</h2>
        </div>
        <div className="flex">
          {editMode && (
            <Button
              theme="none"
              styles={{
                border: "1px solid #E01919",
                color: "#E01919",
                fontSize: 16,
                paddingInline: "1.5em",
              }}
              onClick={() => {
                setEditMode(false);
                form.setFieldsValue({
                  name: data.name,
                  link: data.link,
                });
              }}
            >
              Discard
            </Button>
          )}
          <Button
            onClick={() => {
              if (editMode) {
                form.submit();
              } else {
                setEditMode(true);
              }
            }}
            theme="#211935"
            styles={{
              fontSize: 16,
              paddingInline: "1.5em",
            }}
          >
            {editMode ? "Save" : "Edit"}
          </Button>
        </div>
      </div>
      <br />
      <div className={styles.podcast_table}>
        <Form
          form={form}
          layout="vertical"
          onFinish={(v) => {
            onSave({ ...v, id: data.id });
            form.resetFields();
          }}
        >
          <Form.Item name="name" rules={[{ required: true, message: "" }]}>
            <Input
              size="large"
              variant="borderless"
              style={{ color: "var(--primary-color)", fontWeight: 700 }}
              readOnly={!editMode}
            />
          </Form.Item>
          <Form.Item name="link" rules={[{ required: true, message: "" }]}>
            <TextArea
              readOnly={!editMode}
              rows={5}
              variant="borderless"
              style={{ resize: "none", color: "#63635E" }}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
