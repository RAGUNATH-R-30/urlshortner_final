import React from "react";
import { Navigate } from "react-router-dom";

export const AuthProtector = (props) => {
  if (localStorage.getItem("token")) {
    return <React.Fragment>{props.children}</React.Fragment>;
  } else {
    return <Navigate to={"/login"} />;
  }
};