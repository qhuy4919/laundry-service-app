import axiosClient from "../axios-client";
import queryString from "query-string";

export const QueryCategory = {
  list: ({ shopId }) => {
    const url = `${process.env.REACT_APP_API_SERVER}/category?shop_id=${shopId}`;
    return axiosClient.get(url);
  },
  item: ({ id }) => {
    const url = `${process.env.REACT_APP_API_SERVER}/category/${id}`;
    return axiosClient.get(url);
  },
};
