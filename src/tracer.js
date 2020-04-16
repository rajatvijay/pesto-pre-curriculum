export const HIGHLIGHT_TYPES = {
  PRIMARY: {
    name: "PRIMARY",
    color: "red",
    className: "primary"
  },
  SECONDARY: {
    name: "SECONDARY",
    color: "yellow",
    className: "secondary"
  }
};

const state = {
  primaryItem: null,
  secondaryItem: null
};

let DELAY_TIME = 1000; // 2 secs
const SECONDARY_CLASSNAME = `secondaryCurrentVisualizerNode`;
const PRIMARY_CLASSNAME = `primaryCurrentVisualizerNode`;

export const initTracer = (delay) => {
  DELAY_TIME = delay;
  clean();
};

const clean = () => {
  if (state.secondaryItem) {
    document
      .querySelector(`#${state.secondaryItem}`)
      .classList.remove(SECONDARY_CLASSNAME);
    state.secondaryItem = null;
  }

  if (state.primaryItem) {
    document
      .querySelector(`#${state.primaryItem}`)
      .classList.remove(PRIMARY_CLASSNAME);
    state.primaryItem = null;
  }
};

export const highlightSecondaryItem = (id) => {
  // Remove old item, since only item can be highglighted at a time
  if (state.secondaryItem) {
    const oldItem = document.querySelector(`#${state.secondaryItem}`);
    oldItem.classList.remove(SECONDARY_CLASSNAME);
  }

  // Update the state
  state.secondaryItem = id;

  // Highlight the new item
  const domItem = document.querySelector(`#${id}`);
  domItem.classList.add(SECONDARY_CLASSNAME);
};

export const highlightPrimaryItem = (id) => {
  state.primaryItem = id;
  const domItem = document.querySelector(`#${id}`);
  // Just to be safe
  domItem.classList.remove(SECONDARY_CLASSNAME);
  domItem.classList.add(PRIMARY_CLASSNAME);
};

export const delay = () => {
  return new Promise((resolve) => setTimeout(resolve, DELAY_TIME));
};
