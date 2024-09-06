import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import ModelProvider from "./models";
import App from "./App";

const RootComponent = () => {
  return (
    <React.StrictMode>
      <ModelProvider>
        <App />
      </ModelProvider>
    </React.StrictMode>
  );
};


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RootComponent />);

reportWebVitals();
