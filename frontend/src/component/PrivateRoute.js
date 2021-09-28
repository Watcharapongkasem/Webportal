import React from "react";
import { Redirect, Route } from "react-router";
import Navbar from "./pages/Navbar";
export default function PrivateRoute({
  component: Component,
  status,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return status() ? (
          <div>
            <Navbar />
            <Component {...props} />
          </div>
        ) : (
          <Redirect to={"/"} />
        );
      }}
    />
  );
}
