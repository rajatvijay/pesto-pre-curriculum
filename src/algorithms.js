import {
  initTracer,
  highlightSecondaryItem,
  delay,
  highlightPrimaryItem
} from "./tracer";
import { generateElementId } from "./utils";

export async function linearSearch(arr, value) {
  initTracer(1000);
  for (let i = 0; i < arr.length; i++) {
    highlightSecondaryItem(generateElementId(arr[i], i));
    await delay();

    if (value == arr[i]) {
      highlightPrimaryItem(generateElementId(arr[i], i));
      break;
    }
  }
}

export function binarySearch(sortedArray, elToFind) {
  initTracer(1000);
  var lowIndex = 0;
  var highIndex = sortedArray.length - 1;
  while (lowIndex <= highIndex) {
    var midIndex = Math.floor((lowIndex + highIndex) / 2);
    highlightSecondaryItem(generateElementId(sortedArray[midIndex], midIndex));
    if (sortedArray[midIndex] == elToFind) {
      highlightPrimaryItem(generateElementId(sortedArray[midIndex], midIndex));
      return midIndex;
    } else if (sortedArray[midIndex] < elToFind) {
      lowIndex = midIndex + 1;
    } else {
      highIndex = midIndex - 1;
    }
  }
  return null;
}
