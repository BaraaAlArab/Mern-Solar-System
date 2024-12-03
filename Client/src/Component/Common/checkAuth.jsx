import {Navigate, useLocation} from "react-router-dom";

function CheckAuth({isAuthenticated, user, children}) {
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/Account" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/DashProfile" />;
      } else {
        return <Navigate to="/home" />;
      }
    }
  }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/Create") ||
      location.pathname.includes("/Signin")
    )
  ) {
    return <Navigate to="/Create" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/Create") ||
      location.pathname.includes("/Create"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/DashProfile" />;
    } else {
      return <Navigate to="/home" />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/DashProfile" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
