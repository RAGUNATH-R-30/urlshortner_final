import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import CircularProgress from "./CircularProgress";
function Signup() {
const [buttonstate,setbuttonstate] = useState(true)
const [exist,setexist] = useState(false)
const [progress,setprogress]=useState(false)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
    validate: (values) => {
      let error = {};
      if (values.email.length === 0) {
        error.email = "Enter the email";
      }
      if (values.firstname.length === 0) {
        error.firstname = "Enter the Firstname";
      }
      if (values.lastname.length === 0) {
        error.lastname = "Enter the Lastname";
      }
      if (values.password.length === 0) {
        error.password = "Enter the Password";
      }
      if (values.password.length < 4) {
        error.password = "Enter Password Greater than 4.";
      }
      return error;
    },
    onSubmit: (values) => {
      signup(values)
    },
  });

  const signup = async(values)=>{
    try {
      setprogress(true)
      const newuser = await axios.post("https://urlshortner-copy.onrender.com/createuser",values)
      if(newuser.data!=="success"){
        setprogress(false)
        setexist(true)
      }
      else{
        setexist(false)
        setprogress(false)
        setbuttonstate(false)

      }
    } catch (error) {
      console.log(error)
    }


  }
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="card" style={{ width: "350px" }}>
          <div className="card-body">
            <h5 className="card-title text-center mb-3">Sign Up</h5>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <label htmlFor="floatingInput">Email address</label>
                {formik.getFieldMeta("email").error &&
                  formik.getFieldMeta("email").touched && (
                    <span style={{ color: "red" }}>
                      {formik.getFieldMeta("email").error}
                    </span>
                  )}
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  placeholder="name@example.com"
                  name="firstname"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                />
                <label htmlFor="floatingInput">FirstName</label>

                {formik.getFieldMeta("firstname").error &&
                  formik.getFieldMeta("firstname").touched && (
                    <span style={{ color: "red" }}>
                      {formik.getFieldMeta("firstname").error}
                    </span>
                  )}
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  placeholder="name@example.com"
                  name="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                />
                <label htmlFor="floatingInput">LastName</label>

                {formik.getFieldMeta("lastname").error &&
                  formik.getFieldMeta("lastname").touched && (
                    <span style={{ color: "red" }}>
                      {formik.getFieldMeta("lastname").error}
                    </span>
                  )}
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <label htmlFor="floatingPassword">Password</label>

                {formik.getFieldMeta("password").error &&
                  formik.getFieldMeta("password").touched && (
                    <span style={{ color: "red" }}>
                      {formik.getFieldMeta("password").error}
                    </span>
                  )}
              </div>
              {
                exist&&<span style={{color:"red"}}>User Already Exist.</span>
              }
             { buttonstate?(progress?(<CircularProgress/>):<button
                className="w-100 btn btn-lg btn-primary mt-3"
                type="submit"
              >
                Register
              </button>):(<span className="text-center" style={{color:"green"}}>Account activation Link is sent to Your Email.</span>)}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
