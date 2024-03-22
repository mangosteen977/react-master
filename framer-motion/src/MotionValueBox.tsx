import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

const Wrapper = styled(motion.div)`
  height: 300px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
const Box = styled(motion.div)`
  /* styled(motion.elements) : styled-components에 motion.elements를 적용 */
  width: 100px;
  height: 100px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {};

function MotionValueBox() {
  const x = useMotionValue(0);
  // MotionValue : 특정 움직임의 값을 추적(x, y 등), React 리렌더링을 트리거하지는 않음
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  // useTransform(MotionValue,input[],outPut[])
  // input은 MotionValue의 범위, output[] 범위로 변환.
  useMotionValueEvent(rotateZ, "change", (el) => console.log(el));
  // useMotionValueEvent : 값이 바뀌면 동작.(useEffect+onChange 대신)
  // https://www.framer.com/motion/use-motion-value-event/
  const gradient = useTransform(
    x,
    [-800, 0, 800],
    [
      "linear-gradient(135deg,rgb(0, 119, 238),rgb(238, 0, 127))",
      "linear-gradient(135deg,rgb(238,0,153),rgb(221,0,238))",
      "linear-gradient(135deg,rgb(222, 238, 0),rgb(48, 155, 29))",
    ]
  );
  return (
    <Wrapper style={{ background: gradient }}>
      <h1>Motion Value (drag)</h1>
      <button onClick={() => x.set(200)}>Click Me</button>
      {/* x.set() : x의 값 설정 */}
      <Box style={{ x, rotateZ }} drag="x" dragSnapToOrigin />
      {/* x === x: x (ShortCut)
          x, rotateZ 로만 써도 됨 */}
    </Wrapper>
  );
}
export default MotionValueBox;
