import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./tailwind.generated.css";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { setAxiosInstance } from "./service/getAxiosInstance";
import store from "./store";

setAxiosInstance(store.dispatch);

const node = document.getElementById("root");
if (!node) throw new Error("Root element not found");
const root = createRoot(node);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
