import "./styles.css";
import { generataeRandomArray, generateElementId } from "./utils";
import {
  linearSearch,
  binarySearch,
  selectionSort,
  bubbleSort
} from "./algorithms";

const MAX_NUMBER = 200;

const state = {
  values: []
};

// Adds listener on algo input
// to update the search input box required validation accordingly
// TODO: Update when page refresesh, maybe?
const makeSearchInputConditionallyRequired = () => {
  const algoSelector = document.querySelector("#algoSelection");
  const searchValueInput = document.querySelector("#search-number");
  algoSelector.addEventListener("change", (e) => {
    if (["LINEAR_SEARCH", "BINARY_SEARCH"].includes(e.target.value)) {
      searchValueInput.setAttribute("required", true);
    } else {
      searchValueInput.removeAttribute("required");
    }
  });
};

// Adds listener to data-size input
// to create the visualizer
// TODO: Update when page refresesh, maybe?
const setupDataSizeListener = () => {
  const dataSizeInput = document.querySelector("#data-size");
  dataSizeInput.addEventListener("change", (e) => {
    updateVisualizer(e.target.value);
  });
};

const setupWindowResizerListener = () => {
  window.addEventListener("resize", () => {
    state.values.length && createVisualizer(state.values);
  });
};

// Generates & update in the DOM
// the new visualiser based on the input value
const updateVisualizer = (value) => {
  const randomArray = generataeRandomArray(value, MAX_NUMBER);
  // Updating in the state;
  state.values = randomArray;
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
    node.setAttribute("id", generateElementId(value, index));

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

const sortAndUpdateVisualiser = () => {
  const values = [...state.values];
  const sortedValues = values.sort((a, b) => a - b);
  state.values = sortedValues;
  createVisualizer(state.values);
};

const setupFormSubmitListener = () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const algo = formData.get("algo");
    if (algo === "LINEAR_SEARCH") {
      linearSearch(state.values, formData.get("searchNumber"));
    } else if (algo === "BINARY_SEARCH") {
      sortAndUpdateVisualiser();
      binarySearch(state.values, formData.get("searchNumber"));
    } else if (algo === "SELECTION_SORT") {
      selectionSort(state.values);
    } else if (algo === "BUBBLE_SORT") {
      bubbleSort(state.values);
    }
  });
};

// Orchestration function
// to setup various listeners and initial computations
function init() {
  makeSearchInputConditionallyRequired();
  setupDataSizeListener();
  // setupWindowResizerListener();
  setupFormSubmitListener();
}

/**
 * Steps
 * - [x] Update the visualiser when the user enters the new data size
 * - [x] Create tracer with number highlight functionality (primary, secondary) for searching
 * - [x] Add number shifting functionality in the tracer for sorting algorithms
 * - [x] Write searching algorithms using the tracer
 * - [x] Write sorting algorithsm using the tracer
 */
init();
