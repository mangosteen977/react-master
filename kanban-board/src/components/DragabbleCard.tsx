import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDraggin: boolean }>`
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;
  // isDraggin인 경우 shadow
  box-shadow: ${(props) =>
    props.isDraggin ? "0px 2px 5px rgba(0,0,0,0.6)" : "none"};
  background-color: ${(props) =>
    props.isDraggin ? "#74b9ff" : props.theme.cardColor};
`;
interface IDragabbleCardProps {
  toDo: string;
  index: number;
}
function DragabbleCard({ toDo, index }: IDragabbleCardProps) {
  // console.log(toDo, "render");
  return (
    <Draggable draggableId={toDo} index={index} key={toDo}>
      {/* Draggable : draggableId, index(number), children(function형태로/ReactElement(X)) required */}
      {(magic, snapshot) => (
        /* DraggableStateSnapshot : 드래거블의 드래그 상태 변화
          export interface DraggableStateSnapshot {
              isDragging: boolean; // 드래거블을 드래그 중인 상태 T/F
              isDropAnimating: boolean;
              isClone: boolean;
              dropAnimation: DropAnimation | null | undefined;
              draggingOver: DroppableId | null | undefined;
              // the id of a draggable that you are combining with
              combineWith: DraggableId | null | undefined;
              // a combine target is being dragged over by
              combineTargetFor: DraggableId | null | undefined;
              // What type of movement is being done: 'FLUID' or 'SNAP'
              mode: MovementMode | null | undefined;
          }
        */
        <Card
          isDraggin={snapshot.isDragging}
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
