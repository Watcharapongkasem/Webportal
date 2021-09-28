import React from "react";
import { Redirect, Route } from "react-router";
export default function PrivateRoute({
  component: Component,
  status,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {          
        return status()? <Component {...props} /> : <Redirect to={"/"} />;
      }}
    />
  );

}
