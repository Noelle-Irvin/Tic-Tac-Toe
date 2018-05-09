$(document).ready(function(){
let turn = 1;
let gameOver = false;
let computerMode = true;
let player1Arr = [];
let player2Arr = [];
let computerArr = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];
let newGame = false;
const winningCombos = [
    ['A1','B1','C1'], //ROW 1
    ['A2','B2','C2'], //ROW 2
    ['A3','B3','C3'], //ROW 3
    ['A1','A2','A3'], //COLUMN 1
    ['B1','B2','B3'], //COLUMN 2
    ['C1','C2','C3'], //COLUMN 3
    ['A1','B2','C3'], //DIAG 1
    ['A3','B2','C1'] //DIAG 2
];
	
	$('#computer').click(function(){
		if(computerMode){
			computerMode = false;
			$('#computer').html('Enable Computer Mode');
			$('#player1').html('Player 1 Score:');
			$('#player2').html('Player 2 Score:');
			$('#1').html('');
			$('#2').html('');
			$('#modal').html('Player 2 goes first!');
		}else{
			computerMode =true;
			console.log(computerMode);
			$('#computer').html('Enable 2 Player Mode');
			$('#player1').html('Your Score:');
			$('#player2').html('Computer Score:');
			$('#1').html('');
			$('#2').html('');
			$('#modal').html('This time Computer goes first!');
		}
	})

	$('#reset').click(function(){
		reset();
		console.log("Reset selected.");
	})

	$('.square').click(function(){
		if(!gameOver){
			if(computerMode === true){
				event.target.innerHTML = "X";
				player1Arr.push(event.target.id);
				computerArr.splice(computerArr.indexOf(event.target.id), 1);
				checkWin(1, player1Arr);
				if(!gameOver){
				setTimeout(computerMove, 1000);
			}
			}else{
				if(event.target.innerHTML !== ""){
				}else if(turn === 1){
				event.target.innerHTML = "X";
				player1Arr.push(event.target.id);
				checkWin(turn, player1Arr);
				turn = 2;
				}else if(turn === 2){
				event.target.innerHTML = "O";
				player2Arr.push(event.target.id);
				checkWin(turn, player2Arr);
				turn = 1;
				}
			}
		}
	})
	function checkWin(whosTurn, playerArr){
		for(let i = 0; i < winningCombos.length; i++){
			let squareCount = 0;
			for(let j = 0; j < winningCombos[i].length; j++){
				if(playerArr.indexOf(winningCombos[i][j]) > -1){
					squareCount ++;
				}
				if(squareCount === 3){
					document.getElementById(whosTurn).innerHTML += "|";
					if(whosTurn == 1 && !computerMode){ 
						whosTurn = "Player 1"; 
					}
					if(whosTurn == 2 && !computerMode){
						whosTurn = "Player 2";
					}
					if(whosTurn == 1 && computerMode){
						whosTurn = "You";
					}
					if(whosTurn == 2 && computerMode){
						whosTurn = "Computer";
					}
					document.getElementById('message').innerHTML = `${whosTurn} won the game! Press Reset to play again.`;
					gameOver = true;
				}
			}
		}
	}

	function reset(){
		$('.square').each(function(square){
			$(this).html('');
		})
		$('#message').html('New Game!');
		for(let i = player1Arr.length - 1; i >= 0; i--){
			computerArr.push(player1Arr[i]);
			player1Arr.pop();
			console.log(player1Arr);
		}
		for(let i = player2Arr.length - 1; i >= 0; i--){
			computerArr.push(player2Arr[i]);
			player2Arr.pop();
			console.log(player2Arr);
		}
		gameOver = false;
		if(!newGame){
			newGame = true;
			turn = 2;
			if(!computerMode){
			$('#modal').html('Player 2 goes first!');
			}
		}else if(newGame){
			newGame = false;
			turn = 1;
			$('#modal').html('Player 1 goes first!');
		}
		if(newGame && computerMode){
			setTimeout(computerMove, 1000);
			$('#modal').html('Computer goes first!');
			}else if(computerMode){
			$('#modal').html('You go first!');
			}
	}

	function computerMove(){
		console.log("Computer made his move.");
		//this gives me a random index in the possible moves
		let move = Math.floor(Math.random()*(computerArr.length-1));
		console.log(move);
		let square = computerArr[move];
		player2Arr.push(square);
		console.log(square);
		$(`#${square}`).html("O");
		computerArr.splice(move, 1);
		checkWin(2, player2Arr);
	}
});