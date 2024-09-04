import axios from "axios";
import { Store } from "../redux/store";

const baseUrl = process.env.REACT_APP_API_BASEURL;

const get = async (endPoint, params = {}) => {
  const url = baseUrl + endPoint;
  const headers = {
    Authorization: `Bearer ${Store.getState().auth?.data?.token} `,
  };

  return await axios.get(url, { params, headers }).then((res) => {
    return res.data;
  });
};

const post = async (endPoint, body = {}) => {
  const url = baseUrl + endPoint;
  const headers = {
    Authorization: `Bearer ${Store.getState().auth?.data?.token} `,
  };
  return await axios
    .post(url, body, { headers })
    .then((res) => {
      return { ...res.data, status: true };
    })
    .catch((err) => {
      return { ...err.response.data, status: false };
    });
};

const remove = async (endPoint) => {
  const url = baseUrl + endPoint;
  const headers = {
    Authorization: `Bearer ${Store.getState().auth?.data?.token} `,
  };
  return await axios
    .delete(url, { headers })
    .then((res) => {
      return { ...res.data, status: true };
    })
    .catch((err) => {
      return { ...err.response.data, status: false };
    });
};

const fetchApi = {
  get,
  post,
  remove,
};

export default fetchApi;
