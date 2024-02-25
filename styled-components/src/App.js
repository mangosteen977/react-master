import styled from "styled-components";

const Father = styled.div`
 display : flex;
`;

const Input = styled.input.attrs({ required : true, minLength : 5 })`
  background-color : tomato
`;
// 잘 사용하는 방법은 아니지만, style-components에서 attrs.({tag 속성})지정 가능


function App() {
  return (
    <Father as="header">
      {/* as : style-components의 속성은 유지하되, html tag 바꾸기 */}
      <Input />
      <Input />
    </Father>
  );
}

export default App;
