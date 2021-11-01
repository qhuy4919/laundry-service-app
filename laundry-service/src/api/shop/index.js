import axiosClient from "../axios-client";
import queryString from "query-string";

export const QueryShop = {
  list: () => {
    const url = `${process.env.REACT_APP_JSON_SERVER}/shop`;
    return axiosClient.get(url);
  },
  item: ({ id }) => {
    const url = `${process.env.REACT_APP_JSON_SERVER}/shop/${id}`;
    return axiosClient.get(url);
  },
};
