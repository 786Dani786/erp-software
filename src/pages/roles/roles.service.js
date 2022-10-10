import axios from "axios";
import authHeader from "../../services/auth-header";

const API_URL = "http://localhost:3000/roles";

const getRoles = () => {
  return axios.get(API_URL + "/", { headers: authHeader(), mode: "cors" });
};

const addRole = (role_name) => {
  // console.log("Service Role name is", role_name);
  return axios.post(
    API_URL + "/",
    { role_name: role_name },
    { headers: authHeader(), mode: "cors" }
  );
};

const getSingleRole = (role_id) => {
  return axios.get(API_URL + "/" + role_id).then((response) => {
    return response.data;
  });
};

const deleteRole = (role_id) => {
  return axios.delete(API_URL + "/" + role_id).then((response) => {
    return response.data;
  });
};

const updateRole = (role_id) => {
  return axios.patch(API_URL + "/" + role_id).then((response) => {
    return response.data;
  });
};

const roleService = {
  getRoles,
  addRole,
  getSingleRole,
  deleteRole,
  updateRole,
};

export default roleService;
