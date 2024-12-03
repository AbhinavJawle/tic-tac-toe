const TicTacToe = (function() {
    // Player Factory Function
    const createPlayer = (name, symbol) => { return {name, symbol} };

    // Game Module (IIFE)
    const gameModule = (() => { 
        let board = ['', '', '', '', '', '', '', '', ''];
        let currentPlayer;
        let gameActive = true;

        const players = [
            createPlayer('Player X', 'X'),
            createPlayer('Player O', 'O'),
        ];

        const winningCombos = [
            [0,1,2], [3,4,5], [6,7,8],  // Rows
            [0,3,6], [1,4,7], [2,5,8],  // Columns
            [0,4,8], [2,4,6]  
        ];

        const init = () => {
            currentPlayer = players[0];
            board = ['', '', '', '', '', '', '', '', ''];
            gameActive = true;
            renderBoard();
            updateStatus();
        };

        const renderBoard = () => {
            const boardElement = document.querySelector('#board');
            boardElement.innerHTML = '';
            board.forEach((cell, index) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.textContent = cell; //havent understood
                cellElement.setAttribute('data-index', index);
                cellElement.addEventListener('click', handleCellClick);
                boardElement.appendChild(cellElement)
            });
        }

        const handleCellClick = (event) => {
            const index = event.target.getAttribute('data-index');
            if(gameActive == false || board[index] !== '') {
                return;
            }

            board[index] = currentPlayer.symbol;
            renderBoard();

            if(checkWin()){
                gameActive = false;
                updateStatus(`${currentPlayer.name} WINS`);
                return;
            }
            
            if(checkDraw()){
                gameActive = false;
                updateStatus('It is a DRAW');
                return;
            }

            currentPlayer = currentPlayer == players[0] ? players[1] : players[0];
            //update status
        }

        const checkWin = () => {
            return winningCombos.some((combo) => {
                return combo.every((index) => board[index] == currentPlayer.symbol)
            })
        };

        const checkDraw = () => {
            board.every((cell) => cell !== '');
        };

        const updateStatus = (message) => {
            const statusElement = document.querySelector('#status');
            statusElement.textContent = message || `It is ${currentPlayer.name}'s turn`;
        }

        const resetGame = () => {
            init();
        }
        init()
        return {
            resetGame
        }
     })();

    // Return public interface
    return {
        reset: gameModule.resetGame
    };
})();

document.getElementById('reset-btn').addEventListener('click', TicTacToe.reset);