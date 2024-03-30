import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 500px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Box = styled(motion.div)`
  width: 400px;
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const Circle = styled(motion.div)`
  background-color: #00a5ff;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function ShareLayout() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);

  return (
    <>
      <Wrapper onClick={toggleClicked}>
        <h1>Share Layout</h1>
        <h2>(1. without layout)</h2>
        <Box
          style={{
            justifyContent: clicked ? "center" : "flex-start",
            alignItems: clicked ? "center" : "flex-start",
          }}
        >
          <Circle />
        </Box>
        <hr />
        <h2>(2. with Layout)</h2>
        <Box>
          {clicked ? (
            <Circle layoutId="circleId" style={{ borderRadius: 0 }} />
          ) : null}
        </Box>
        <Box>
          {clicked ? null : (
            <Circle layoutId="circleId" style={{ borderRadius: 50 }} />
          )}
        </Box>
        {/*
          1.
          움직임이 있는 element에 "layout"이라는 props를 줌으로써
          framer-motion에서 변화에 대해 감지해 animate를 자동 생성.
          2.
          각각의 element에 대해 layoutId props를 통해 두 element의 변화에 애해 animate 자동 생성.
        */}
      </Wrapper>
    </>
  );
}
export default ShareLayout;
