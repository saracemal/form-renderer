import React, { useState } from "react";
import styled from "styled-components/macro";

// components
import FormRenderer from "../FormRenderer";
import { delay } from "../../utils";

const required = { required: "Required" };
const childrenRegistration = [
  [
    {
      name: "firstName",
      label: "First Name",
      component: "input",
      rules: required,
    },
    {
      name: "lastName",
      label: "Last Name",
      component: "input",
      rules: required,
    },
  ],
  [
    {
      name: "Age",
      label: "Age",
      component: "input",
      inputProps: { type: "number" },
      rules: required,
    },
    {
      name: "grade",
      label: "Grade",
      component: "select",
      inputProps: {
        placeholder: "select grade",
        options: [
          { label: "1", value: 1 },
          { label: "2", value: 2 },
          { label: "3", value: 3 },
          { label: "4", value: 4 },
          { label: "5", value: 5 },
          { label: "6", value: 6 },
        ]
      },
      rules: required,
    },
  ]
];
const healthCheck = [
  [
    {
      name: "question1",
      label: "Are you sick?",
      inputProps: { placeholder: "Answer" },
      component: "input",
      rules: required,
    }
  ],
  [
    {
      name: "question3",
      label: "Have you been to the doctor lately?",
      inputProps: { placeholder: "Optional" },
      component: "input",
    }
  ],
  [
    {
      name: "question4",
      label: "Why are you applying?",
      inputProps: { placeholder: "Answer" },
      component: "input",
      rules: required,
    }
  ]
];
const finalize = [
  [
    {
      name: "anyQuestions",
      label: "Any questions? write them here.",
      inputProps: { placeholder: "write questions" },
      component: "input"
    }
  ]
];

const steps = [
  childrenRegistration,
  healthCheck,
  finalize,
];

const getNextStepFields = (currentStep, steps) => {
  const step = steps[currentStep];
  return step;
}

const StepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const fields = getNextStepFields(currentStep, steps);
  console.log("re-rendering");
  const onSubmit = ({ data, setSubmittingState }) => {
    console.log('step form data', data);

    if (currentStep === 0) {
      // submit logic for step 0
      setSubmittingState(false);

      // NOTE: If all logic here goes well then setCurrentStep to next one
      setCurrentStep((step) => step + 1);
    } else if (currentStep === 1) {
      // submit logic for step 2
      setSubmittingState(false);

      // NOTE: If all logic here goes well then setCurrentStep to next one
      setCurrentStep((step) => step + 1);
    } else if (currentStep === 2) {
      // submit logic for step 3
      delay(() => setSubmittingState(false), 2000);
    }
  };

  return (
    <div>
      <p>Current Step {currentStep + 1}</p>
      <FormRenderer
        id="form-steps"
        fields={fields}
        onSubmit={onSubmit}
        buttonProps={{
          name: currentStep === 2 ? "submit" : "continue"
        }}
      />
    </div>
  );
};
export default StepForm;
