import axiosClient from "../axios-client";
import queryString from "query-string";

export const QueryItem = {
  list: ({ categoryId }) => {
    const url = `${process.env.REACT_APP_JSON_SERVER}/item?category_id=${categoryId}`;
    return axiosClient.get(url);
  },
  item: ({ id }) => {
    const url = `${process.env.REACT_APP_JSON_SERVER}/item/${id}`;
    return axiosClient.get(url);
  },
};
