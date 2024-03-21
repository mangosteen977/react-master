import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid red;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;
  background-color: ${(props) => props.theme.cardColor};
`;
interface IDragabbleCardProps {
  toDo: string;
  index: number;
}
function DragabbleCard({ toDo, index }: IDragabbleCardProps) {
  console.log(toDo, "render");
  return (
    <Draggable draggableId={toDo} index={index} key={toDo}>
      {/* Draggable : draggableId, index(number), children(function형태로/ReactElement(X)) required */}
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps} //drag가 가능 할 부분 설정, drag 손잡이.
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DragabbleCard);
// React.memo : props가 변화한 경우에만 리렌더링.
