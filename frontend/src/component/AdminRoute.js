import React from "react";
import { Redirect, Route } from "react-router";
import Navbar from "./pages/Navbar";
export default function AdminRoute({
  component: Component,
  status,
  username,
  ...rest
}) {  
  return (
    <Route
      {...rest}
      render={(props) => {
        return status() && (username()==="admin@world.com")? (
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
