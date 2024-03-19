import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoStateAtom } from "../atom";

interface IForm {
  //useForm
  toDo: string;
}
function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoStateAtom); // atom 쓰기(SetterOrUpdater)

  const handleValid = ({ toDo }: IForm) => {
    //data.toDo
    setToDos((oldToDos) => [
      { id: Date.now(), text: toDo, category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        type="text"
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}
export default CreateToDo;
