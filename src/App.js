import './App.css';
import FormRenderer from "./components/FormRenderer";
import styled from "styled-components/macro";

// comopnents
import CustomTextField from "./components/form/CustomTextField";

// utils
import { delay } from "./utils";
import { loginFields, moreDetailFields } from "./resources/fields";

const Wrapper = styled.div`
  width: 50%;
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
