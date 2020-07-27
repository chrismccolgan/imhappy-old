import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Imhappy from "./components/Imhappy";

ReactDOM.render(
  <Router>
    <Imhappy />
  </Router>,
  document.getElementById('root')
);