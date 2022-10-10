import axios from "axios";
import authHeader from "../../services/auth-header";

const API_URL = "http://localhost:3000/business";

const getBusiness = () => {
  return axios.get(API_URL + "/", { headers: authHeader(), mode: "cors" });
};

const addBusiness = (objValues) => {
  return axios.post(API_URL + "/", objValues, {
    headers: authHeader(),
    mode: "cors",
  });
};

const getSingleBusiness = (business_id) => {
  return axios.get(API_URL + "/" + business_id, {
    headers: authHeader(),
    mode: "cors",
  });
};

const deleteBusiness = (business_id) => {
  return axios.delete(API_URL + "/" + business_id, {
    headers: authHeader(),
    mode: "cors",
  });
};

const updateBusiness = (business_id) => {
  return axios.patch(API_URL + "/" + business_id, {
    headers: authHeader(),
    mode: "cors",
  });
};

const businessService = {
  getBusiness,
  addBusiness,
  getSingleBusiness,
  deleteBusiness,
  updateBusiness,
};

export default businessService;
