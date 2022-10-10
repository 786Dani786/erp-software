import {
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import productService from "../product/product.service";
import useTable from "../../components/useTable";
import SearchIcon from "@mui/icons-material/Search";
import AddAlertIcon from "@mui/icons-material/AddAlert";

function Stock() {
  const headerStyle = { margin: "10px 0" };
  const textStyle = { padding: "0px" };
  const searchStyle = { margin: "10px 0", width: "75%" };
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState();
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

  useEffect(() => {
    getAllProducts();
  }, []);
  const headCell = [
    { id: "pro_name", label: "Product" },
    { id: "pro_category", label: "Category" },
    { id: "pro_brand", label: "Brand" },
    { id: "pro_stock", label: "No of Units" },
    { id: "pro_min_stock", label: "Min Stock" },
    { id: "action", label: "Action", disableSorting: true },
  ];
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(products, headCell, filterFn);
  return (
    <div>
      <Grid container spacing={2} style={headerStyle}>
        <Grid item xs={12} style={textStyle}>
          <Typography variant="h5" component="h3" sx={{ fontWeight: "600" }}>
            Stocks
          </Typography>
        </Grid>
      </Grid>
      <div style={{ height: 500, width: "100%" }}>
        <TableContainer component={Paper}>
          <Toolbar>
            <TextField
              style={searchStyle}
              id="outlined-basic"
              label="Search"
              variant="outlined"
              size="small"
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Toolbar>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography align="center">No Records Found</Typography>
                  </TableCell>
                </TableRow>
              )}
              {recordsAfterPagingAndSorting().map((product) => (
                <TableRow
                  key={product._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.cat_id.category_name}</TableCell>
                  <TableCell>{product.brand_id.brand_name}</TableCell>
                  <TableCell>{product.stock}</TableCell>

                  <TableCell>
                    {product.min_no_of_alert ? product.min_no_of_alert : "---"}
                  </TableCell>
                  <TableCell>
                    <IconButton aria-label="add_alert">
                      <AddAlertIcon sx={{ color: "green" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </TableContainer>
      </div>
    </div>
  );
}

export default Stock;
