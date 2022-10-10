export default function authHeader() {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  if (user && token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
