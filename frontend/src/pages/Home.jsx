import Trees from "../components/Trees/Trees";
import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-[96vh] flex items-center justify-center border bg-no-repeat bg-center bg-cover " style={{background:"rgb(0,0,0,0.3) url('https://img.freepik.com/free-vector/silhouette-forest-landscape-background_1308-79069.jpg?t=st=1727700194~exp=1727703794~hmac=318d654413b7a59202ce586ef535f343a7c44e43c2f4563b286899a7cc848f99&w=740')" , backgroundPosition:"center" ,  backgroundSize:"cover" , backgroundRepeat:"no-repeat", backgroundBlendMode:"darken"}}>
      <div className="inner">
        <h1 className="text-6xl font-bold w-[800px] mx-auto text-white ">Empowering Tree Conservation with Technology</h1>
        <p className="text-white font-[18px] mt-5">
        Easily manage, track, and care for your trees with our centralized platform—where data meets nature
        </p>
        <button className="bg-green-600 text-white px-8 py-3 rounded-md mt-5" onClick={()=>{navigate("/auth/register")}}>Get Started</button>
      </div>
    </div>
  );
};

export default Home;
