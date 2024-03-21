import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoStateAtom } from "./atom";
import Board from "./components/Board";

const Wraper = styled.div`
  border: 1px solid red;
  display: flex;
  max-width: 680px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;
const Boards = styled.div`
  border: 1px solid red;
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
`;

function App() {
  const [toDos, setToDo] = useRecoilState(toDoStateAtom);
  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      // 동일 보드 내 움직임
      setToDo((oldToDos) => {
        const boardCopy = [...oldToDos[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, draggableId);
        return {
          ...oldToDos,
          [source.droppableId]: boardCopy,
        };
      });
    } else {
      // 서로 다른 보드 내 움직임
      setToDo((oldToDos) => {
        const startBoardCopy = [...oldToDos[source.droppableId]];
        const endBoardCopy = [...oldToDos[destination.droppableId]];
        startBoardCopy.splice(source.index, 1);
        endBoardCopy.splice(destination.index, 0, draggableId);
        return {
          ...oldToDos,
          [source.droppableId]: startBoardCopy,
          [destination.droppableId]: endBoardCopy,
        };
      });
    }

    /* onDragEnd : drag => drop 후 동작에 대한 함수, result의 type은 DropResult
      onDragEnd의 모든 전달 인자 = {
        "draggableId": "a", // drag한 Draggable의 ID
        "type": "DEFAULT",
        "source": { //출발지
            "index": 0, // Draggable의 본래 위치
            "droppableId": "one" // Draggable이 있던 Droppable의 ID
        },
        "reason": "DROP",
        "mode": "FLUID",
        "destination": { //도착지
            "droppableId": "one", // Draggable이 drop된 Droppable의 ID
            "index": 1 // Draggable의 drop된 위치
        },
        "combine": null
      }
    */
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* DragDropContext :  onDragEnd()와 하위 children required*/}
      <Wraper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wraper>
    </DragDropContext>
  );
}

export default App;
