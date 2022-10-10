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
import brandSerive from "./brand.service";
import categoryService from "../category/category.service";
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
import moment from "moment";

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

function Brand() {
  const headerStyle = { margin: "10px 0" };
  const textStyle = { padding: "0px" };
  const [brands, setBrands] = useState([]);
  const [count, setCount] = useState();
  const [brand_id, setBrandId] = useState();
  const [categories, setCategories] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const formik = useFormik({
    initialValues: {
      brand_name: "",
      user_id: user._id,
      cat_id: "",
    },
    validationSchema: Yup.object({
      brand_name: Yup.string()
        .min(3, "Must be minimum 3 characters or more")
        .required("Brand Name is required"),
      user_id: Yup.string().required("User id is required"),
      cat_id: Yup.string().required("Category is required"),
    }),
    onSubmit: async (values) => {
      try {
        await brandSerive.addBrand(values).then(
          (response) => {
            toast.success("Brand Added Successfully!");
            getAllBrands();
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
    setBrandId(id);
    setOpenDialog(true);
  };
  const handleDelClose = () => {
    setBrandId("");
    setOpenDialog(false);
  };
  // end of delete Dialog

  const getAllBrands = async () => {
    try {
      await brandSerive.getBrands().then(
        (response) => {
          setBrands(response.data.response.brands);
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
  const deleteBrand = async () => {
    try {
      await brandSerive.deleteBrand(brand_id).then(
        (response) => {
          toast.success("Brand Deleted Successfully!");
          getAllBrands();
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
    getAllBrands();
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
            Brands
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
            Add New Brand
          </Button>
        </Grid>
      </Grid>
      <div style={{ height: 580, width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Id</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Brand Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Created By</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Created At</TableCell>
                <TableCell sx={{ fontWeight: "bold", pr: 5 }} align="right">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {brands
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((brand) => (
                  <TableRow
                    key={brand._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {brand._id}
                    </TableCell>
                    <TableCell>{brand.brand_name}</TableCell>
                    <TableCell>{brand.cat_id.category_name}</TableCell>
                    <TableCell>{brand.user_id.user_name}</TableCell>
                    <TableCell>
                      {moment(brand.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="edit">
                        <EditIcon sx={{ color: "green" }} />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelClickOpen(brand._id)}
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
            count={brands.length}
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
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Add New Brand
        </BootstrapDialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent dividers>
            <TextField
              sx={{ width: "450px" }}
              margin="dense"
              name="brand_name"
              label="Brand Name"
              variant="outlined"
              fullWidth
              placeholder="Enter Brand Name"
              value={formik.values.brand_name}
              onChange={formik.handleChange}
            />
            {formik.touched.brand_name && formik.errors.brand_name ? (
              <p style={errorStyle}>{formik.errors.brand_name}</p>
            ) : null}

            <InputLabel id="categories-label">Categories</InputLabel>
            <Select
              sx={{ width: "450px" }}
              labelId="categories-label"
              label="Category"
              name="cat_id"
              fullWidth
              value={formik.values.cat_id}
              onChange={formik.handleChange}
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
          Delete Brand
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Are you sure you wanted to delete this Brand ????
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
                onClick={deleteBrand}
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

export default Brand;
