import Dashboard from "./pages/dashboard/Dashboard";
import Expenses from "./pages/expenses/Expenses";
import Order from "./pages/orders/Order";
import Reports from "./pages/reports/Reports";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Roles from "./pages/roles/Roles";
import Users from "./pages/users/Users";
import Category from "./pages/category/Category";
import Brand from "./pages/brand/Brand";
import Products from "./pages/product/Products";
import Profile from "./pages/profile/Profile";
import Business from "./pages/business/Business";
import Branch from "./pages/branch/Branch";
import Stock from "./pages/stock/Stock";
import Price from "./pages/prices/Price";

const ROUTES = [
  {
    path: "/",
    component: Dashboard,
    icon: <DashboardIcon style={{ color: "#fff" }} />,
    title: "Dashboard",
  },
  {
    path: "/orders",
    component: Order,
    icon: <BorderColorIcon style={{ color: "#fff" }} />,
    title: "Orders",
  },
  {
    path: "/expenses",
    component: Expenses,
    icon: <LocalAtmIcon style={{ color: "#fff" }} />,
    title: "Expenses",
  },
  {
    path: "/reports",
    component: Reports,
    icon: <AssessmentIcon style={{ color: "#fff" }} />,
    title: "Reports",
  },
  {
    path: "roles",
    component: Roles,
    title: "Roles",
  },
  {
    path: "users",
    component: Users,
    title: "Users",
  },
  {
    path: "categories",
    component: Category,
    title: "Categories",
  },
  {
    path: "brands",
    component: Brand,
    title: "Brands",
  },
  {
    path: "products",
    component: Products,
    title: "Products",
  },
  {
    path: "profile",
    component: Profile,
    title: "Profile",
  },
  {
    path: "business",
    component: Business,
    title: "Business",
  },
  {
    path: "branch",
    component: Branch,
    title: "Branch",
  },
  {
    path: "stock",
    component: Stock,
    title: "Stock",
  },
  {
    path: "price",
    component: Price,
    title: "Price",
  },
];

export default ROUTES;
