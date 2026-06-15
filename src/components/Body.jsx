import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import axios from "axios"
import { BASE_URL } from "../utils/constent"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserProfile = async()=>{
    try{
      const user = await axios.get(BASE_URL+"/profile/view",{withCredentials:true});
      dispatch(addUser(user.data));
      navigate("/feed");
    }catch(err){
      navigate('/login');
      console.error(err);
    }
  }
  useEffect(()=>{
    getUserProfile();
  },[])


  return (
    <div className="min-h-screen flex flex-col"> 
        <Navbar/>
        <div className="flex-1">
          <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default Body