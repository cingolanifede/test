/** use a hashtable to "store" the the numbers */

const sumNumbers = (arr, s) => {
  let result = [];
  let checkTable = {};
  arr.forEach((n, i) => {
    const diff = s - n;
    checkTable[diff] ? result.push([n, diff]) : (checkTable[n] = n);
  });
  return result;
};

/** Define array && sum */
const arr = [3, 5, 2, -4, 8, 11];
const n = 7;

console.log(sumNumbers(arr, n));
