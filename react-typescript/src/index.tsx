import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </QueryClientProvider>
);

// npm i react-router-dom@5.3.0 react-query
// npm i --save-dev @types/react-router-dom
// TS가 router를 인식할 수 있도록 @types 추가

// react query
// npm i react-query
// const queryClient = new QueryClient();
// <QueryClientProvider client={queryClient}> 태그로 App을 감싸서 App에서 접근이 가능하도록.
