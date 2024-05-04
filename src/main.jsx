import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

import "./index.css";
import { AppRoutes } from "./routing/AppRoutes.jsx";
import store from "./store/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

import { PersistGate } from "redux-persist/integration/react";
import { Loader } from "./components/Loader";
let persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loader />}>
        <AppRoutes />
      </PersistGate>
    </Provider>
    ,
  </React.StrictMode>
);
