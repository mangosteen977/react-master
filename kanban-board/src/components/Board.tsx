import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

const BoardWrapper = styled.div<IBoardWrapperProps>`
  border: 2px solid yellowgreen;
  min-height: 200px;
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  // isDraggingOver : 드래거블이 드롭어블 위에 오버될 경우 bg변경
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#abd5fe"
      : props.draggingFromThisWith
      ? "#b2bec3"
      : props.theme.boardColor};
  transition: background-color 0.3s ease-in-out;
`;
const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}
interface IBoardWrapperProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}
function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Droppable droppableId={boardId}>
      {/* Droppable : droppableId, children(function형태로/ReactElement(X)) required */}
      {(magic, snapshot) => (
        /* DroppableStateSnapshot : 드롭어블의 상태 변화
          export interface DroppableStateSnapshot {
              isDraggingOver: boolean;
              // 드래거블이 드롭어블 위에 오버될 경우 T/F
              draggingOverWith: DraggableId | null | undefined;
              draggingFromThisWith: DraggableId | null | undefined;
              // 드래거블이 떠난 드롭어블
              isUsingPlaceholder: boolean;
          }
        */
        <BoardWrapper
          isDraggingOver={snapshot.isDraggingOver}
          draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
          ref={magic.innerRef}
          {...magic.droppableProps}
        >
          <Title>{boardId}</Title>
          {toDos.map((toDo, i) => (
            <DragabbleCard key={toDo} index={i} toDo={toDo} />
          ))}
          {magic.placeholder}
          {/* DroppableProvided.placeholder : 드래그 하는 동안 position:fixed*/}
        </BoardWrapper>
      )}
    </Droppable>
  );
}
export default Board;
