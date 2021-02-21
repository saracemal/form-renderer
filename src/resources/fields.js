export const loginFields = [
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

export const moreDetailFields = [
  [
    {
      name: "address",
      label: "Address",
      component: "input",
      rules: { required: "Required", maxLength: { value: 40, message: "too long" } }
    },
  ],
  [
    {
      name: "city",
      label: "City",
      component: "input",
      rules: { required: "Required", maxLength: { value: 40, message: "too long" } }
    },
    {
      name: "state",
      label: "State",
      component: "select",
      inputProps: {
        options: [
          { label: "California", value: "CA" },
          { label: "Arizona", value: "AZ" },
          { label: "Nevada", value: "NV" },
          { label: "Texas", value: "TX" },
          { label: "Illinois", value: "IL" },
        ],
        clearable: true
      },
      rules: { required: "Required", maxLength: { value: 40, message: "too long" } }
    }
  ],
  [
    {
      name: "phone",
      label: "Phone",
      component: "phone",
      inputProps: { type: "tel" },
      rules: { required: "Required" },
    }
  ],
  [
    {
      // provide the field name in order for the override to take
      // effect
      name: "textarea",
    }
  ]
];
