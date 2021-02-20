import './App.css';
import FormRenderer from "./components/FormRenderer";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  width: 50%;
`;

const loginFields = [
  [
    {
      name: "name",
      label: "Name",
      component: "input",
      rules: { required: "Required", maxLength: { value: 20, message: "too long" } }
    }
  ],
  [
    {
      name: "email",
      label: "Email",
      component: "input",
      inputProps: { type: "email" },
      rules: { required: "Required" },
    }
  ],
  [
    {
      name: "password",
      label: "Password",
      component: "input",
      inputProps: { type: "password" },
      rules: { required: "Required" },
    }
  ]
];

function App() {
  const onSubmit = ({ data }) => {
    console.log("DATA", data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Wrapper>
          <FormRenderer fields={loginFields} onSubmit={onSubmit} />
        </Wrapper>
      </header>
    </div>
  );
}

export default App;
