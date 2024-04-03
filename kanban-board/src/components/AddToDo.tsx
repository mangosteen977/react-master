import styled from "styled-components";
import { useForm } from "react-hook-form";
import { IToDo, toDoStateAtom } from "../atom";
import { useSetRecoilState } from "recoil";

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 0px 0px 5px 5px;
    text-indent: 20px;
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
  }
`;
interface IForm {
  toDo: string;
}
interface IBoardProps {
  boardId: string;
}

function AddToDo({ boardId }: IBoardProps) {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoStateAtom);
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", { required: true })}
        type="text"
        placeholder={`add a card on ${boardId}...`}
      />
    </Form>
  );
}
export default AddToDo;
