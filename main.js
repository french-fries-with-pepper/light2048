const game = () => {
	console.log("game start!");

	//global things about size and destination here:
	const boardSize = 4;
	const clearCell = `<div class="cell"></div>\n`;
	let board = document.getElementById("myGame");

	const frameTime = 1000;


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
			console.log("initiolizing successful");
		},

		// mix game field array and html
		// use grid layout 
		/*initBoard: () =>{
			let cellsInBoard = "";
			
			for (let i = 0; i < boardSize*boardSize; i++) {
				cellsInBoard+=clearCell;
			}

			console.log("cells initiolizing successful");
			
			board.style['grid-template-columns'] = `repeat(${boardSize}, 1fr)`;
			board.style['grid-template-rows'] = `repeat(${boardSize}, 1fr)`;
			board.innerHTML = cellsInBoard;
		}*/
		render: () => {
			console.log("render");
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
		}


	}




	mainBoard.initGame();

	let gameLoop = () => {
		mainBoard.render();

		document.onkeydown = function(event) {
        	switch (event.keyCode) {
	           case 37:
	                
	                mainBoard.moveLeft();
	              break;
	           case 38:
	                
	                mainBoard.moveUp();
	              break;
	           case 39:
	                
	                mainBoard.moveRight();
	              break;
	           case 40:
	                
	                mainBoard.moveDown();
	              break;
	        }
	    };

     

	}
	
		
	
	let gameLoopId = setInterval(gameLoop, frameTime);
	/*document.onkeydown = function(event) {
		if(event.keyCode === 32){
			//clearInterval(gameLoopId);
			console.log("stop");
		}
	}*/
}


game();