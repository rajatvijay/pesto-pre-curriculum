import { init, INSTRUCTIONS } from "./tracer";
import { generateElementId } from "./utils";

export function linearSearch(arr, value) {
  const tracer = init({ delayMs: 1000 });
  const search = () => {
    for (let i = 0; i < arr.length; i++) {
      const nodeId = generateElementId(arr[i], i);
      console.log("nodeId", nodeId);
      tracer.push(INSTRUCTIONS.HIGHLIGHT_SECONDARY, {
        id: nodeId
      });
      tracer.push(INSTRUCTIONS.CLEAR_HIGHLIGHT, { id: nodeId });
      if (value == arr[i]) {
        tracer.push(INSTRUCTIONS.HIGHLIGHT_PRIMARY, {
          id: nodeId
        });
        // tracer.stop();
      }
    }
  };
  search();
  // setTimeout(tracer.clean, 1000);
}

export function binarySearch(sortedArray, elToFind) {
  const tracer = init({ delayMs: 1000 });
  const search = () => {
    let lowIndex = 0;
    let highIndex = sortedArray.length - 1;
    while (lowIndex <= highIndex) {
      const midIndex = Math.floor((lowIndex + highIndex) / 2);
      const nodeId = generateElementId(sortedArray[midIndex], midIndex);
      tracer.push(INSTRUCTIONS.HIGHLIGHT_SECONDARY, {
        id: nodeId
      });
      tracer.push(INSTRUCTIONS.CLEAR_HIGHLIGHT, { id: nodeId });
      if (sortedArray[midIndex] == elToFind) {
        tracer.push(INSTRUCTIONS.HIGHLIGHT_PRIMARY, {
          id: nodeId
        });
        return midIndex;
      } else if (sortedArray[midIndex] < elToFind) {
        lowIndex = midIndex + 1;
      } else {
        highIndex = midIndex - 1;
      }
    }
    return null;
  };
  search();
}
