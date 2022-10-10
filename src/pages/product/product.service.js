import axios from "axios";
import authHeader from "../../services/auth-header";

const API_URL = "http://localhost:3000/products";

const getProducts = () => {
  return axios.get(API_URL + "/", { headers: authHeader(), mode: "cors" });
};

const addProduct = (objValues) => {
  // console.log("Service Role name is", role_name);
  return axios.post(API_URL + "/", objValues, {
    headers: authHeader(),
    mode: "cors",
  });
};

const getSingleProduct = (product_id) => {
  return axios.get(API_URL + "/" + product_id).then((response) => {
    return response.data;
  });
};

const deleteProduct = (product_id) => {
  return axios.delete(API_URL + "/" + product_id, {
    headers: authHeader(),
    mode: "cors",
  });
};

const updateProduct = (product_id) => {
  return axios.patch(API_URL + "/" + product_id).then((response) => {
    return response.data;
  });
};

const productService = {
  getProducts,
  addProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};

export default productService;
