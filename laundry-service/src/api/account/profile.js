import axiosClient from "../axios-client";

export const QueryProfile = {
  userProfile: () => {
    const token = localStorage.getItem("TOKEN");
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const url = `${process.env.REACT_APP_API_SERVER}/profile`;
    return axiosClient.get(url, config);
  },
};

export const CommandProfile = {
  Avatar: (data) => {
    const token = localStorage.getItem("TOKEN");
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const url = `${process.env.REACT_APP_API_SERVER}/profile`;
    return axiosClient.put(url, data, config);
  },

  profile: (data) => {
    const token = localStorage.getItem("TOKEN");
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const url = `${process.env.REACT_APP_API_SERVER}/profile`;
    return axiosClient.put(url, data, config);
  },
};
