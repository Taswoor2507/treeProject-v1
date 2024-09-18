import { ToastContainer } from "react-toastify"
import LoginForm from "./pages/Login"
import RegisterForm from "./pages/Register";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/ui/header/Header";
import Home from "./pages/Home";
import { Outlet } from "react-router-dom";




const App = () => {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
      
  )
}

export default App
