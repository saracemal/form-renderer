import './App.css';
import FormRenderer from "./components/FormRenderer";
import styled from "styled-components/macro";

// comopnents
import StepForm from "./components/form-examples/StepForm";

// utils
import { delay } from "./utils";
import { loginFields } from "./resources/fields";
import { renderers } from "./components/renderers/bootstrap";

const Wrapper = styled.div`
  width: 50%;
  border: 1px solid gray;
  margin-top: 15px;
  padding: 10px;
`;


function App() {
  const onSubmit = ({ data, setSubmittingState }) => {
    alert(JSON.stringify(data));
    delay(() => setSubmittingState(false), 2000);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Wrapper>
          <h2>Login Form</h2>
          <FormRenderer renderers={renderers} id="login" fields={loginFields} onSubmit={onSubmit} />
        </Wrapper>
        <Wrapper>
          <h2>Steps form</h2>
          <StepForm />
        </Wrapper>

      </header>
    </div>
  );
}

export default App;
