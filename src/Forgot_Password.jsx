import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import CircularProgress from "./CircularProgress";

function Forgot_Password() {
  const [notfound, setnoutfound] = useState(false);
  const [otp, setotp] = useState(false);
  const [forgotbutton, setforgotbutton] = useState(true);
  const [disabled, setdisabled] = useState(false);
  const [otpstate, setotpstate] = useState(false);
  const [otpsent, setotpsent] = useState(false);
  const [progress, setprogress] = useState(false);

  //Formikstate for email
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      let error = {};
      if (values.email.length == 0) {
        error.email = "Enter email";
      }
      return error;
    },
    onSubmit: (values) => {
      forgot_password(values);
    },
  });


  //This is a function where otp is generated.
  const forgot_password = async (value) => {
    try {
      setprogress(true);
      const useremail = value.email;
      const userfound = await axios.get(
        `https://urlshortner-copy.onrender.com/forgotpassword/${useremail}`
      );

      if (userfound.data == "User Exists") {
        setnoutfound(false);
        setforgotbutton(false);
        setdisabled(true);
        try {
          const generate_otp = await axios.put(
            `https://urlshortner-copy.onrender.com/generateotp/${useremail}`
          );
          if (generate_otp.data == "otpsent") {
            setotp(true);
            setotpsent(true);
            setprogress(false);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setprogress(false);
        setnoutfound(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //This is a function where otp is verified with the user entered opt.
  const verifyotp = async (otpvalue) => {
    setprogress(true);
    const useremail = formik.values.email;
    const otp = otpvalue.otp;
    try {
      const verify_otp = await axios.get(
        `https://urlshortner-copy.onrender.com/verifyotp/${useremail}/${otp}`
      );
      if (verify_otp.data == "verified") {
        setprogress(false);
        setotpstate(false);
      } else {
        setotpstate(true);
        setprogress(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="card" style={{ width: "20rem" }}>
          <div className="card-body">
            <h1 className="h3 mb-3 fw-normal" style={{fontWeight:"500",fontFamily:"sans-serif"}}>Forgot Password</h1>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                disabled={disabled}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            {formik.getFieldMeta("email").error &&
              formik.getFieldMeta("email").touched && (
                <span style={{ color: "red" }}>
                  {formik.getFieldMeta("email").error}
                </span>
              )}
            {notfound && (
              <div>
                <p style={{ color: "red" }}>User Not Found</p>
              </div>
            )}




            {forgotbutton ? (
              progress ? (
                <CircularProgress />
              ) : (
                <button
                  className="btn btn-primary w-100 py-2"
                  type="submit"
                  style={{ marginTop: 10 }}
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                >
                  Forgot Password
                </button>
              )
            ) : progress ? (
              <CircularProgress />
            ) : (
              ""
            )}
            {otpsent && (
              <p style={{ color: "green",fontWeight:"500",marginLeft:5 }}>Password Reset Link is sent to your Email .</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Forgot_Password;