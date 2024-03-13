import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
// 상태관리 라이브러리(Atom은 상태(state)의 일부를 나타냄), dark/light 모드 구현

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </RecoilRoot>
);

// npm i react-router-dom@5.3.0 react-query
// npm i --save-dev @types/react-router-dom
// TS가 router를 인식할 수 있도록 @types 추가

// react query
// npm i react-query
// const queryClient = new QueryClient();
// <QueryClientProvider client={queryClient}> 태그로 App을 감싸서 App에서 접근이 가능하도록.
