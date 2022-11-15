export const recursion = async <T>(
  arrayOfPromises: Promise<T>[],
  results: T[]
) => {
  if (arrayOfPromises.length === 0) return;

  try { 
    const value = await Promise.resolve(arrayOfPromises[0]);
    await Promise.resolve(recursion(arrayOfPromises.slice(1), results));
  } catch (err) {
    console.log(err);
    arrayOfPromises.forEach(promise => {
      promise.catch(err => console.log(err));
    })
  }
}
