import axios from "axios";
import authHeader from "../../services/auth-header";

const API_URL = "http://localhost:3000/categories";

const getCategories = () => {
  return axios.get(API_URL + "/", { headers: authHeader(), mode: "cors" });
};

const addCategory = (objValues) => {
  return axios.post(API_URL + "/", objValues, {
    headers: authHeader(),
    mode: "cors",
  });
};

const getSingleCategory = (cat_id) => {
  return axios.get(API_URL + "/" + cat_id, {
    headers: authHeader(),
    mode: "cors",
  });
};

const deleteCategory = (cat_id) => {
  return axios.delete(API_URL + "/" + cat_id, {
    headers: authHeader(),
    mode: "cors",
  });
};

const updateCategory = (cat_id) => {
  return axios.patch(API_URL + "/" + cat_id, {
    headers: authHeader(),
    mode: "cors",
  });
};

const categoryService = {
  getCategories,
  addCategory,
  getSingleCategory,
  deleteCategory,
  updateCategory,
};

export default categoryService;
