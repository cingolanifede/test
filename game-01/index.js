const sumNumbers = (arr, s) => {
  let result = [];
  let checkTable = {};
  arr.forEach((n, i) => {
    checkTable[s - n] ? result.push([n, s - n]) : (checkTable[n] = n);
  });
  return result;
};

const arr = [3, 5, 2, -4, 8, 11];
const n = 7;

console.log(sumNumbers(arr, n));
