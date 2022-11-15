// import { fileETL } from "./src/FileETL/fileEtl";
import { recursivePromise } from "./src/recursivePromise/recursivePromise";
// import { setTimeout } from "timers/promises";



(async () => {
  try {
    const arrayOfPromises = [
      new Promise((res, rej) => setTimeout(() => res("promise1"), 1000)),
      new Promise((res, rej) => setTimeout(() => res("promise2"), 3000)),
      new Promise((res, rej) => setTimeout(() => rej("promise3"), 1000)),
      new Promise((res, rej) => setTimeout(() => res("promise4"), 500)),
      new Promise((res, rej) => setTimeout(() => res("promise5"), 3000)),
      new Promise((res, rej) => setTimeout(() => res("promise6"), 1500)),
      new Promise((res, rej) => setTimeout(() => res("promise7"), 200)),
      new Promise((res, rej) => setTimeout(() => res("promise8"), 4000)),
    ];
     recursivePromise(arrayOfPromises);
  } catch (err) {
    console.error("index", err);
  }
})();

// fileETL();
