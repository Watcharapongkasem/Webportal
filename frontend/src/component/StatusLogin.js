import React from "react";
import { Redirect, Route } from "react-router";

export default function StatusLogin({
  component: Component,
  status,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
               
        return status()?  <Redirect to={"/home"} /> : <Component {...props} />;
      }}
    />
  );

}
