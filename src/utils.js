export const generataeRandomArray = (size, max) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
};

export const generateElementId = (value, index) => {
  return `element-${index}${value}`;
};
