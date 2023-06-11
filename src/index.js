import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "./tailwind.generated.css";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { setAxiosInstance } from "./service/getAxiosInstance";
import store from "./store";

setAxiosInstance(store.dispatch);

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
