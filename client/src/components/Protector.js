import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import { getToken } from "./helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Container } from "reactstrap";

library.add(fas);

export const Protector = ({ component: Component, ...rest }) => {
  const initialUserState = {
    user: {},
    loading: true,
    authenticated: false,
    fetchError: null
  };

  const [user, setUser] = useState(initialUserState);

  useEffect(() => {
    const getUser = async () => {
      const jwt = getToken();
      if (!jwt) {
        return false;
      }

      try {
        const { data } = await axios
          .get("/api/users/verify", {
            headers: {
              Authorization: getToken(),
              "Content-Type": "application/json"
            }
          })
          .catch(err => {
            console.error(`axios get error catch: ${err}`);
          });

        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);
  return user.loading ? (
    <Container className="mx-auto w-100 d-flex justify-content-center align-items-center">
      <FontAwesomeIcon icon={["fas", "spinner"]} spin size="3x" />
    </Container>
  ) : (
    <Route
      {...rest}
      render={props => {
        if (user.authenticated === true) {
          //if they are authenticated -> send protected component
          return <Component {...props}></Component>;
        } else if (user.authenticated === false) {
          return (
            <Redirect
              to={{
                pathname: "/modules",
                state: {
                  from: props.location,
                  error: "Not authorized to access..."
                }
              }}
            />
          );
        }
      }}
    ></Route>
  );
};
