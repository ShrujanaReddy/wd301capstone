import { Navigate, createBrowserRouter } from "react-router-dom";

import Signin from "../pages/signin"
import Signup from "../pages/signup"
import AccountLayout from "../layouts/account"
import ProtectedRoute from "./ProtectedRoute"
import Logout from "../pages/logout";
import Notfound from "../pages/Notfound";
import Dashboard from "../pages/dashboard";

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Navigate to="/signin"
    replace />
  },
  {
    path: "/signin", 
    element: <Signin />
  },
  {
    path: "/signup", 
    element: <Signup />
  },  
  { 
    path: "/logout", 
    element: <Logout /> 
  },
  {
    path: "/dashboard",
    element: (
    //   <ProtectedRoute>
        <Dashboard />
    //   </ProtectedRoute>
    )
  },
  {
    path: "/notfound",
    element: (<Notfound />)
  }
]);

export default router;