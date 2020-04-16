import "./styles.css";
import { generataeRandomArray } from "./utils";

const MAX_NUMBER = 200;

// Adds listener on algo input
// to update the search input box required validation accordingly
const makeSearchInputConditionallyRequired = () => {
  const algoSelector = document.querySelector("#algoSelection");
  const searchValueInput = document.querySelector("#search-number");
  algoSelector.addEventListener("change", (e) => {
    console.log("init", e.target.value, e.target.values);
    if (["LINEAR_SEARCH", "BINARY_SEARCH"].includes(e.target.value)) {
      searchValueInput.setAttribute("required", true);
    } else {
      searchValueInput.removeAttribute("required");
    }
  });
};

// Adds listener to data-size input
// to create the visualizer
const setupDataSizeListener = () => {
  const dataSizeInput = document.querySelector("#data-size");
  dataSizeInput.addEventListener("change", (e) => {
    console.log("data size  change", e.target.value);
    updateVisualizer(e.target.value);
  });
};

const setupWindowResizerListener = () => {
  window.addEventListener("resize", (e) => {
    const dataSizeInput = document.querySelector("#data-size");
    updateVisualizer(dataSizeInput.value);
  });
};

// Generates & update in the DOM
// the new visualiser based on the input value
const updateVisualizer = (value) => {
  const randomArray = generataeRandomArray(value, MAX_NUMBER);
  createVisualizer(randomArray);
};

const calculateWidth = (count) =>
  (window.innerWidth - 20 - (2 * (count - 1) + 4)) / count;

const calculateHeight = (value, max) => {
  const percent70 = window.innerHeight * 0.7;
  return (value * percent70) / max;
};

// Creates visualiser bars based on the input array
// And update it in the dom
const createVisualizer = (values) => {
  const container = document.querySelector("#visualiser");
  const maxValue = Math.max(...values);
  const arrayNodes = values.map((value, index) => {
    const node = document.createElement("div");
    node.setAttribute("data-value", value);
    node.style.width = `${calculateWidth(values.length)}px`;
    node.style.height = `${calculateHeight(value, maxValue)}px`;
    node.setAttribute("class", "visualizerNode");
    node.setAttribute("title", value);

    const textNode = document.createElement("span");
    textNode.setAttribute("class", "visualizerTextNode");
    textNode.innerText = value;
    node.append(textNode);
    return node;
  });

  const newContainer = document.createElement("div");
  newContainer.setAttribute("id", "visualiser");
  newContainer.append(...arrayNodes);
  container.replaceWith(newContainer);
};

// Orchestration function
// to setup various listeners and initial computations
function init() {
  makeSearchInputConditionallyRequired();
  setupDataSizeListener();
  setupWindowResizerListener();
}

/**
 * Steps
 * - [x] Update the visualiser when the user enters the new data size
 * - [ ] Create tracer with number highlight functionality (primary, secondary) for searching
 * - [ ] Add number shifting functionality in the tracer for sorting algorithms
 * - [ ] Write searching algorithms using the tracer
 * - [ ] Write sorting algorithsm using the tracer
 */
init();
