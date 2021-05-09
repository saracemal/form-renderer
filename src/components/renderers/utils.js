export const computeClasses = (prefix, uniqueName, props) => {
  const baseClassName = `form-renderer__${prefix}-${uniqueName}`;

  const className = props.className ? `${props.className} ${baseClassName}` : baseClassName;
  return className;
};
