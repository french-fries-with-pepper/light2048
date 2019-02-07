const game = size => {
  console.log("game start!");

  //init some globals.

  let board = document.getElementById("myGame");
  board.style["grid-template-columns"] = `repeat(${size}, 1fr)`;
  board.style["grid-template-rows"] = `repeat(${size}, 1fr)`;
  let workTable = [];

  //init worktable

  for (let i = 0; i < size; i++) {
    workTable[i] = [];
    for (let j = 0; j < size; j++) {
      workTable[i][j] = 0;
    }
  }

  console.log("workTable is:", workTable);

  makeStyles = pow => {
    let result = [];
    for (let i = 0; i < pow; i++) {
      result[i] = `<div class="cell cell${i}">${Math.pow(2, i)}</div>\n`;
    }
    return result;
  };
  let styles = makeStyles(20);

  // all initiolising work are done here

  render = () => {
    let result = "";

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        result += styles[workTable[i][j]];
      }
    }

    board.innerHTML = result;
    console.log("render is OK");
  };

  render();

  getRandomInt = max => Math.floor(Math.random() * max);

  getRandom12 = () => (Math.random() > 0.85 ? 2 : 1);

  getRandomCell = () => {
    let arrOfZeroCells = [];
    let k = 0; // linear pointer

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (workTable[i][j] === 0) {
          arrOfZeroCells[k] = { x: i, y: j };
          k++;
        }
      }
    }

    if (arrOfZeroCells.length === 0) {
      return -1;
    } else {
      return arrOfZeroCells[getRandomInt(arrOfZeroCells.length)];
    }
  };

  pushRandomCell12 = () => {
    let tmp = getRandomCell();
    if (tmp === -1) {
      console.log("GAME OVER!!!");
      return false;
    } else {
      workTable[tmp.x][tmp.y] = getRandom12();
      return true;
    }
  };

  makeTinny = arr => {
    // put all 0 at the right
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

    let res = [];
    let tmp = zeroLast(arr);

    for (let i = 0; i < tmp.length - 1; i++) {
      if (tmp[i] != 0 && tmp[i] === tmp[i + 1]) {
        tmp[i]++;
        tmp[i + 1] = 0;
      }
    }
    res = zeroLast(tmp);
    return res;
  };

  rotateMatrix = matr => {
    let result = [];
    const n = matr.length;

    for (let i = 0; i < n; i++) {
      result[i] = [];
    }

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        result[i][j] = matr[j][n - 1 - i];
      }
    }
    return result;
  };

  rotateBackMatrix = matr => {
    let result = [];
    const n = matr.length;

    for (let i = 0; i < n; i++) {
      result[i] = [];
      for (let j = 0; j < n; j++) {
        result[i][j] = undefined;
      }
    }

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        result[i][j] = matr[n - 1 - j][i];
      }
    }
    return result;
  };

  // all stuff methods also done
  // here only moving methods

  moveLeft = () => {
    //make workTable moved left

    for (let i = 0; i < size; i++) {
      workTable[i] = makeTinny(workTable[i]);
    }
    //pushRandomCell12();
    render();
  };
  moveUp = () => {
    workTable = rotateMatrix(workTable);
    for (let i = 0; i < size; i++) {
      workTable[i] = makeTinny(workTable[i]);
    }
    workTable = rotateBackMatrix(workTable);
    //pushRandomCell12();
    render();
  };
  moveRight = () => {
    for (let i = 0; i < size; i++) {
      workTable[i].reverse();
      workTable[i] = makeTinny(workTable[i]);
      workTable[i].reverse();
    }
    //pushRandomCell12();
    render();
  };
  moveDown = () => {
    workTable = rotateMatrix(workTable);
    for (let i = 0; i < size; i++) {
      workTable[i].reverse();
      workTable[i] = makeTinny(workTable[i]);
      workTable[i].reverse();
    }
    workTable = rotateBackMatrix(workTable);
    //pushRandomCell12();
    render();
  };
  pushRandomCell12();
  pushRandomCell12();

  render();

  console.log("workTable is", workTable);
  //moveLeft();
  document.onkeydown = function(event) {
    switch (event.keyCode) {
      case 37:
        moveLeft();
        pushRandomCell12();
        render();

        break;
      case 38:
        moveUp();
        pushRandomCell12();
        render();
        break;
      case 39:
        moveRight();
        pushRandomCell12();
        render();
        break;
      case 40:
        moveDown();
        pushRandomCell12();
        render();
        break;
    }
  };
};

game(4);
