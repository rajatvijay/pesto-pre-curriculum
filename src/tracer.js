export const INSTRUCTIONS = {
  HIGHLIGHT_SECONDARY: "HIGHLIGHT_SECONDARY",
  HIGHLIGHT_PRIMARY: "HIGHLIGHT_PRIMARY",
  CLEAR_HIGHLIGHT: "CLEAR_HIGHLIGHT"
};
const instructionsQueue = [];
const defaultConfig = {
  delayMs: 1000
};
const SECONDARY_CLASSNAME = `secondaryCurrentVisualizerNode`;
const PRIMARY_CLASSNAME = `primaryCurrentVisualizerNode`;

// utils
const pipe = (...fns) => (input) =>
  fns.reduce((output, fn) => fn(output), input);

const trace = (label) => (value) =>
  pipe(
    () => console.log(label, value),
    () => value
  )();

const instructionsManual = {
  [INSTRUCTIONS.HIGHLIGHT_PRIMARY]: (id) => {
    const domItem = document.querySelector(`#${id}`);
    domItem.classList.add(PRIMARY_CLASSNAME);
  },
  [INSTRUCTIONS.HIGHLIGHT_SECONDARY]: (id) => {
    const domItem = document.querySelector(`#${id}`);
    domItem.classList.add(SECONDARY_CLASSNAME);
  },
  [INSTRUCTIONS.CLEAR_HIGHLIGHT]: (id) => {
    const domItem = document.querySelector(`#${id}`);
    domItem.classList.remove(PRIMARY_CLASSNAME);
    domItem.classList.remove(SECONDARY_CLASSNAME);
  }
};

const cleanup = () => (instructionsQueue.length = 0);
const perform = (instruction) => (id) =>
  pipe(
    () => trace("perform")(instruction),
    () => trace("perform")(instructionsManual[instruction]),
    () =>
      trace("perform")(instructionsManual[INSTRUCTIONS.HIGHLIGHT_SECONDARY]),
    () => trace("perform")(instructionsManual["HIGHLIGHT_SECONDARY"]),
    () => instructionsManual[instruction](id)
  )();

export const init = (userConfig) => {
  const config = { ...defaultConfig, ...userConfig };
  cleanup();
  const timer = setInterval(
    pipe(
      () => trace("instructionsQueue")(JSON.stringify(instructionsQueue)),
      () => instructionsQueue.shift(),
      trace("instruction"),
      ({ instruction, id } = {}) =>
        instruction ? perform(instruction)(id) : null
    ),
    config.delayMs
  );
  const clearRunner = () => timer && clearInterval(timer);
  return {
    push: (instruction, { id }) => instructionsQueue.push({ instruction, id }),
    stop: cleanup,
    clean: pipe(cleanup, clearRunner)
  };
};
