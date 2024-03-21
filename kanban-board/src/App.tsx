import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoStateAtom } from "./atom";

const Wraper = styled.div`
  border: 1px solid red;
  display: flex;
  max-width: 480px;
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
  grid-template-columns: repeat(3, 1fr);
`;
const Board = styled.div`
  border: 1px solid red;
  min-height: 200px;
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
`;
const Card = styled.div`
  border: 1px solid red;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;
  background-color: ${(props) => props.theme.cardColor};
`;

function App() {
  const [toDos, setToDo] = useRecoilState(toDoStateAtom);
  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination) return;
    setToDo((oldToDos) => {
      const toDosCopy = [...oldToDos];
      toDosCopy.splice(source.index, 1);
      toDosCopy.splice(destination.index, 0, draggableId);
      return toDosCopy;
    });

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
          <Droppable droppableId="one">
            {/* Droppable : droppableId, children(function형태로/ReactElement(X)) required */}
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, i) => (
                  <Draggable draggableId={toDo} index={i} key={i}>
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
                ))}
                {magic.placeholder}
                {/* DroppableProvided.placeholder : 드래그 하는 동안 position:fixed*/}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wraper>
    </DragDropContext>
  );
}

export default App;
