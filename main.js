const game = () => {
	console.log("game start!");

	const boardSize = 4;

	let mainBoard = {
		size: boardSize,
		isPossibleToPlay: true,
		cellTable: [],

		init: () =>{
			for (let i = 0; i < mainBoard.size; i++) {
				mainBoard.cellTable[i] = [];
				for (var j = 0; j < mainBoard.size; j++) {
					mainBoard.cellTable[i][j] = 0;
				}
			}
			console.log("initiolizing successful");
		}
	}
	mainBoard.init();
	console.log(mainBoard.cellTable);
}


game();