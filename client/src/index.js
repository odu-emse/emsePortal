import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

RegExp.escape = function(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
};
