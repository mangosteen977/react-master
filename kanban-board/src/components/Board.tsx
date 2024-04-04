import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
// import { useRef } from "react";
import { IToDo, toDoStateAtom } from "../atom";
import AddToDo from "./AddToDo";
import close from "../assets/close.svg";
import { useRecoilState, useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  width: 100%;
  max-width: 380px;
  padding-top: 20px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const BoardWrapper = styled.div<IBoardWrapperProps>`
  // isDraggingOver : 드래거블이 드롭어블 위에 오버될 경우 bg변경
  background-color: ${(props) =>
    props.$isDraggingOver
      ? "#abd5fe"
      : props.$draggingFromThisWith
      ? "#b2bec3"
      : "transparent"};
  transition: background-color 0.3s ease-in-out;

  flex-grow: 1;
  padding: 20px;
  max-height: 500px;
  height: fit-content;
  overflow-y: auto;
`;
const BoardTitle = styled.div`
  /* border: 1px solid red; */
  padding: 0 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  img {
    width: 25px;
    height: 25px;
    filter: ${(props) => props.theme.invert};
    cursor: pointer;
  }
`;
const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}
interface IBoardWrapperProps {
  $isDraggingOver: boolean;
  $draggingFromThisWith: boolean;
}
function Board({ toDos, boardId }: IBoardProps) {
  // const inputRef = useRef<HTMLInputElement>(null);
  // // useRef : useRef hook, HTML method접근
  // const onClick = () => {
  //   // 클릭 시 focus <=> 5초 후 blur
  //   inputRef.current?.focus();
  //   // .current : 프로퍼티로 전달된 인자(initialValue), 변경 가능한 값이 담김
  //   setTimeout(() => {
  //     inputRef.current?.blur();
  //   }, 5000);
  // };
  const setAllToDos = useSetRecoilState(toDoStateAtom);
  const deleteFolder = () => {
    const message =
      "Deleting a folder will delete all contents. Are you sure you want to delete the folder?";
    if (window.confirm(message)) {
      setAllToDos((allBoards) => {
        let edited = { ...allBoards };
        delete edited[boardId];
        return edited;
      });
    }
  };
  return (
    <Wrapper>
      <BoardTitle>
        <Title>{boardId}</Title>
        <img src={close} onClick={deleteFolder} />
      </BoardTitle>

      {/* <input ref={inputRef} type="text" placeholder="grab me" />
      <button onClick={onClick}>Click me</button> */}
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
            $isDraggingOver={snapshot.isDraggingOver}
            $draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            // reference :react JS components를 통해 HTML요소를 가져와 사용 (event등..)
            {...magic.droppableProps}
          >
            {toDos?.map((toDo, i) => (
              <DragabbleCard
                key={toDo.id}
                index={i}
                boardId={boardId}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
            {/* DroppableProvided.placeholder : 드래그 하는 동안 position:fixed*/}
          </BoardWrapper>
        )}
      </Droppable>
      <AddToDo boardId={boardId} />
    </Wrapper>
  );
}
export default Board;
