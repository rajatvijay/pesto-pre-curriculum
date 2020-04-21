// TODO: Support an instruction to support clear and highglight next
export const INSTRUCTIONS = {
  HIGHLIGHT_PRIMARY: "HIGHLIGHT_PRIMARY",
  CLEAR_PRIMARY: "CLEAR_PRIMARY",
  HIGHLIGHT_SECONDARY: "HIGHLIGHT_SECONDARY",
  CLEAR_SECONDARY: "CLEAR_SECONDARY",
  CLEAR_HIGHLIGHT: "CLEAR_HIGHLIGHT",
  SWAP_NODES: "SWAP_NODES",
  CLEAR_AND_HIHGLIGHT_SECONDARY: "CLEAR_AND_HIHGLIGHT_SECONDARY"
};
const instructionsQueue = [];
const defaultConfig = {
  delayMs: 1000
};
const SECONDARY_CLASSNAME = `secondaryCurrentVisualizerNode`;
const PRIMARY_CLASSNAME = `primaryCurrentVisualizerNode`;

const trace = (label) => (value) => {
  window.debug && console.log(label, value);
  return value;
};
const getDOMNode = (id) => document.querySelector(`#${id}`);

const instructionsManual = {
  [INSTRUCTIONS.HIGHLIGHT_PRIMARY]: (elementId) => {
    const node = getDOMNode(elementId);
    node.classList.add(PRIMARY_CLASSNAME);
  },
  [INSTRUCTIONS.CLEAR_PRIMARY]: (elementId) => {
    const node = getDOMNode(elementId);
    node.classList.remove(PRIMARY_CLASSNAME);
  },
  [INSTRUCTIONS.HIGHLIGHT_SECONDARY]: (elementId) => {
    const node = getDOMNode(elementId);
    node.classList.add(SECONDARY_CLASSNAME);
  },
  [INSTRUCTIONS.CLEAR_SECONDARY]: (elementId) => {
    const node = getDOMNode(elementId);
    node.classList.remove(SECONDARY_CLASSNAME);
  },
  [INSTRUCTIONS.CLEAR_HIGHLIGHT]: (elementId) => {
    const node = getDOMNode(elementId);
    node.classList.remove(PRIMARY_CLASSNAME);
    node.classList.remove(SECONDARY_CLASSNAME);
  },
  [INSTRUCTIONS.SWAP_NODES]: (element1Id, element2Id) => {
    const node1 = getDOMNode(element1Id);
    const node2 = getDOMNode(element2Id);
    const clonedNode1 = node1.cloneNode(true);
    const clonedNode2 = node2.cloneNode(true);

    node2.parentNode.replaceChild(clonedNode1, node2);
    node1.parentNode.replaceChild(clonedNode2, node1);
  },
  [INSTRUCTIONS.CLEAR_AND_HIHGLIGHT_SECONDARY]: (clearId, highlightId) => {
    instructionsManual[INSTRUCTIONS.CLEAR_SECONDARY](clearId);
    instructionsManual[INSTRUCTIONS.HIGHLIGHT_SECONDARY](highlightId);
  }
};

const perform = (instructionName, ...elements) => {
  trace("PERFORM:")(instructionName);
  instructionsManual[instructionName](...elements);
};
const clearQueue = () => (instructionsQueue.length = 0);

export const init = (userConfig) => {
  clearQueue();
  const config = { ...defaultConfig, ...userConfig };
  const timer = setInterval(() => {
    const instruction = instructionsQueue.shift();
    if (instruction) {
      perform(instruction.instructionName, ...instruction.elements);
    }
    if (!instructionsQueue.length) {
      timer && clearInterval(timer);
    }
  }, config.delayMs);
  return {
    push: (instructionName, ...elements) =>
      instructionsQueue.push({ instructionName, elements }),
    logQueue: () => trace("QUEUE")(JSON.stringify(instructionsQueue))
  };
};
