import { init, INSTRUCTIONS } from "./tracer";
import { generateElementId } from "./utils";

window.debug = true;

// TODO: Will break when there are two same no's
const generateIdMap = (arr) =>
  arr.reduce(
    (idMap, item, index) => ({
      [item]: generateElementId(item, index),
      ...idMap
    }),
    {}
  );

export function linearSearch(arr, value) {
  const tracer = init({ delayMs: 1000 });
  const idMap = generateIdMap(arr);
  const search = () => {
    for (let i = 0; i < arr.length; i++) {
      const nodeId = idMap[arr[i]];
      tracer.push(INSTRUCTIONS.HIGHLIGHT_SECONDARY, nodeId);
      tracer.push(INSTRUCTIONS.CLEAR_HIGHLIGHT, nodeId);
      if (value == arr[i]) {
        tracer.push(INSTRUCTIONS.HIGHLIGHT_PRIMARY, nodeId);
        break;
      }
    }
  };
  search();
}

export function binarySearch(sortedArray, elToFind) {
  const tracer = init({ delayMs: 1000 });
  const idMap = generateIdMap(sortedArray);
  const search = () => {
    let lowIndex = 0;
    let highIndex = sortedArray.length - 1;
    while (lowIndex <= highIndex) {
      const midIndex = Math.floor((lowIndex + highIndex) / 2);
      const nodeId = idMap[sortedArray[midIndex]];
      tracer.push(INSTRUCTIONS.HIGHLIGHT_SECONDARY, nodeId);
      tracer.push(INSTRUCTIONS.CLEAR_HIGHLIGHT, nodeId);
      if (sortedArray[midIndex] == elToFind) {
        tracer.push(INSTRUCTIONS.HIGHLIGHT_PRIMARY, nodeId);
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

export const selectionSort = (arr) => {
  const tracer = init({ delayMs: 500 });
  const idMap = generateIdMap(arr);
  const search = () => {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      let min = i;
      tracer.push(INSTRUCTIONS.HIGHLIGHT_PRIMARY, idMap[arr[min]]);
      for (let j = i + 1; j < len; j++) {
        tracer.push(INSTRUCTIONS.HIGHLIGHT_SECONDARY, idMap[arr[j]]);
        tracer.push(INSTRUCTIONS.CLEAR_SECONDARY, idMap[arr[j]]);
        if (arr[min] > arr[j]) {
          tracer.push(INSTRUCTIONS.CLEAR_PRIMARY, idMap[arr[min]]);
          min = j;
          tracer.push(INSTRUCTIONS.HIGHLIGHT_PRIMARY, idMap[arr[min]]);
        }
      }
      if (min !== i) {
        tracer.push(INSTRUCTIONS.SWAP_NODES, idMap[arr[min]], idMap[arr[i]]);
        tracer.push(INSTRUCTIONS.CLEAR_PRIMARY, idMap[arr[min]]);
        let tmp = arr[i];
        arr[i] = arr[min];
        arr[min] = tmp;
      }
      tracer.push(INSTRUCTIONS.CLEAR_PRIMARY, idMap[arr[min]]);
    }
    return arr;
  };
  search();
  tracer.logQueue();
};

export const bubbleSort = (inputArr) => {
  const tracer = init({ delayMs: 500 });
  const idMap = generateIdMap(inputArr);
  const search = () => {
    let len = inputArr.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < len; i++) {
        tracer.push(INSTRUCTIONS.HIGHLIGHT_SECONDARY, idMap[inputArr[i]]);
        tracer.push(INSTRUCTIONS.HIGHLIGHT_SECONDARY, idMap[inputArr[i + 1]]);
        if (inputArr[i] > inputArr[i + 1]) {
          if (i + 1 < len) {
            tracer.push(
              INSTRUCTIONS.SWAP_NODES,
              idMap[inputArr[i]],
              idMap[inputArr[i + 1]]
            );
          }
          let tmp = inputArr[i];
          inputArr[i] = inputArr[i + 1];
          inputArr[i + 1] = tmp;
          swapped = true;
        }
        tracer.push(INSTRUCTIONS.CLEAR_SECONDARY, idMap[inputArr[i]]);
      }
    } while (swapped);
    return inputArr;
  };
  search();
};
