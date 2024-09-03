import axios from "axios";

const baseUrl = process.env.REACT_API_BASEURL;

const get = async (endPoint, params = {}) => {
  const url = baseUrl + endPoint;
  return await axios.get(url, { params }).then((res) => {
    return res;
  });
};

const post = async (endPoint, body = {}) => {
  const url = baseUrl + endPoint;
  return await axios
    .post(url, body)
    .then((res) => {
      return { ...res, status: true };
    })
    .catch(() => {
      return { status: false };
    });
};

const fetchApi = {
  get,
  post,
};

export default fetchApi;
