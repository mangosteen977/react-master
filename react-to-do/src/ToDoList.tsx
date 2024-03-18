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
  const { register, watch, handleSubmit, formState } = useForm();
  // register() : onChange, onBlur(입력 커서 focus가 input에 있지 않은 상태)이벤트 반환
  // watch() : form의 입력값 변화를 관찰
  const onValid = (data: any) => {
    console.log(data);
  };
  // handleSubmit() : onSubmit 대체, validation, preventDefault
  console.log(formState.errors);
  // formState : formState.errors에서 required, minLength 등 input의 error 확인
  // password1:{type: 'minLength', message: '', ref: input}
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input {...register("Email", { required: true })} placeholder="Email" />
        {/* HTML코드 required 등 대신 react-hook-form의 RegisterOptions으로 { required: true }등 사용. 
            RegisterOptions이 입력되지 않았을 경우, form입력값이 onValid로 넘어가지 않음,
            입력되지 않은 값의 input에 focus동작.
        */}
        <input
          {...register("FirstName", {
            required: "First name is required",
            minLength: {
              value: 2,
              message: "your first name is way too short",
            },
          })}
          required
          placeholder="FirstName"
        />
        {/* RegisterOptions에 대해 메세지 설정 가능,
        각종 조건에 대한 내용은 Ctrl + required클릭 (validator.d.ts) */}
        <input
          {...register("LastName", { required: true })}
          placeholder="LastName"
        />
        <input
          {...register("UserName", { required: true, minLength: 10 })}
          placeholder="UserName"
        />
        <input
          {...register("password", { required: true, minLength: 5 })}
          placeholder="password"
        />
        <input
          {...register("password1", { required: true, minLength: 10 })}
          placeholder="password1"
        />
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
