import {
  Button,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useFormik } from "formik";
import * as Yup from "yup";
import productService from "./product.service";
import categoryService from "../category/category.service";
import brandService from "../brand/brand.service";
import useTable from "../../components/useTable";
import SearchIcon from "@mui/icons-material/Search";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function Products() {
  const headerStyle = { margin: "10px 0" };
  const textStyle = { padding: "0px" };
  const searchStyle = { margin: "10px 0", width: "75%" };
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [product_id, setProductId] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.name.toLowerCase().includes(target.value)
          );
      },
    });
  };
  const headCell = [
    { id: "pro_name", label: "Product Name" },
    { id: "pro_name", label: "Stock" },
    { id: "pro_category", label: "Category" },
    { id: "pro_brand", label: "Brand" },
    { id: "buying_price", label: "Buying Price" },
    { id: "hole_sale_price", label: "Hole-sale Price" },
    { id: "retail_price", label: "Retail Price" },
    { id: "discount_per", label: "Discount %" },
    { id: "action", label: "Action", disableSorting: true },
  ];
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(products, headCell, filterFn);
  const formik = useFormik({
    initialValues: {
      name: "",
      stock: "",
      cat_id: "",
      brand_id: "",
      user_id: user._id,
      buying_price: "",
      hole_sale_selling_price: "",
      retail_price: "",
      discount_percentage: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Must be minimum 3 characters or more")
        .required("Product Name is required"),
      stock: Yup.string().required("Stock is required"),
      cat_id: Yup.string().required("Category is required"),
      brand_id: Yup.string().required("Brand is required"),
      buying_price: Yup.number("Buying price must be Number").required(
        "Buying Price is required"
      ),
      hole_sale_selling_price: Yup.number(
        "Hole Sale Selling Price must be Number"
      ).required("Hole Sale Selling Price is required"),
      retail_price: Yup.number("Retail price must be Number").required(
        "Retail Price is required"
      ),
      discount_percentage: Yup.string().required(
        "Discount Percentage is required"
      ),
    }),
    onSubmit: async (values) => {
      try {
        await productService.addProduct(values).then(
          (response) => {
            toast.success("Product Added Successfully!");
            getAllProducts();
            handleClose();
          },
          (error) => {
            toast.error("Something went wrong!");
            console.log("Error is ", error);
          }
        );
      } catch (err) {
        console.log("Catch Error is ", err);
      }
    },
  });

  //   for add dialog
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    getAllCategories();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    formik.resetForm({ values: "" });
  };
  // end of add Dialog

  //   for delete dialog
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleDelClickOpen = (id) => {
    setProductId(id);
    setOpenDialog(true);
  };
  const handleDelClose = () => {
    setProductId("");
    setOpenDialog(false);
  };
  // end of delete Dialog

  const getAllProducts = async () => {
    try {
      await productService.getProducts().then(
        (response) => {
          setProducts(response.data.response.products);
          setCount(response.data.response.count);
        },
        (error) => {
          console.log("Error is ", error);
        }
      );
    } catch (err) {
      console.log("Catch Error is ", err);
    }
  };
  const getAllCategories = async () => {
    try {
      await categoryService.getCategories().then(
        (response) => {
          setCategories(response.data.response.categories);
        },
        (error) => {
          console.log("Error is ", error);
        }
      );
    } catch (err) {
      console.log("Catch Error is ", err);
    }
  };
  const getBrands = async (cat_id) => {
    try {
      await brandService.getCategoryBrand(cat_id).then(
        (response) => {
          setBrands(response.data.response.brands);
        },
        (error) => {
          console.log("Error is ", error);
        }
      );
    } catch (err) {
      console.log("Catch Error is ", err);
    }
  };
  const deleteProduct = async () => {
    try {
      await productService.deleteProduct(product_id).then(
        (response) => {
          toast.success("Product Deleted Successfully!");
          getAllProducts();
          handleDelClose();
        },
        (error) => {
          console.log("Error is ", error);
        }
      );
    } catch (err) {
      console.log("Exception error ", err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  const errorStyle = {
    color: "red",
    fontWeight: "300",
    fontSize: 15,
    width: "100%",
    margin: "0px auto 15px auto",
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
      <Grid container spacing={2} style={headerStyle}>
        <Grid item xs={8} style={textStyle}>
          <Typography variant="h5" component="h3" sx={{ fontWeight: "600" }}>
            Products
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          style={textStyle}
        >
          <Button
            variant="contained"
            size="small"
            sx={{ mr: 2 }}
            onClick={handleClickOpen}
          >
            Add New Product
          </Button>
        </Grid>
      </Grid>
      <div style={{ height: 500, width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell sx={{ fontWeight: "bold" }}>Id</TableCell> */}
                <TableCell sx={{ fontWeight: "bold" }}>Product Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Stock</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Brand</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Buying Price</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Hole-sale Price
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Retail Price</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Discount %</TableCell>
                <TableCell sx={{ fontWeight: "bold", pr: 5 }} align="right">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {products.map((product) => ( */}
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => (
                  <TableRow
                    key={product._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {/* <TableCell component="th" scope="row">
                    {product._id}
                  </TableCell> */}
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.cat_id.category_name}</TableCell>
                    <TableCell>{product.brand_id.brand_name}</TableCell>
                    <TableCell>{product.buying_price}</TableCell>
                    <TableCell>{product.hole_sale_selling_price}</TableCell>
                    <TableCell>{product.retail_price}</TableCell>
                    <TableCell>{product.discount_percentage}</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="edit">
                        <EditIcon sx={{ color: "green" }} />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelClickOpen(product._id)}
                      >
                        <DeleteIcon sx={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>

      {/* Add Dialog Start */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="md"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Add New Product
        </BootstrapDialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  name="name"
                  label="Product Name"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Product Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p style={errorStyle}>{formik.errors.name}</p>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="Stock"
                  variant="outlined"
                  fullWidth
                  name="stock"
                  placeholder="Enter Product Stock"
                  value={formik.values.stock}
                  onChange={formik.handleChange}
                />
                {formik.touched.stock && formik.errors.stock ? (
                  <p style={errorStyle}>{formik.errors.stock}</p>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  label="Category"
                  name="cat_id"
                  fullWidth
                  value={formik.values.cat_id}
                  // onSelect={() => getBrands()}
                  // onChange={formik.handleChange}
                  onChange={(e) => {
                    formik.handleChange("cat_id")(e);
                    getBrands(e.target.value);
                  }}
                >
                  <MenuItem selected value="">
                    <em>Select the Category</em>
                  </MenuItem>
                  {categories
                    ? categories.map((category, index) => (
                        <MenuItem key={index} value={category._id}>
                          {category.category_name}
                        </MenuItem>
                      ))
                    : null}
                </Select>
                {formik.touched.cat_id && formik.errors.cat_id ? (
                  <p style={errorStyle}>{formik.errors.cat_id}</p>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <InputLabel id="brand-label">Brand</InputLabel>
                <Select
                  labelId="brand-label"
                  label="Brand"
                  name="brand_id"
                  fullWidth
                  value={formik.values.brand_id}
                  onChange={formik.handleChange}
                >
                  <MenuItem selected value="">
                    <em>Select the Brand</em>
                  </MenuItem>
                  {brands
                    ? brands.map((brand, index) => (
                        <MenuItem key={index} value={brand._id}>
                          {brand.brand_name}
                        </MenuItem>
                      ))
                    : null}
                </Select>
                {formik.touched.brand_id && formik.errors.brand_id ? (
                  <p style={errorStyle}>{formik.errors.brand_id}</p>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="Buying Price"
                  type="number"
                  variant="outlined"
                  fullWidth
                  name="buying_price"
                  placeholder="Enter Buying Price"
                  value={formik.values.buying_price}
                  onChange={formik.handleChange}
                />
                {formik.touched.buying_price && formik.errors.buying_price ? (
                  <p style={errorStyle}>{formik.errors.buying_price}</p>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="Hole Sale Selling Price"
                  variant="outlined"
                  fullWidth
                  type="number"
                  name="hole_sale_selling_price"
                  placeholder="Enter Hole Sale Selling Price"
                  value={formik.values.hole_sale_selling_price}
                  onChange={formik.handleChange}
                />
                {formik.touched.hole_sale_selling_price &&
                formik.errors.hole_sale_selling_price ? (
                  <p style={errorStyle}>
                    {formik.errors.hole_sale_selling_price}
                  </p>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="Retail Price"
                  variant="outlined"
                  fullWidth
                  type="number"
                  name="retail_price"
                  placeholder="Enter Retail Price"
                  value={formik.values.retail_price}
                  onChange={formik.handleChange}
                />
                {formik.touched.retail_price && formik.errors.retail_price ? (
                  <p style={errorStyle}>{formik.errors.retail_price}</p>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="Discount %"
                  variant="outlined"
                  fullWidth
                  name="discount_percentage"
                  placeholder="Enter Discount Percentage"
                  value={formik.values.discount_percentage}
                  onChange={formik.handleChange}
                />
                {formik.touched.discount_percentage &&
                formik.errors.discount_percentage ? (
                  <p style={errorStyle}>{formik.errors.discount_percentage}</p>
                ) : null}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  autoFocus
                  variant="outlined"
                  color="primary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                item
                xs={6}
              >
                <Button
                  type="submit"
                  variant="outlined"
                  color="success"
                  autoFocus
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </form>
      </BootstrapDialog>
      {/* Add Dialog Close */}

      {/* Delete Dialog Start */}
      <BootstrapDialog
        onClose={handleDelClose}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleDelClose}
        >
          Delete Product
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Are you sure you wanted to delete this Product ????
          </Typography>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                autoFocus
                variant="outlined"
                color="success"
                onClick={handleDelClose}
              >
                No
              </Button>
            </Grid>
            <Grid
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
              item
              xs={6}
            >
              <Button
                variant="outlined"
                color="error"
                autoFocus
                onClick={deleteProduct}
              >
                Yes
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </BootstrapDialog>
      {/* Add Dialog Close */}
      <ToastContainer />
    </div>
  );
}

export default Products;
