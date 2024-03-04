import Circle from "./Circle";
import { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    // event: React.FormEvent<HTMLInputElement> : event의 type지정
    // const {value} = event.currentTarget;
    const {
      currentTarget: { value },
    } = event;
    // 예)  event = { x, y }일 때, const { x, y } = event;이면, x는 event.x, y는 event.y
    // event = { currentTarget : { value : "", ...}, ... }
    // const { currentTarget : { value : "", ...}, ... } = event;
    // const value = event.currentTarget.value;
    /*
      ES6 문법
      > const value = event.currentTarget.value
      > const {value} = event.currentTarget
      > const {currentTarget:{value}} = event
    */
    setValue(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Hello", value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="username"
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default App;
