import Router from "./Router";
import { createGlobalStyle } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
// DarkMode
import { ThemeProvider } from "styled-components";
import { themeDark, themeLight } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "./atoms";

// createGlobalStyle : styled-components의 property,
// createGlobalStyle로 생성 된 컴포넌츠를 렌더링 시, 전역 스코프에 스타일을 올림
const GlobalStyle = createGlobalStyle`
 // CSS 기본값 제거, CSS Reset
 @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing : border-box;
  }
  body {
    font-family: 'Source Sans Pro', sans-serif; //light 300, regular 400
    font-weight: 300;
    background-color : ${(props) => props.theme.bgColor};
    color:${(props) => props.theme.textColor};
    line-height: 1.2;
  }
  a {
    text-decoration : none;
    color : inherit;
  }
`;
function App() {
  // recoil(Atom state), DarkMode/LightMode
  const isDarkMode = useRecoilValue(isDarkModeAtom);
  return (
    <>
      <ThemeProvider theme={isDarkMode ? themeDark : themeLight}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools />
      </ThemeProvider>
    </>
    //<></> : Fragment, 유령 컴포넌츠, 부모없이 여러 컴포넌츠가 위치할 수 있음
  );
}

export default App;
