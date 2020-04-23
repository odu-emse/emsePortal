import axios from "axios";

const fetchModuleData = async () => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "x-auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNWZkNjA0NmY3YjYzMzAwZGI2MjRmMiIsImlhdCI6MTU4MzMzOTAxMywiZXhwIjoxNTgzMzQyNjEzfQ.GJSSgA61fxC1kYPcCovAaZFqHzlyxOO9DcNmRlWX1qo"
    }
  };
  console.log("Fetching Module Data...");
  return await axios
    .get("http://localhost:5000/api/modules", config)
    .then(res => res.data)
    .catch(err => console.log(err));
};

const wrapPromise = promise => {
  let status = "pending";
  let result;
  let suspender = promise.then(
    res => {
      status = "success";
      result = res;
    },
    err => {
      status = "error";
      result = err;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
};

export const fetchData = () => {
  const modulePromise = fetchModuleData();
  return {
    module: wrapPromise(modulePromise)
  };
};
