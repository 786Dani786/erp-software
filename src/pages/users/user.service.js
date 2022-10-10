import axios from "axios";
import authHeader from "../../services/auth-header";

const API_URL = "http://localhost:3000/user";

const getUsers = () => {
  return axios.get(API_URL + "/", { headers: authHeader(), mode: "cors" });
};

const addUser = (objValues) => {
  // console.log("Service Role name is", role_name);
  return axios.post(API_URL + "/signup", objValues, {
    headers: authHeader(),
    mode: "cors",
  });
};

const delUser = (id) => {
  return axios.delete(API_URL + "/" + id, {
    headers: authHeader(),
    mode: "cors",
  });
};

const userService = {
  getUsers,
  addUser,
  delUser,
};

export default userService;
