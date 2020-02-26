import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Container } from "reactstrap";
import Skeleton from 'react-loading-skeleton'

library.add(fas);

export default function ModuleHousing(props) {
  const initialUserState = {
    module: {},
    loading: true
  };

  const {
    match: { params }
  } = props;

  const [module, setUser] = useState(initialUserState);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios(`/api/modules/${params.moduleId}`);

      setUser(data);
    };

    getUser();
  }, []);
  return module.loading ? (
    <Container className="mx-auto w-100 d-flex justify-content-center align-items-center">
      <FontAwesomeIcon icon={["fas", "spinner"]} spin size="3x" />
    </Container>
  ) : (
    <div className="container">
      <h1>{module.data._id}</h1>
    </div>
  );
}
