// theme declarations 테마 정의 파일(styled.d.ts)
// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    // 이곳에 theme의 props 및 type 정의
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}
