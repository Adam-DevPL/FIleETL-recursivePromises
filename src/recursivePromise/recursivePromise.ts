import { recursion } from "./utils";

export const recursivePromise = <T>(
  arrayOfPromises: Promise<T>[]
): Promise<Array<T>> => {
  const results: Array<T> = [];
  const lengthOfArrayOfPromises: number = arrayOfPromises.length;

  if (lengthOfArrayOfPromises === 0) {
    return Promise.resolve([]);
  }
  (async () => {
    try {
      await recursion(arrayOfPromises, results);
    } catch (error) {}
  })();
};
