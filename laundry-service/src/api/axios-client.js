import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  headers: {
    "content-type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
  timeout: 30000,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    console.log("query error");
  }
);

export default axiosClient;
