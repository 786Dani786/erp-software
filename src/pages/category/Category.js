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
import moment from "moment";

import { useFormik } from "formik";
import * as Yup from "yup";
import categoryService from "./category.service";

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

function Category() {
  const headerStyle = { margin: "10px 0" };
  const textStyle = { padding: "0px" };
  const [categories, setCategories] = useState([]);
  const [count, setCount] = useState();
  const [category_id, setCategoryId] = useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  //   for add dialog
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
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
    setCategoryId(id);
    setOpenDialog(true);
  };
  const handleDelClose = () => {
    setCategoryId("");
    setOpenDialog(false);
  };
  // end of delete Dialog
  const user = JSON.parse(localStorage.getItem("user"));
  const formik = useFormik({
    initialValues: {
      category_name: "",
      user_id: user._id,
    },
    validationSchema: Yup.object({
      category_name: Yup.string()
        .min(3, "Must be minimum 3 characters or more")
        .required("Category Name is required"),
      user_id: Yup.string().required("User id is required"),
    }),
    onSubmit: async (values) => {
      try {
        await categoryService.addCategory(values).then(
          (response) => {
            toast.success("Category Added Successfully!");
            getAllCategories();
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

  const getAllCategories = async () => {
    try {
      await categoryService.getCategories().then(
        (response) => {
          setCategories(response.data.response.categories);
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

  const deleteCategory = async () => {
    try {
      await categoryService.deleteCategory(category_id).then(
        (response) => {
          toast.success("Category Deleted Successfully!");
          getAllCategories();
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

  const errorStyle = {
    color: "red",
    fontWeight: "300",
    fontSize: 15,
    width: "100%",
    margin: "0px auto 15px auto",
  };

  useEffect(() => {
    getAllCategories();
  }, []);

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
            Categories
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
            Add New Category
          </Button>
        </Grid>
      </Grid>
      <div style={{ height: 500, width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Id</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Category Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Created By</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Created At</TableCell>
                <TableCell sx={{ fontWeight: "bold", pr: 5 }} align="right">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((category) => (
                  <TableRow
                    key={category._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {category._id}
                    </TableCell>
                    <TableCell>{category.category_name}</TableCell>
                    <TableCell>{category.user_id.user_name}</TableCell>
                    <TableCell>
                      {moment(category.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="edit">
                        <EditIcon sx={{ color: "green" }} />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelClickOpen(category._id)}
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
            count={categories.length}
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
          Add New Category
        </BootstrapDialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent dividers>
            <TextField
              sx={{ width: "450px" }}
              margin="dense"
              name="category_name"
              label="Category Name"
              variant="outlined"
              fullWidth
              placeholder="Enter Category Name"
              value={formik.values.category_name}
              onChange={formik.handleChange}
            />
            {formik.touched.category_name && formik.errors.category_name ? (
              <p style={errorStyle}>{formik.errors.category_name}</p>
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
          Delete Category
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Are you sure you wanted to delete this Category ????
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
                onClick={deleteCategory}
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

export default Category;
