import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';

const darkTheme = {
  textColor:"whitesmoke",
  backgroundColor:"#111"
}
const lightTheme = {
  textColor:"#111",
  backgroundColor:"whitesmoke"
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      {/* 
      ThemeProvider 하위 컴포넌츠에서 theme props에 대해 접근 가능
      하위 컴포넌츠의 styled-components에서 props.theme.popertyName으로 접근
      ex) props.theme.textColor, props.theme.backgroundColor
      */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
