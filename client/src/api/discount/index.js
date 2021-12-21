import axiosClient from "../axios-client";

export const DiscountAPI = {
  list: async () => {
    const token = localStorage.getItem("TOKEN");
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const url = `${process.env.REACT_APP_API_SERVER}/discount`;
    return axiosClient.get(url, config);
  },

  get: async (code, totalAmmount) => {
    if (!code) code = '-';
    const token = localStorage.getItem("TOKEN");
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const url = `${process.env.REACT_APP_API_SERVER}/discount/${code}?totalAmmount=${totalAmmount}`;
    return axiosClient.get(url, config);
  },

  create: async (data) => {
    const token = localStorage.getItem("TOKEN");
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const url = `${process.env.REACT_APP_API_SERVER}/discount`;
    return axiosClient.post(url, data, config);
  },


  delete: async (id) => {
    const token = localStorage.getItem("TOKEN");
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const url = `${process.env.REACT_APP_API_SERVER}/discount/${id}`;
    return axiosClient.delete(url, config);
  },

  update: async (data) => {
    const token = localStorage.getItem("TOKEN");
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const url = `${process.env.REACT_APP_API_SERVER}/discount`;
    return axiosClient.put(url, data, config);
  },
};