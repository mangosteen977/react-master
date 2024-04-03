import styled from "styled-components";
import newFolder from "../assets/newFolder.svg";
import light0 from "../assets/light_fill0.svg";
import night0 from "../assets/night_fill0.svg";
import light1 from "../assets/light_fill1.svg";
import night1 from "../assets/night_fill1.svg";
import { useState } from "react";

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
  border: 1px solid red;
  img {
    width: 40px;
    height: 40px;
    cursor: pointer;
    &:first-child {
      margin-right: 10px;
    }
  }
`;
function Header() {
  const [hover, setHover] = useState(false);
  return (
    <Wraper>
      <Title>Trello board</Title>
      <Imgs>
        <img src={newFolder} />
        <img
          src={hover ? light1 : light0}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      </Imgs>
    </Wraper>
  );
}
export default Header;
