import { ToastContainer } from "react-toastify"
import LoginForm from "./pages/Login"
import RegisterForm from "./pages/Register";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/ui/header/Header";
import Home from "./pages/Home";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadUser, setCredentials } from "./redux/authSlice/AuthSlice";
import axiosInstance from "./axiosCofig/axiosInstance";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/users/current', { withCredentials: true });
        if (response && response.data) {
          console.log(response, "my Data listing")
          //  axiosInstance.Authorization({
            //   'Content-Type': 'application/json',
            //   'Authorization': `Bearer ${response.data.accessToken}`
            //  })
            dispatch(loadUser(response.data));
            dispatch(setCredentials(response.data)); 
          } else {
          dispatch(loadUser(null));
        }
      } catch (err) {
        console.log(err);
        dispatch(loadUser(null));
      }
    };
  
    fetchUserData();
  }, [dispatch]);
  
  return (
    <>
      <Header/>
      <Outlet/>
    </>
      
  )
}

export default App
