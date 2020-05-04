import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Authenticator";
export const Protector = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (Auth.isAuthenticated() !== undefined) {
          return <Component {...props}></Component>;
        } else {
          console.log(Auth.isAuthenticated());
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    ></Route>
  );
};
