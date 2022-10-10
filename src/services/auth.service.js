import axios from "axios";

const API_URL = "http://localhost:3000/user";

const login = (objValues) => {
  return axios.post(API_URL + "/login", objValues).then((response) => {
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user[0]));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.stringify(localStorage.getItem("user"));
};

const authServices = {
  login,
  logout,
  getCurrentUser,
};

export default authServices;
