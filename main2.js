const game = size => {
  console.log("game start!");

  //init some globals.

  let board = document.getElementById("myGame");
  let gameScore = document.getElementById("score_container");
  board.style["grid-template-columns"] = `repeat(${size}, 1fr)`;
  board.style["grid-template-rows"] = `repeat(${size}, 1fr)`;
  let workTable = [];
  let globalScore = 0;
  let oldCondition = "";
  let newCondition = "";

  //init worktable

  for (let i = 0; i < size; i++) {
    workTable[i] = [];
    for (let j = 0; j < size; j++) {
      workTable[i][j] = 0;
    }
  }

  makeStyles = pow => {
    let result = [];
    for (let i = 0; i < pow; i++) {
      result[i] = `<div class="cell cell${i}"><span class="numb">${Math.pow(
        2,
        i
      )}</span></div>\n`;
    }

    return result;
  };
  let styles = makeStyles(30);

  makeScores = pow => {
    let result = [];
    for (let i = 0; i < pow; i++) {
      result[i] = Math.pow(2, i);
    }
    return result;
  };
  let scoresTable = makeScores(30);
  // all initiolising work are done here

  render = () => {
    let result = "";

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        result += styles[workTable[i][j]];
      }
    }

    board.innerHTML = result;
    gameScore.innerHTML = globalScore;
    console.log("render is OK");
  };

  getRandomInt = max => Math.floor(Math.random() * max);

  getRandom12 = () => (Math.random() > 0.9090909 ? 2 : 1);

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
        globalScore += scoresTable[tmp[i]];
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
  };
  moveUp = () => {
    workTable = rotateMatrix(workTable);
    for (let i = 0; i < size; i++) {
      workTable[i] = makeTinny(workTable[i]);
    }
    workTable = rotateBackMatrix(workTable);
  };
  moveRight = () => {
    for (let i = 0; i < size; i++) {
      workTable[i].reverse();
      workTable[i] = makeTinny(workTable[i]);
      workTable[i].reverse();
    }
  };
  moveDown = () => {
    workTable = rotateMatrix(workTable);
    for (let i = 0; i < size; i++) {
      workTable[i].reverse();
      workTable[i] = makeTinny(workTable[i]);
      workTable[i].reverse();
    }
    workTable = rotateBackMatrix(workTable);
  };
  pushRandomCell12();
  pushRandomCell12();

  //workTable = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25]]

  render();

  document.onkeydown = function(event) {
    switch (event.keyCode) {
      case 37:
        oldCondition = board.innerHTML;
        moveLeft();
        render();
        newCondition = board.innerHTML;
        if (newCondition !== oldCondition) {
          pushRandomCell12();
          render();
        }
        if (
          newCondition == oldCondition &&
          !board.innerHTML.includes("cell0")
        ) {
          board.innerHTML = "";
          workTable = [];
          board.className += " over";
        }
        break;
      case 38:
        oldCondition = board.innerHTML;
        moveUp();
        render();
        newCondition = board.innerHTML;
        if (newCondition !== oldCondition) {
          pushRandomCell12();
          render();
        }
        if (
          newCondition == oldCondition &&
          !board.innerHTML.includes("cell0")
        ) {
          board.innerHTML = "";
          workTable = [];
          board.className += " over";
        }
        break;
      case 39:
        oldCondition = board.innerHTML;
        moveRight();
        render();
        newCondition = board.innerHTML;
        if (newCondition !== oldCondition) {
          pushRandomCell12();
          render();
        }
        if (
          newCondition == oldCondition &&
          !board.innerHTML.includes("cell0")
        ) {
          board.innerHTML = "";
          workTable = [];
          board.className += " over";
        }
        break;
      case 40:
        oldCondition = board.innerHTML;

        moveDown();
        render();
        newCondition = board.innerHTML;
        if (newCondition !== oldCondition) {
          pushRandomCell12();
          render();
        }
        if (
          newCondition == oldCondition &&
          !board.innerHTML.includes("cell0")
        ) {
          board.innerHTML = "";
          workTable = [];
          board.className += " over";
        }
        break;
    }
  };
};

let startBtn = document.getElementById("start");
let diff = document.getElementById("diff");
let gameWindow = document.getElementById("gameWindow");

makeCellsFontSize = () => {
  document.getElementsByTagName("html")[0].style[
    "font-size"
  ] = `${document.getElementById("myGame").firstChild.clientHeight / 5}px`;
};

startBtn.onclick = () => {
  game(diff.value);
  gameWindow.style.display = "block";
  makeCellsFontSize();
};

window.onresize = () => {
  if (gameWindow.style.display === "block") {
    makeCellsFontSize();
  }
};
