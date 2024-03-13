import styled from "styled-components";
import sunny from "../assets/light_fill0.svg";
import night from "../assets/night_fill0.svg";
import sunny1 from "../assets/light_fill1.svg";
import night1 from "../assets/night_fill1.svg";
import { isDarkModeAtom } from "../atoms";
import { useRecoilState } from "recoil";
import { useState } from "react";

// common
const Foot = styled.footer`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ThemeBtn = styled.div`
  background-color: transparent;
  display: block;
  width: 35px;
  height: 35px;
  cursor: pointer;
  img {
    width: 100%;
    object-fit: cover;
  }
`;

function Footer() {
  const [hover, setHover] = useState(false);
  const [isDarkMode, setDarkMode] = useRecoilState(isDarkModeAtom);
  const toggleMode = () => {
    setDarkMode((currentMode) => !currentMode);
  };
  return (
    <Foot>
      <ThemeBtn onClick={toggleMode}>
        {isDarkMode ? (
          <img
            src={hover ? sunny1 : sunny}
            alt="light Mode"
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
          />
        ) : (
          <img
            src={hover ? night1 : night}
            alt="night Mode"
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
          />
        )}
      </ThemeBtn>
    </Foot>
  );
}

export default Footer;
