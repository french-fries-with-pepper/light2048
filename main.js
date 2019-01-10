const game = () => {
	console.log("game start!");

	//global things about size and destination here:
	const boardSize = 4;
	const clearCell = `<div class="cell"></div>\n`;
	let board = document.getElementById("myGame");


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
		initBoard: () =>{
			let cellsInBoard = "";
			
			for (let i = 0; i < boardSize*boardSize; i++) {
				cellsInBoard+=clearCell;
			}

			console.log("cells initiolizing successful");
			
			board.style['grid-template-columns'] = `repeat(${boardSize}, 1fr)`;
			board.style['grid-template-rows'] = `repeat(${boardSize}, 1fr)`;
			board.innerHTML = cellsInBoard;
		}

	}




	mainBoard.initGame();
	mainBoard.initBoard();
	console.log(mainBoard.cellTable);
}


game();