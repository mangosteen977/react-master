import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const Overlay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled(motion.div)`
  height: 98vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(155deg, rgb(255, 118, 117), rgb(162, 155, 254));
  border-radius: 3px;
`;

const Board = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;

const Box = styled(motion.div)`
  background: rgba(255, 255, 255, 0.5);
  width: 250px;
  height: 150px;
  margin: 5px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px black;
  color: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    cursor: pointer;
  }
`;

const ToggleBox = styled(motion.div)`
  background: rgba(255, 255, 255, 1);
  width: 250px;
  height: 150px;
  margin: 5px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px black;
  :hover {
    cursor: pointer;
  }
`;

const Button = styled.div`
  border: none;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.3);
  font-weight: 600;
  font-size: 20px;
  padding: 5px 10px;
  margin-top: 13px;
  transition: ease-in-out 0.2s;

  :hover {
    background: black;
    color: whitesmoke;
    cursor: pointer;
  }
`;

const Circle = styled(motion.div)`
  background: #111;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.6);
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const overlayVar = {
  from: { backgroundColor: "rgba(0, 0, 0, 0)" },
  to: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    transition: { duration: 0.3 },
  },
  exit: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    transition: { duration: 0.3 },
  },
};

const Challenge = () => {
  const [id, setId] = React.useState(null);
  const [circleToggle, setCircleToggle] = React.useState("3");

  const overlayHandler = () => {
    setId((prev) => null);
  };

  const circleToggleHandler = () => {
    if (circleToggle === "2") {
      return setCircleToggle((prev) => "3");
    }
    if (circleToggle === "3") {
      return setCircleToggle((prev) => "2");
    }
  };

  const hoverVar = {
    hover: () => ({
      // hover: (i) => ({
      scale: 1.2,
    }),
  };

  return (
    <>
      <Wrapper>
        <AnimatePresence>
          {id ? (
            <Overlay
              onClick={overlayHandler}
              variants={overlayVar}
              initial="from"
              animate="to"
              exit="exit"
            >
              <ToggleBox layoutId={id} style={{ width: 350, height: 200 }} />
            </Overlay>
          ) : null}
        </AnimatePresence>
        <Board>
          <AnimatePresence>
            {["1", "2", "3", "4"].map((i) => (
              <Box
                variants={hoverVar}
                whileHover="hover"
                transition={{ type: "linear", duration: 0.15 }}
                custom={i}
                onClick={() => {
                  setId(i as any);
                }}
                layoutId={i}
                key={i}
              >
                <AnimatePresence>
                  {i === circleToggle && <Circle layoutId="circle" />}
                </AnimatePresence>
              </Box>
            ))}
          </AnimatePresence>
        </Board>

        <Button onClick={circleToggleHandler}>Switch!</Button>
      </Wrapper>
    </>
  );
};

export default Challenge;
