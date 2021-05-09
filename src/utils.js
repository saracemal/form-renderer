export const getIn = (path, map, defaultValue = undefined) => {
  return path.reduce((acc, step) => {
    if ((acc !== undefined && acc[step] === undefined) || acc === undefined) return defaultValue;
    return acc[step];
  }, map);
}

export const delay = (f, time) => setTimeout(() => f(), time);
