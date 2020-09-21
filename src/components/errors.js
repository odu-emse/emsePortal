//TODO: [ALMP-55] flash error displaying
import React from "react";

const Errors = () => {
  return (
    <div>
      {errors ? <p>{errors.forEach(element => {
          element
      })}</p> : null}
    </div>
  );
};

export default Errors;