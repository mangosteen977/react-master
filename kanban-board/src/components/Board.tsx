import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

const BoardWrapper = styled.div`
  border: 1px solid pink;
  min-height: 200px;
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
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
function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Droppable droppableId={boardId}>
      {/* Droppable : droppableId, children(function형태로/ReactElement(X)) required */}
      {(magic) => (
        <BoardWrapper ref={magic.innerRef} {...magic.droppableProps}>
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
