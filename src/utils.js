export const generataeRandomArray = (size, max) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
};
