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
interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  password1: string;
}
function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      // 프로퍼티 기본 값 설정
      email: "@naver.com",
    },
  });
  // register() : onChange, onBlur(입력 커서 focus가 input에 있지 않은 상태)이벤트 반환
  // watch() : form의 입력값 변화를 관찰
  const onValid = (data: any) => {
    console.log(data);
  };
  // handleSubmit() : onSubmit 대체, validation, preventDefault
  // handleSubmit은 onValid()함수 필요
  // handleSubmit(onValid(required), oninValid(optional))
  console.log(errors);
  // formState : formState.errors에서 required, minLength 등 input의 error 확인
  // password1:{type: 'minLength', message: '', ref: input}
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              // 정규식으로 패턴 확인도 가능
              // ^ :문장의 시작
              // [] : 문자셋 안의 아무문자
              // + : 하나 또는 많이
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        {/* HTML코드 required 등 대신 react-hook-form의 RegisterOptions으로 { required: true }등 사용. 
            RegisterOptions이 입력되지 않았을 경우, form입력값이 onValid로 넘어가지 않음,
            입력되지 않은 값의 input에 focus동작.
            
        */}
        <span style={{ color: "red" }}>{errors.email?.message}</span>
        <input
          {...register("firstName", {
            required: "First name is required",
            minLength: {
              value: 2,
              message: "your first name is way too short",
            },
          })}
          placeholder="firstName"
        />
        {/* RegisterOptions에 대해 메세지 설정 가능,
        각종 조건에 대한 내용은 Ctrl + required클릭 (validator.d.ts) */}
        <span style={{ color: "red" }}>{errors.firstName?.message}</span>
        <input
          {...register("lastName", { required: "Write here" })}
          placeholder="lastName"
        />
        <span style={{ color: "red" }}>{errors.lastName?.message}</span>
        <input
          {...register("userName", {
            required: "Write here",
            minLength: {
              value: 2,
              message: "your first name is way too short",
            },
          })}
          placeholder="userName"
        />
        <span style={{ color: "red" }}>{errors.userName?.message}</span>
        <input
          {...register("password", { required: "Write here" })}
          placeholder="password"
        />
        <span style={{ color: "red" }}>{errors.password?.message}</span>
        <input
          {...register("password1", {
            required: "Write here",
            minLength: {
              value: 2,
              message: "your first name is way too short",
            },
          })}
          placeholder="password1"
        />
        <span style={{ color: "red" }}>{errors.password1?.message}</span>
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
