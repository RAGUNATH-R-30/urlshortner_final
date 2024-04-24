import "/node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Accountactive from "./Accountactive";
import Dashboard from "./Dashboard";
import TopNavbar from "./TopNavbar";
import ShortenUrl from "./ShortenUrl";
import MyUrls from "./MyUrls";
import Homepage from "./Homepage";
import { redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import Forgot_Password from "./Forgot_Password";
import NewPassword from "./NewPassword";
import PasswordUpdated from "./PasswordUpdated";
import { AuthProtector } from "./AuthProtector ";
function App() {
  const [verified, setVerified] = useState(false);

  return (
    <>
    <BrowserRouter>
    
        <div className="container-fluid">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />}></Route>
            
            <Route path="/accountactive" element={<Accountactive />}></Route> 
            {/* <Route path="/homepage"element={<Homepage/>}></Route> */}
            <Route path="/" element={<AuthProtector><TopNavbar/><Dashboard /></AuthProtector>}></Route>
            <Route path="/shortenurl"element={<AuthProtector><TopNavbar/>,<ShortenUrl/></AuthProtector>}></Route>
            <Route path="/myurls"element={<AuthProtector><TopNavbar/>,<MyUrls/></AuthProtector>}></Route>
            <Route path="/forgotpassword"element={<AuthProtector><Forgot_Password/></AuthProtector>}></Route>
            <Route path="/newpassword"element={<AuthProtector><NewPassword/></AuthProtector>}></Route>
            <Route path="/passwordupdated"element={<AuthProtector><PasswordUpdated/></AuthProtector>}></Route>
          </Routes>
          
        </div>
        </BrowserRouter>
    </>
  );
}




export default App;
