import { Form, Input, Modal } from "antd";
import Button from "../../components/Button";
import TextArea from "antd/es/input/TextArea";

export default function AddPodcastModal({ data, onCancel, onSave }) {
  const [form] = Form.useForm();

  return (
    <Modal
      centered
      open={!!Object.keys(data).length}
      title={
        <div className="flex">
          <img
            src={data.icon}
            alt={data.add_title}
            style={{ width: 35, height: 35, borderRadius: "100%" }}
          />
          <p style={{ fontSize: 18, color: "#3C3C3C" }}>{data.add_title}</p>
        </div>
      }
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={(label, info) => (
          <div>
            {label} {info.required && <span style={{ color: "red" }}>*</span>}
          </div>
        )}
        onFinish={(v) => {
          onSave(v);
          form.resetFields();
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label={data?.label?.includes("RSS") ? "Transcription" : "Link"}
          name="link"
          rules={[{ required: true, message: "" }]}
        >
          {data?.label?.includes("RSS") ? (
            <TextArea rows={5} />
          ) : (
            <Input size="large" />
          )}
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" theme="#211935" styles={{ fontSize: 18 }}>
            Upload
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
