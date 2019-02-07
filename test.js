getRandomInt = max => Math.floor(Math.random() * (max + 1));

getRandom12 = () => (Math.random() > 0.85 ? 2 : 1);

zeroLast = arr => {
  let res = [];
  let k = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != 0) {
      res[k] = arr[i];
      k++;
    }
  }
  for (let i = 0; i < arr.length; i++) {
    if (!res[i]) {
      res[i] = 0;
    }
  }
  return res;
};

makeTinny = arr => {
  let res = [];
  let tmp = arr.map(function(item) {
    return item;
  });

  for (let i = 0; i < tmp.length - 1; i++) {
    if (tmp[i] != 0 && tmp[i] === tmp[i + 1]) {
      tmp[i]++;
      tmp[i + 1] = 0;
    }
  }
  res = zeroLast(tmp);
  return res;
};

let first = [0, 0, 0, 1, 1, 0, 1];
let first2 = [0, 2, 2, 1, 1, 0, 1];
let first3 = [5, 6, 0, 1, 1, 0, 1];
let first4 = [0, 0, 0, 0, 0, 0, 0];
let first5 = [1, 1, 1, 1, 1, 1, 1];

/*console.log("zeroLast:", zeroLast(first));
console.log("zeroLast:", zeroLast(first2));
console.log("zeroLast:", zeroLast(first3));
console.log("zeroLast:", zeroLast(first4));
console.log("zeroLast:", zeroLast(first5));*/
console.log("makeTinny: ", makeTinny(first));
console.log("makeTinny: ", makeTinny(first2));
console.log("makeTinny: ", makeTinny(first3));
console.log("makeTinny: ", makeTinny(first4));
console.log("makeTinny: ", makeTinny(first5));
