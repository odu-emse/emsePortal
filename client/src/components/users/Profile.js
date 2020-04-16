import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Container } from "reactstrap";

library.add(fas);

const Profile = props => {
  const initialUserState = {
    user: {},
    loading: true
  };

  const {
    match: { params }
  } = props;

  const [user, setUser] = useState(initialUserState);

  const profile = user.user;

  useEffect(() => {
    const getUser = async () => {
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const { data } = await axios(`/api/users/${params.id}`, config);

      setUser(data);
    };

    getUser();
  }, []);
  return user.loading ? (
    <Container className="mx-auto w-100 d-flex justify-content-center align-items-center">
      <FontAwesomeIcon icon={["fas", "spinner"]} spin size="3x" />
    </Container>
  ) : (
    <div className="container">
      {console.log(profile)}
      <h1>Hello, {`${profile.firstName} ${profile.lastName}`}!</h1>
    </div>
  );
};

export default Profile;
