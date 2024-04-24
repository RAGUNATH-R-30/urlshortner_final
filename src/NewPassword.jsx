import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "./CircularProgress";
import NotVerified from "./NotVerified";

function NewPassword() {
  const location = useLocation();
  const queryparams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [initprogress, setinitprogress] = useState(true);
  const [progress, setprogress] = useState(false);
  const [verified, setverified] = useState(false);
  const email = queryparams.get("email");
  const otp = queryparams.get("otp");

  //Formikstate for password
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: (values) => {
      let error = {};
      if (values.password.length == 0) {
        error.password = "Enter the password.";
      }
      return error;
    },
    onSubmit: (values) => {
      updatepassword(values);
    },
  });

  //this is function which updates the user password.
  const updatepassword = async (value) => {
    setprogress(true);
    const password = value.password;
    try {
      const passwordupdate = await axios.put(
        `https://urlshortner-copy.onrender.com/updatepassword/${email}`,{password:password}
      );
      setprogress(false);
      navigate("/passwordupdated");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const verifyotp = async () => {
      try {
        const verify_otp = await axios.get(
          `https://urlshortner-copy.onrender.com/verifyotp/${email}/${otp}`
        );
        if (verify_otp.data == "verified") {
          setinitprogress(false);
          setverified(true);
        } else {
          setinitprogress(false);
          setverified(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyotp();
  }, [email, otp]);
  return (
    <>
      {initprogress ? (
        <CircularProgress />
      ) : verified ? (
        <div className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}>
        <div className="card" style={{ width: "20rem" }}>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <h1 className="h3 mb-3 fw-normal">Enter New password</h1>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <label htmlFor="floatingInput">New Password</label>
              </div>
              {formik.getFieldMeta("password").error &&
              formik.getFieldMeta("password").touched && (
                <span style={{ color: "red" }}>
                  {formik.getFieldMeta("password").error}
                </span>
              )}
              {progress ? (
                <CircularProgress />
              ) : (
                <button
                  className="btn btn-primary w-100 py-2"
                  type="submit"
                  style={{ marginTop: 10 }}
                >
                  Submit
                </button>
              )}
            </form>
          </div>
        </div></div>
      ) : (
        <NotVerified />
      )}
    </>
  );
}

export default NewPassword;