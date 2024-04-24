import React, { useEffect, useState } from "react";
import UrlCard from "./UrlCard";
import TopNavbar from "./TopNavbar";
import axios from "axios";
import SomethingWrong from "./SomethingWrong";

function Dashboard() {
  const [userdata,setuserdata]=useState({})
  const [urllength,seturllength]=useState(0)
  const [counts,setcounts] = useState(0)
  const [monthurlcount,setsetmonthurlcount] = useState(0)
  const[wrong,setwrong] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem('email')

    const getuserinfo=async()=>{
      try {
        const userdata = await axios.post(`https://urlshortner-copy.onrender.com/userinfo`,{email:email},{
          headers:{
            Authorization:token
          }
        });
  
        setuserdata(userdata.data.user)
        seturllength(userdata.data.user.urls.length)
        setcounts(userdata.data.count)
        setsetmonthurlcount(userdata.data.monthurlcount)
      } catch (error) {
        setwrong(true)
        console.log(error)
      }
    }
    getuserinfo()
  },[]);
  return (
    <>
      {wrong?<SomethingWrong></SomethingWrong>:<div className="container">
        <div className="row mt-5">
          <div className="col-lg-6">
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    {/* <h5 className="card-title">{userdata.firstname}</h5> */}
                    <div>
                    <div className="row mb-1">
                      <div className="col-lg-6"style={{fontWeight:"bold"}}>UserName:</div>
                      <div className="col-lg-6">{userdata.email}</div>
                    </div>

                    <div className="row mb-1">
                      <div className="col-lg-6"style={{fontWeight:"bold"}}>FirstName:</div>
                      <div className="col-lg-6">{userdata.firstname}</div>
                    </div>

                    <div className="row mb-2">
                      <div className="col-lg-6"style={{fontWeight:"bold"}}>LastName:</div>
                      <div className="col-lg-6">{userdata.lastname}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6">Total urls Shortened:</div>
                      <div className="col-lg-6">{urllength}Urls</div>
                    </div>
                    </div>
                    
                  
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card"style={{height:75}}>
              <div className="card-body">
                <span style={{fontSize:20}}>Today You Shortened <b>{counts}Urls</b> </span>
                
              </div>
            </div>

            <div className="card mt-4"style={{height:75}}>
              <div className="card-body">
              <span style={{fontSize:20}}>This Month You Shortened <b>{monthurlcount}Urls</b> </span>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}

export default Dashboard;

{
  /* <div className="card mb-3" style={{ maxWidth: "540px" }}>
<div className="row g-0">
  <div className="col-md-4">
    <img src="..." class="img-fluid rounded-start" alt="..." />
  </div>
  <div className="col-md-8">
    <div className="card-body">
      <h5 className="card-title">Card title</h5>
      <p className="card-text">
        This is a wider card with supporting text below as a natural
        lead-in to additional content. This content is a little bit
        longer.
      </p>
      <p className="card-text">
        <small className="text-body-secondary">
          Last updated 3 mins ago
        </small>
      </p>
    </div>
  </div>
</div>
</div> */
}
