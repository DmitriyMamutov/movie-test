import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ReduxProvider } from "./redux/provider";
import { BrowserRouter } from "react-router-dom";
import "./static/styles/main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>,
);
