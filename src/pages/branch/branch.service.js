import axios from "axios";
import authHeader from "../../services/auth-header";

const API_URL = "http://localhost:3000/branch";

const getBranch = () => {
  return axios.get(API_URL + "/", { headers: authHeader(), mode: "cors" });
};

const addBranch = (objValues) => {
  return axios.post(API_URL + "/", objValues, {
    headers: authHeader(),
    mode: "cors",
  });
};

const getSingleBranch = (branch_id) => {
  return axios.get(API_URL + "/" + branch_id, {
    headers: authHeader(),
    mode: "cors",
  });
};

const deleteBranch = (branch_id) => {
  return axios.delete(API_URL + "/" + branch_id, {
    headers: authHeader(),
    mode: "cors",
  });
};

const updateBranch = (branch_id) => {
  return axios.patch(API_URL + "/" + branch_id, {
    headers: authHeader(),
    mode: "cors",
  });
};

const getBusinessBranch = (business_id) => {
  return axios.get(API_URL + "/get_branch_business/" + business_id, {
    headers: authHeader(),
    mode: "cors",
  });
};

const branchService = {
  getBranch,
  addBranch,
  getSingleBranch,
  deleteBranch,
  updateBranch,
  getBusinessBranch,
};

export default branchService;
