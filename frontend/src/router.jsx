import { createBrowserRouter } from "react-router-dom";
import RegisterForm from "./pages/Register";
import LoginForm from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import App from "./App";
import Auth from "./layouts/authLayout/Auth";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
const router = createBrowserRouter([
    {
        path:"/auth" , 
        element:<Auth/>,
        children:[
            {
                path:"login" , 
                element:<LoginForm/>,
            },
            {
                path:"register" , 
                element:<RegisterForm/>,
            }
        ]
    } , 
    {
        path:"/" , 
        element:<App/>
    },
    {
        path:"/login" , 
        element:<LoginForm/>
    },

    {
        path:"/register" ,
        element:<RegisterForm/>
    } ,
    {
        path:"/dashboard" ,
        element:<ProtectedRoute><Dashboard/></ProtectedRoute>
    }
])

export default router;