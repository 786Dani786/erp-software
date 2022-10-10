import "./App.css";
import ResponsiveDrawer from "./pages/header/Header";
import SignIn from "./pages/auth/SignIn";
// import jwt from "jsonwebtoken";
// import authServices from "./services/auth.service";

function App() {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  // jwt.verify(token, "Secret", function (err, decode) {
  //   if (err) {
  // authServices.logout;
  // console.log("Token expire");
  //   }
  // });
  return (
    <div className="App">
      {user && token ? (
        <ResponsiveDrawer />
      ) : (
        // <Router>
        <SignIn />
        // </Router>
      )}

      {/* <ResponsiveDrawer /> */}
      {/* <SignIn /> */}
      {/* {ROUTES.map((item, index) => (
          <Routes key={index}>
            <Route path={item.path} element={<item.component />} />
          </Routes>
        ))}*/}
    </div>
  );
}

export default App;
