import axios from "axios";
import { Store } from "../redux/store";

const baseUrl = process.env.REACT_APP_API_BASEURL;
const headers = {
  Authorization: `Bearer +${Store.getState().auth?.data?.token} `,
};

const get = async (endPoint, params = {}) => {
  const url = baseUrl + endPoint;
  return await axios.get(url, { params, headers }).then((res) => {
    return res;
  });
};

const post = async (endPoint, body = {}) => {
  const url = baseUrl + endPoint;

  return await axios
    .post(url, body, { headers })
    .then((res) => {
      return { ...res, status: true };
    })
    .catch((err) => {
      return { ...err, status: false };
    });
};

const fetchApi = {
  get,
  post,
};

export default fetchApi;
