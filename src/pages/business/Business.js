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
import moment from "moment";
import businessService from "./business.service";

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

function Business() {
  const headerStyle = { margin: "10px 0" };
  const textStyle = { padding: "0px" };
  const [businesses, setBusiness] = useState([]);
  const [business_id, setBusinessId] = useState();
  const [count, setCount] = useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const formik = useFormik({
    initialValues: {
      business_name: "",
    },
    validationSchema: Yup.object({
      business_name: Yup.string()
        .min(3, "Must be minimum 3 characters or more")
        .required("Business Name is required"),
    }),
    onSubmit: async (values) => {
      try {
        await businessService.addBusiness(values).then(
          (response) => {
            toast.success("Business Added Successfully!");
            getAllBusinesses();
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
    // getAllCategories();
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
    setBusinessId(id);
    setOpenDialog(true);
  };
  const handleDelClose = () => {
    setBusinessId("");
    setOpenDialog(false);
  };
  // end of delete Dialog

  const getAllBusinesses = async () => {
    try {
      await businessService.getBusiness().then(
        (response) => {
          setBusiness(response.data.response.business);
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
  const deleteBusiness = async () => {
    try {
      await businessService.deleteBusiness(business_id).then(
        (response) => {
          toast.success("Business Deleted Successfully!");
          getAllBusinesses();
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
    getAllBusinesses();
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
            Businesses
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
            Add New Business
          </Button>
        </Grid>
      </Grid>
      <div style={{ height: 500, width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Id</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Business Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Created At</TableCell>
                <TableCell sx={{ fontWeight: "bold", pr: 5 }} align="right">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {businesses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((business) => (
                  <TableRow
                    key={business._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {business._id}
                    </TableCell>
                    <TableCell>{business.business_name}</TableCell>
                    <TableCell>
                      {moment(business.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="edit">
                        <EditIcon sx={{ color: "green" }} />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelClickOpen(business._id)}
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
            count={businesses.length}
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
          Add New Business
        </BootstrapDialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent dividers>
            <TextField
              sx={{ width: "450px" }}
              margin="dense"
              name="business_name"
              label="Business Name"
              variant="outlined"
              fullWidth
              placeholder="Enter Business Name"
              value={formik.values.business_name}
              onChange={formik.handleChange}
            />
            {formik.touched.business_name && formik.errors.business_name ? (
              <p style={errorStyle}>{formik.errors.business_name}</p>
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
          Delete Business
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Are you sure you wanted to delete this Business ????
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
                onClick={deleteBusiness}
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

export default Business;
