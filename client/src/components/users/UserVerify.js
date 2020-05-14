import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Container } from "reactstrap";

library.add(fas);

const UserVerify = props => {
  const initialUser = {
    user: {},
    loading: true,
    error: null
  };

  const token = props.location.search;

  const [user, setUser] = useState(initialUser.user);
  const [loading, setLoading] = useState(initialUser.loading);
  const [error, setError] = useState(initialUser.error);

  useEffect(() => {
    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    axios
      .get(`http://localhost:5000/api/users/userVerify${token}`, config)
      .then(user => {
        setLoading(false);
        setUser(user);
      })
      .catch(err => {
        return setError(err);
      });
  }, []);

  if (loading) {
    return (
      <Container className="mx-auto w-100 d-flex justify-content-center align-items-center">
        <FontAwesomeIcon icon={["fas", "spinner"]} spin size="3x" />
      </Container>
    );
  }
  if (error !== null) {
    return (
      <div className="container">
        <p>{Error}</p>
      </div>
    );
  } else {
    const { updateDoc } = user.data;
    return (
      <div className="container">
        <h1>
          Thank you for verifying your account,{" "}
          {`${updateDoc.firstName} ${updateDoc.lastName}`}!
        </h1>
      </div>
    );
  }
};

export default UserVerify;
