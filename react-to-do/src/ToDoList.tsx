import { useState } from "react";
import { useForm } from "react-hook-form";

/* 기존의 useState를 이용해 form+input 사용
function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
    setToDoError("");
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDo.length < 10) {
      return setToDoError("To do should be longer");
    }
    console.log("submit");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={toDo}
          onChange={onChange}
          type="text"
          placeholder="Write a to do"
        />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
}
*/
function ToDoList() {
  const { register, watch } = useForm();
  // register() : onChange, onBlur(입력 커서 focus가 input에 있지 않은 상태)이벤트 반환
  // watch() : form의 입력값 변화를 관찰
  console.log(register("toDo"));
  return (
    <div>
      <form>
        <input {...register("Email")} placeholder="Email" />
        <input {...register("FirstName")} placeholder="FirstName" />
        <input {...register("LastName")} placeholder="LastName" />
        <input {...register("UserName")} placeholder="UserName" />
        <input {...register("password")} placeholder="password" />
        <input {...register("password1")} placeholder="password1" />
        {/* {...register("toDo")} 
            register()가 반환하는 객체들을 input의 props로 펼쳐서 줌.
            "Email"는 name
        */}
        <button>Add</button>
      </form>
    </div>
  );
}
export default ToDoList;
