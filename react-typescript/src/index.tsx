import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { theme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

// npm i react-router-dom@5.3.0 react-query
// npm i --save-dev @types/react-router-dom
// TS가 router를 인식할 수 있도록 @types 추가
