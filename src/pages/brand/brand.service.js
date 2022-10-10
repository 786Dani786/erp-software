import axios from "axios";
import authHeader from "../../services/auth-header";

const API_URL = "http://localhost:3000/brands";

const getBrands = () => {
  return axios.get(API_URL + "/", { headers: authHeader(), mode: "cors" });
};

const addBrand = (objValues) => {
  return axios.post(API_URL + "/", objValues, {
    headers: authHeader(),
    mode: "cors",
  });
};

const getSingleBrand = (brand_id) => {
  return axios.get(API_URL + "/" + brand_id, {
    headers: authHeader(),
    mode: "cors",
  });
};

const deleteBrand = (brand_id) => {
  return axios.delete(API_URL + "/" + brand_id, {
    headers: authHeader(),
    mode: "cors",
  });
};

const updateBrand = (brand_id) => {
  return axios.patch(API_URL + "/" + brand_id, {
    headers: authHeader(),
    mode: "cors",
  });
};

const getCategoryBrand = (cat_id) => {
  return axios.get(API_URL + "/get_cat_brand/" + cat_id, {
    headers: authHeader(),
    mode: "cors",
  });
};

const brandService = {
  getBrands,
  addBrand,
  getSingleBrand,
  deleteBrand,
  updateBrand,
  getCategoryBrand,
};

export default brandService;
