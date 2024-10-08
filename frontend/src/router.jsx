import { createBrowserRouter } from "react-router-dom";
import RegisterForm from "./pages/Register";
import LoginForm from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import App from "./App";
import Auth from "./layouts/authLayout/Auth";
// import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import { AdminRoute } from "./RoleBasedAuth/Router";
import Tree from "./components/Trees/Tree";
import Trees from "./components/Trees/Trees";
import TreeDetails from "./components/TreeDetails/TreeDetails";
import TreeForm from "./components/TreesForm/TreeForm";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />, // The layout for authentication-related routes
    children: [
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
    ],
  },
  {
    path: "/",
    element: <App />, // Public route (your main App component)
    children: [
      {
        path: "", // The main route for your app
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />, // Additional register route (can be omitted if handled under /auth/register)
      },
      {
        path: "/trees",
        element: <Trees />, // Additional register route (can be omitted if handled under /auth/register)
      },
      {
        path: "/tree/:treeId",
        element: <TreeDetails/>, // Additional register route (can be omitted if handled under /auth/register)
      },
      { 
          path:"/dashboard",
          element:<AdminRoute><Dashboard/></AdminRoute>
      
      },
      { 
        path:"/add-tree",
        element:<AdminRoute><TreeForm/></AdminRoute>
    
    },
    ],
  },
  // {
  //   path: "/login",
  //   element: <LoginForm />, // Additional login route (can be omitted if handled under /auth/login)
  // },
  // {
  //   path: "/register",
  //   element: <RegisterForm />, // Additional register route (can be omitted if handled under /auth/register)
  // },

  
  

]);

export default router;
