## Description
Implementation of a component that renders a simple forms based
on data-structures. It's opinionated in the way it renders things but
form-fields could be overriden with the `overrides` props.

It utilizes `react-hook-form` in the background to provide a nice form
handling experience.

## Fields
The FormRenderer renders a grid, so the data structure is an Array of Arrays of fields.

```
const fields = [
  // row 1
  [
    { }, // field
  ],
  // row 2
  [
    { }, // field
  ]
];
```

The field themselves have the following shape

```
{
  name: "", // name of your field
  label: "", // label for your field
  component: "", // string name of your component that is used to reference the actualy component that needs to be rendered
  inputProps: {}, // any props you want the input field to get
  rules: {}, // a react-hook-form compatible validation rules
  ...  // anything else you want
}
```

## Renderers
The FormRenderer uses the `renderers` prop to dictate how the form gets rendered. These must be defined before the FormRenderer can be used. The following Renderers are used:

- **RowRenderer:** Handles the way rows get rendered
- **ColRenderer:** Handles rendering of the columns
- **FormControlWrapperRenderer:** Handles the rendering of the container of a form-control
- **FormControlRenderer:** Handles the rendering of the form-control
- **LabelRenderer:** Handles the rendering of the label
- **InputRenderer:** Handles the rendering of the input field
- **ErrorRenderer:** Handles the rendering of the error messages

This gives you the ability to swap out a renderer without having to override all fields for your form.

**Example:** Imagine you've setup up your label and error to render inlined with the form input. But now what you want to do in a new form is render the label, input and error stacking on top of each other.  With the renderers you'd only have to change the LabelRenderer and ErrorRenderer. As a result all form fields will now conform to your renderers new style. If you didn't have the renderers what you would have to do is pass overrides to every single field. While amount of components you'd have to write is the same, 2 of them, without the renderers you'd have to add overrides to every single field.

## Customization
You can customize the way fields render in three different ways. The schema for the overrides data structure is the following:

```
const overrides = {
  <field-name>: {
    OverrideLabel: SomeComponent,
    OverrideInput: SomeComponent
    OverrideFieldControl: SomeComponent,
  }
}
```

The custom components get a prop called `field` which corresponds to the `<field-name>` and it's associated data. In order to utilize react-hook-form methods you can use `useFormContext` in order to get access to all the form-state.

### Label
```
const CustomLabel = ({ field, ...props }) => {
  const { watch } = useFormContext();
  const message = watch(field.name);
  const maxLength = getIn(["rules", "maxLength", "value"], field, 50);
  
  return (
    <div>
      <span {...props}>{field.label}</span>
      <span>{ `${message.length}/${maxLength}`}</span>
    </div>
  );
};
```

Now you can use your custom label as an override for a field:

```
const fields = [[ { name: "firstName", label: "First Name" }]];
const overrides = {
  firstName: { OverrideLabel: CustomLabel }
}
```

### Input
Similar to label but you can render your custom input

### Field Control
See the CustomText component for an example of how this is done

### Props
| Prop.       | Description                                  | Example                                        |
|-------------|----------------------------------------------|------------------------------------------------|
| fields      | the fields that will be rendered.            | [[{ name: "first", ...}]]                      |
| overrides   | field overrides data.                        | {<br/>&nbsp;&nbsp;fieldName: {<br/>&nbsp;&nbsp;&nbsp;&nbsp;OverrideLabel: SomeCompnent,<br/>&nbsp;&nbsp;&nbsp;&nbsp;OverrideInput: SomeComponent,<br/>&nbsp;&nbsp;&nbsp;&nbsp;OverrideFieldControl: SomeComponent<br/>&nbsp;&nbsp;}<br/>}|
| onSubmit    | function that handles submission             |                                                |
| rhfProps    | props for the react-hook-form `useForm` hook | see react-hook-form docs.                      |
| buttonProps | props for the submit button                  | { name: "Handle Submit", className: "text-sm"} |
| formWrapper | a component to wrap the whole form           |                                                |
| formId.     | unique identifier for the form               |                                                |