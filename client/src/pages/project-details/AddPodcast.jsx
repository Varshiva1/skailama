import moment from "moment";
import EditPodcast from "./EditPodcast";
import styles from "./styles.module.css";
import { notification, Table } from "antd";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import fetchApi from "../../services/api-call";
import AddPodcastModal from "./AddPodcastModal";
import rssIcon from "../../assets/images/rssfeed.png";
import uploadFiles from "../../assets/icons/upload.svg";
import youtubeIcon from "../../assets/images/youtube.png";
import uploadIcon from "../../assets/icons/upload-files.svg";
import apiEndpoints from "../../services/api-call/apiEndPoints.json";

export default function AddPodcast({ projectId }) {
  const [selectedUploadMethod, setSelectedUploadMethod] = useState({});
  const [podcastList, setPodcastList] = useState([]);
  const [edpisodeDetails, setEpisodeDetails] = useState({});

  const tableColumns = [
    {
      title: "No.",
      align: "center",
      render: (text, _, index) => index + 1,
    },
    {
      title: "Name",
      align: "center",
      dataIndex: "name",
    },
    {
      title: "Upload Date & Time",
      align: "center",
      dataIndex: "uploadTime",
      render: (text) => moment(text).format("DD MMM YY | hh:mm A"),
    },
    {
      title: "Action",
      align: "center",
      width: 200,
      render: (text, record) => (
        <div className={styles.podcast_table_action}>
          <span
            onClick={() => setEpisodeDetails(record)}
            style={{
              flex: 1,
              borderRight: "1.5px solid #c7c7c7",
              padding: 3,
              textAlign: "center",
            }}
          >
            View
          </span>
          <span
            onClick={() => handleDeletePodcast(record.id)}
            style={{
              flex: 1,
              padding: 3,
              textAlign: "center",
              color: "#FF274C",
            }}
          >
            Delete
          </span>
        </div>
      ),
    },
  ];

  const fetchPodcasts = async () => {
    setPodcastList(
      (await fetchApi.get(apiEndpoints.GET_PODCAST_LIST + projectId)) || []
    );
  };

  const handleAddPodcast = async (v) => {
    const url = v?.id
      ? apiEndpoints.EDIT_PODCAST + v.id
      : apiEndpoints.ADD_PODCAST + projectId;

    const res = await fetchApi.post(url, v);
    if (res.status) {
      notification.success({ message: res.message });
      fetchPodcasts();
      setSelectedUploadMethod({});
      setEpisodeDetails({});
    } else {
      notification.error({ message: res.error });
    }
  };

  const handleDeletePodcast = async (id) => {
    const res = await fetchApi.remove(apiEndpoints.DELETE_PODCAST + id);
    if (res.status) {
      notification.success({ message: res.message });
      fetchPodcasts();
    } else {
      notification.error({ message: res.error });
    }
  };

  useEffect(() => {
    fetchPodcasts();
  }, []);

  return (
    <div className="flex-col" style={{ gap: "2em" }}>
      {edpisodeDetails?.id ? (
        <EditPodcast
          data={edpisodeDetails}
          onBack={() => setEpisodeDetails({})}
          onSave={handleAddPodcast}
        />
      ) : (
        <>
          <h2>Add Podcast</h2>
          <div className="flex">
            {uploadOptions.map((ele) => (
              <div
                key={ele.label}
                className={`flex ${styles.podcast_upload_options}`}
                onClick={() => setSelectedUploadMethod(ele)}
              >
                <div>
                  <p
                    style={{ fontSize: 20, fontWeight: 700, color: "#1D1929" }}
                  >
                    {ele.label}
                  </p>
                  <p style={{ color: "#646464" }}>{ele.desc}</p>
                </div>
                <img src={ele.icon} alt={ele.label} />
              </div>
            ))}
          </div>
          {podcastList.length ? (
            <div className={styles.podcast_table}>
              <p style={{ fontSize: 18, fontWeight: 600 }}>Your Files</p>
              <br />
              <Table
                pagination={false}
                dataSource={podcastList}
                columns={tableColumns}
              />
            </div>
          ) : (
            <div className={`flex-col ${styles.upload_container}`}>
              <img src={uploadFiles} alt="upload" />
              <p style={{ color: "#49454F" }}>
                Select a file or drag and drop here (Podcast Media or
                Transcription Text)
              </p>
              <p style={{ color: "#00000066" }}>
                MP4, MOV, MP3, WAV, PDF, DOCX or TXT file{" "}
              </p>
              <Button
                theme="none"
                styles={{
                  color: "var(--primary-color)",
                  border: "1px solid var(--primary-color)",
                  borderRadius: 30,
                }}
              >
                Select File
              </Button>
            </div>
          )}
        </>
      )}
      <AddPodcastModal
        data={selectedUploadMethod}
        onCancel={() => setSelectedUploadMethod({})}
        onSave={handleAddPodcast}
      />
    </div>
  );
}

const uploadOptions = [
  {
    label: "RSS Feed",
    add_title: "Upload from RSS",
    desc: "Lorem ipsum dolor sit.Dolor lorem sit.",
    icon: rssIcon,
  },
  {
    label: "Youtube Video",
    add_title: "Upload from Youtube",
    desc: "Lorem ipsum dolor sit.Dolor lorem sit.",
    icon: youtubeIcon,
  },
  {
    label: "Upload Files",
    add_title: "Upload from file",
    desc: "Lorem ipsum dolor sit.Dolor lorem sit.",
    icon: uploadIcon,
  },
];
