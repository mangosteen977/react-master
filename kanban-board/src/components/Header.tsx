import styled from "styled-components";
import newFolder from "../assets/newFolder.svg";
import light0 from "../assets/light_fill0.svg";
import night0 from "../assets/night_fill0.svg";
import light1 from "../assets/light_fill1.svg";
import night1 from "../assets/night_fill1.svg";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ToggleThemeAtom } from "../atom";

const Wraper = styled.div`
  width: 100%;
  max-width: 1400px;
  height: fit-content;
  padding: 60px 20px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.h1`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 10px;
`;
const Imgs = styled.div`
  img {
    width: 40px;
    height: 40px;
    cursor: pointer;
    filter: ${(props) => props.theme.invert};
    &:first-child {
      margin-right: 10px;
    }
  }
`;
function Header() {
  const [hover, setHover] = useState(false);
  const makeNewFolder = () => {
    console.log("11");
  };
  //Toggle Theme
  const [ToggleTheme, setToggleTheme] = useRecoilState(ToggleThemeAtom);
  return (
    <Wraper>
      <Title>Trello board</Title>
      <Imgs>
        <img onClick={makeNewFolder} src={newFolder} />
        <img
          src={
            ToggleTheme ? (hover ? light1 : light0) : hover ? night1 : night0
          }
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => setToggleTheme((prev) => !prev)}
        />
      </Imgs>
    </Wraper>
  );
}
export default Header;
