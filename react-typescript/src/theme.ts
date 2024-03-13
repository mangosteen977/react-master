// theme 속성 정의
import { DefaultTheme } from "styled-components";
// styled.d.ts(declatations 파일의 props명과 동일하게)
export const themeDark: DefaultTheme = {
  bgColor: "#2f3640",
  listColor: "rgba(0, 0, 0, 0.5)",
  textColor: "#f5f6fa",
  accentColor: "#fbc531",
  backBtn: 0,
};
export const themeLight: DefaultTheme = {
  bgColor: "#fff",
  listColor: "#f5f5f5",
  textColor: "#000000",
  accentColor: "#fbc531",
  backBtn: 0.4,
};
