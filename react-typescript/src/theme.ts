// theme 속성 정의
import { DefaultTheme } from "styled-components";
// styled.d.ts(declatations 파일의 props명과 동일하게)
export const lightTheme: DefaultTheme = {
  textColor: "black",
  bgColor: "white",
  btnColor: "tomamto",
};
export const darkTheme: DefaultTheme = {
  textColor: "white",
  bgColor: "black",
  btnColor: "teal",
};
