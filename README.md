# Description
Implementation of a component that renders a simple forms based
on data-structures. It's opinionated in the way it renders things but
form-fields could be overriden with the `overrides` props.

It utilizes `react-hook-form` in the background to provide a nice form
handling experience.

# Customization
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
const CustomLabel = ({ field }) => {
  const { watch } = useFormContext();
  const message = watch(field.name);
  const maxLength = getIn(["rules", "maxLength", "value"], field, 50);
  
  return (
    <div>
      <span>{field.label}</span>
	  <span>{ `${message.length}/${maxLength}`}</span>
	</div>
  )
};
```

And you can add it to some input text field as follows

```
const fields = [[ { name: "firstName", label: "First Name"}]];
const overrides = {
  firstName: { OverrideLabel: CustomLabel }
}
```

### Input
Similar to label but you can render your custom input

### Field Control
See the CustomText component for an example of how this is done
