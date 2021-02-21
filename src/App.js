import './App.css';
import FormRenderer from "./components/FormRenderer";
import styled from "styled-components/macro";

// comopnents
import CustomTextField from "./components/form/CustomTextField";
import StepForm from "./components/form-examples/StepForm";

// utils
import { delay } from "./utils";
import { loginFields, moreDetailFields } from "./resources/fields";

const Wrapper = styled.div`
  width: 50%;
  border: 1px solid gray;
  margin-top: 15px;
  padding: 10px;
`;


function App() {
  const onSubmit = ({ data, setSubmittingState }) => {
    console.log("DATA", data);
    delay(() => setSubmittingState(false), 2000);
  };
  const overrides = {
    textarea: {
      OverrideFieldControl: CustomTextField
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <Wrapper>
          <h2>Login Form</h2>
          <FormRenderer id="login" fields={loginFields} onSubmit={onSubmit} />
        </Wrapper>
        <Wrapper>
          <h2>Steps form</h2>
          <StepForm />
        </Wrapper>
        <Wrapper className="mt-4">
          <h2>More Details Form</h2>
          <FormRenderer
            id="details"
            fields={moreDetailFields}
            overrides={overrides}
            onSubmit={onSubmit}
          />
        </Wrapper>
      </header>
    </div>
  );
}

export default App;
