import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CircularProgress from "./CircularProgress";

function Accountactive() {
  const location = useLocation();
  const queryparams = new URLSearchParams(location.search);
  const email = queryparams.get("email");
  const [progress,setprogress] = useState(true)
  const [active,setactive] = useState(false)
  const [alreadyverified ,setalreadyverified] = useState(false)
  useEffect(() => {
    const checkuser = async () => {
      try {
        const user = await axios.post(
          "https://urlshortner-copy.onrender.com/activateaccount",
          {email}
        );
        if (user.data == "success") {
            setprogress(false)
            setactive(true)
        }
        else if(user.data == "already active"){
            setprogress(false)
            setalreadyverified(true)
        }
        else{
            setprogress(false)
            setactive(false)
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkuser()
  }, [email]);
  return (
    <>
      {progress?<CircularProgress></CircularProgress>:
      (active?<div className="text-center"style={{height:300,width:400,margin:"auto"}}>
        <div><h3>Your Account is Now Active!</h3></div>
        <Link to='/login'target="_blank">
        <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">
          Login
        </button></Link>

      </div>:(alreadyverified?<div className="text-center"><h1>Your account is already active.</h1></div>:<div>Not Verified</div>))}
    </>
  );
}

export default Accountactive;