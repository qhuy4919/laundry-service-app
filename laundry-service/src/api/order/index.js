import axiosClient from "api/axios-client";

export const CommandOrder = {
  list: (data) => {
    const url = `${process.env.REACT_APP_API_SERVER}/order`;
    const token = localStorage.getItem("TOKEN");
    let config = {
      headers: {
        Authorization: token,
      },
    };
    return axiosClient.post(url, data, config);
  },
};
