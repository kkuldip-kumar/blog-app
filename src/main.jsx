import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

import "./index.css";
import { AppRoutes } from "./routing/AppRoutes.jsx";
import store from "./store/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
    ,
  </React.StrictMode>
);
