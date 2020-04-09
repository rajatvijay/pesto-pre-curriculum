import "./styles.css";

const createDataSizeInput = (container) => {
  const input = document.createElement("input");
  input.type = "text";
  input.addEventListener("input", (e) => {});
  input.remo;
};

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

function init() {
  makeSearchInputConditionallyRequired();
}

init();
