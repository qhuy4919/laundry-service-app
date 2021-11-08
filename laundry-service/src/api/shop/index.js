import axiosClient from "../axios-client";
import queryString from "query-string";

export const QueryShop = {
  list: () => {
    const url = `${process.env.REACT_APP_API_SERVER}/shop`;
    return axiosClient.get(url);
  },
  item: ({ id }) => {
    const url = `${process.env.REACT_APP_API_SERVER}/shop/${id}`;
    return axiosClient.get(url);
  },
};

export const CommandShopAvatar = {
  avatar: (data, id) => {
    const token = localStorage.getItem("TOKEN");
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const url = `${process.env.REACT_APP_API_SERVER}/shop-pic/${id}`;
    return axiosClient.post(url, data, config);
  },
};
