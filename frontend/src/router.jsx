import { createBrowserRouter } from "react-router-dom";
import RegisterForm from "./pages/Register";
import LoginForm from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import App from "./App";
import Auth from "./layouts/authLayout/Auth";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import Home from "./pages/Home";

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
            }
        ]
    },
    {
        path: "", 
        element: <App />, // Public route (your main App component)
        children:[
            {
                path: "/", // The main route for your app
                element: <Home/>
            },
            {
                path: "protected/dashboard", // The main route for your app
                element: <Dashboard />, // The dashboard component
            }
        ]
    },
    {
        path: "/login", 
        element: <LoginForm /> // Additional login route (can be omitted if handled under /auth/login)
    },
    {
        path: "/register",
        element: <RegisterForm /> // Additional register route (can be omitted if handled under /auth/register)
    },
    {
        path: "/protected", // The base route for protected content
        element: <ProtectedRoute> {/* Wrap the child with ProtectedRoute */}
            <Dashboard /> {/* You can specify components inside */}
        </ProtectedRoute>,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />, // Protected dashboard route
            }
        ]
    }
]);

export default router;
