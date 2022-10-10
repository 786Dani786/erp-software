import { Grid } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Last 6 Months Orders",
    },
  },
};

export const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Last 6 Months Income",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

// const lineLabels = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
// ];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [67, 68, 98, 108, 67, 670, 887],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [107, 89, 208, 58, 79, 60, 57],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
export const lineData = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [167, 98, 93, 83, 107, 760, 798],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [107, 89, 208, 58, 79, 60, 57],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  height: "100px",
  display: "flex",
  justifyContent: "space-between",
  borderRadius: "10px",
}));
const columnStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};
const titleStyle = {
  fontWeight: "bold",
  fontSize: "14px",
  color: "rgb(160, 160, 160)",
};
const counterStyle = {
  fontSize: "28px",
  fontWeight: "300",
};
const linkStyle = {
  width: "max-content",
  fontSize: "12px",
  borderBottom: "1px solid gray",
};
const percentageStyle = {
  display: "flex",
  alignItem: "center",
  fontSize: "14px",
  color: "green",
};
const iconStyle = {
  fontSize: "32px",
  padding: "5px",
  // backgroundColor: "rgba(128, 0, 128, 0.342)",
  borderRadius: "8px",
  alignSelf: "flex-end",
};

function Dashboard() {
  return (
    <div>
      {/* <Widget /> */}
      {/* <Widget />
      <Widget />
      <Widget /> */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Item>
            <div style={columnStyle}>
              <span style={titleStyle}>USERS</span>
              <span style={counterStyle}>23456</span>
              <span style={linkStyle}>See all users</span>
            </div>
            <div style={columnStyle}>
              <div style={percentageStyle}>
                <KeyboardArrowUpIcon />
                20%
              </div>
              <PersonOutlineIcon
                style={iconStyle}
                sx={{
                  color: "crimson",
                  backgroundColor: "rgba(255, 0, 0, 0.2)",
                }}
              />
            </div>
          </Item>
        </Grid>
        <Grid item xs={12} md={3}>
          <Item>
            <div style={columnStyle}>
              <span style={titleStyle}>ORDERS</span>
              <span style={counterStyle}>1567</span>
              <span style={linkStyle}>View all orders</span>
            </div>
            <div style={columnStyle}>
              <div style={percentageStyle}>
                <KeyboardArrowUpIcon />
                20%
              </div>
              <AddShoppingCartIcon
                style={iconStyle}
                sx={{
                  color: "goldenrod",
                  backgroundColor: "rgba(218, 165, 32, 0.2)",
                }}
              />
            </div>
          </Item>
        </Grid>
        <Grid item xs={12} md={3}>
          <Item>
            <div style={columnStyle}>
              <span style={titleStyle}>EARNINGS</span>
              <span style={counterStyle}>$23456</span>
              <span style={linkStyle}>View net earning</span>
            </div>
            <div style={columnStyle}>
              {/* rgb(236, 64, 122) */}
              <div style={percentageStyle}>
                <KeyboardArrowUpIcon />
                20%
              </div>
              <MonetizationOnIcon
                style={iconStyle}
                sx={{
                  color: "green",
                  backgroundColor: "rgba(0, 128, 0, 0.2)",
                }}
              />
            </div>
          </Item>
        </Grid>
        <Grid item xs={12} md={3}>
          <Item>
            <div style={columnStyle}>
              <span style={titleStyle}>BALANCE</span>
              <span style={counterStyle}>$7390</span>
              <span style={linkStyle}>View details</span>
            </div>
            <div style={columnStyle}>
              <div style={percentageStyle}>
                <KeyboardArrowUpIcon />
                20%
              </div>
              <AccountBalanceWalletIcon
                style={iconStyle}
                sx={{
                  color: "purple",
                  backgroundColor: "rgba(128, 0, 128, 0.2)",
                }}
              />
            </div>
          </Item>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ mt: 6 }}>
            <Bar options={options} data={data} sx={{ height: 1600 }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ mt: 6 }}>
            <Line options={lineOptions} data={lineData} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
