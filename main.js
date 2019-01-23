const game = () => {
	console.log("game start!");

	//global things about size and destination here:
	const boardSize = 6;
	const clearCell = `<div class="cell0"></div>\n`;
	let board = document.getElementById("myGame");
    let dictionry = [];
	const frameTime = 50;


	// Main object for game board:
	let mainBoard = {
		size: boardSize,
		isPossibleToPlay: true,
		cellTable: [],
		

		// init game field
		initGame: () =>{
			for (let i = 0; i < mainBoard.size; i++) {
				mainBoard.cellTable[i] = [];
				for (var j = 0; j < mainBoard.size; j++) {
					mainBoard.cellTable[i][j] = 0;
				}
			}

			for (var i = 0; i < 100; i++) {
				dictionry[i] = `cell${i}`;
			}
			console.log("initiolizing successful");
		},

		// mix game field array and html
		// use grid layout 
		initBoard: () =>{
			let cellsInBoard = "";
			
			for (let i = 0; i < boardSize*boardSize; i++) {
				cellsInBoard+=clearCell;
			}

			console.log("cells initiolizing successful");
			
			board.style['grid-template-columns'] = `repeat(${boardSize}, 1fr)`;
			board.style['grid-template-rows'] = `repeat(${boardSize}, 1fr)`;
			board.innerHTML = cellsInBoard;
		},
		render: () => {
			console.log("render");
			let k = 0;
			for (let i = 0; i < mainBoard.size; i++) {
				for (var j = 0; j < mainBoard.size; j++) {
					cellsArr[k].className = dictionry[mainBoard.cellTable[i][j]];
					k++;
				}
			}
		},

		moveUp: () =>{
			console.log("moveUp");
		},

		moveDown: () => {
			console.log("moveDown");
		},
		moveLeft: () => {
			console.log('moveLeft');
		},
		moveRight: () => {
			console.log('moveRight');
		},

		getRandom12: () => {
			let result = Math.random();
			return result>0.75 ? 2 : 1
		},

		setRandomCell12: () => {
			let tempArr = [];
			let k = 0; //object that contain coordinates
			let pointer = 0;
			function getRandomInt(max) {
 					return Math.floor(Math.random()*max);
			}


			for (let i = 0; i < boardSize; i++) {
				for (var j = 0; j < boardSize; j++) {
					if (mainBoard.cellTable[i][j] === 0) {
						tempArr[k] = {x:i,y:j}; 
						k++; 
					}
				}
			}
			

			if(tempArr.length>0){
				pointer = tempArr[getRandomInt(tempArr.length)];
				mainBoard.cellTable[pointer.x][pointer.y] = mainBoard.getRandom12();
			}

			
			// I have array of objects that contain coordinates of all free cells

			// Chose random number and return tempArr(random)

		}

	}




	mainBoard.initGame();
	mainBoard.initBoard();

	let cellsArr = document.getElementsByClassName("cell0");


	console.log(mainBoard.cellTable);

	let gameLoop = () => {
		

		document.onkeydown = function(event) {
        	switch (event.keyCode) {
	           case 37:
	    			            
	                mainBoard.moveLeft();
	                mainBoard.render();
	                mainBoard.setRandomCell12();
	                console.log(mainBoard.cellTable);
	              break;
	           case 38:
	                
	                mainBoard.moveUp();
	                mainBoard.render();
	                mainBoard.setRandomCell12();
	                console.log(mainBoard.cellTable);
	              break;
	           case 39:
	                
	                mainBoard.moveRight();
	                mainBoard.render();
	                mainBoard.setRandomCell12();
	                console.log(mainBoard.cellTable);
	              break;
	           case 40:
	                
	                mainBoard.moveDown();
	                mainBoard.render();
	                mainBoard.setRandomCell12();
	                console.log(mainBoard.cellTable);
	              break;
	        }
	    };

     

	}
	
		
	
	let gameLoopId = setInterval(gameLoop, frameTime);

	
}


game();