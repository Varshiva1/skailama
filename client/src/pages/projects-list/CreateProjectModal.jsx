import { Form, Input, Modal } from "antd";
import Button from "../../components/Button";

export default function CreateProjectModal({ open, onCancel, onSave }) {
  const [form] = Form.useForm();

  return (
    <Modal
      centered
      open={open}
      title={
        <div style={{ fontSize: 22, fontWeight: 700 }}>Create Project</div>
      }
      closable={false}
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
          label="Enter Project Name:"
          name="project_name"
          rules={[{ required: true, message: "Project Name can't be empty" }]}
        >
          <Input placeholder="Type here" size="large" />
        </Form.Item>

        <div className="flex" style={{ justifyContent: "flex-end" }}>
          <Button
            theme="none"
            styles={{ fontSize: 18, color: "red" }}
            onClick={() => {
              onCancel();
              form.resetFields();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" theme="primary" styles={{ fontSize: 18 }}>
            Create
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
