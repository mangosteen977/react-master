import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryStateAtom, toDoStateAtom } from "../atom";
import styled from "styled-components";

const Form = styled.form`
  padding: 20px 0;
  margin-bottom: 30px;
`;
const ToDoInput = styled.input<{ $isError: boolean }>`
  border: none;
  width: 300px;
  height: 30px;
  text-align: center;
  background-color: #fbf8db;
  &::placeholder {
    color: ${(props) => (props.$isError ? "red" : "#5d5d5d")};
  }
`;
const Button = styled.button`
  border: none;
  background-color: #ff5100;
  width: 70px;
  height: 30px;
  border-radius: 5px;
  color: #fff;
  font-weight: 600;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    background-color: #ea4c03;
  }
`;
interface IForm {
  //useForm
  toDo: string;
}
function CreateToDo() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoStateAtom); // atom 쓰기(SetterOrUpdater)
  const category = useRecoilValue(categoryStateAtom); // 현재 선택 된 category

  const handleValid = ({ toDo }: IForm) => {
    //data.toDo
    setToDos((oldToDos) => [
      { id: Date.now(), text: toDo, category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  console.log(errors.toDo?.message);
  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <ToDoInput
        $isError={errors.toDo ? true : false}
        {...register("toDo", {
          required: "Please write a To Do Here",
        })}
        type="text"
        placeholder={errors.toDo ? errors.toDo.message : "Write a to do here"}
      />
      <Button>Add</Button>
    </Form>
  );
}
export default CreateToDo;
