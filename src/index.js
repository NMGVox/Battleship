import { createPlayer } from './components/game_objects';
import { placeShips } from './components/placeShips';
import { playerInput } from './components/playerInput';
import './style.css';

let players = [];
//  let activePlayer = null;

async function mainLoop() {
    document.querySelector('#startgame').remove();
    let turn = 0;
    let activePlayer = players[0];
    let inactivePlayer = players[1];
    while (!activePlayer.gameBoard.allShipsSunk()) {
         /* eslint-disable no-await-in-loop */
        await playerInput(activePlayer, inactivePlayer);
        turn++;
        activePlayer = players[turn % 2];
        inactivePlayer = players[Math.abs((turn - 1) % 2)];
    }
    document.querySelector('#instructions').textContent = `Player ${Math.abs((turn - 1) % 2) + 1} Wins!`;
}

async function initializeGame() {
    let rembutton = document.querySelector('#placeShips');
    rembutton.removeEventListener('pointerdown', initializeGame);
    rembutton.remove();
    players.push(createPlayer('hum'));
    players[0].gameBoard.displayBoard();
    await placeShips(players);
    players.push(createPlayer('cpu'));
    let startGame = document.createElement('button');
    startGame.id = 'startgame';
    startGame.addEventListener('pointerdown', mainLoop);
    startGame.textContent = "Click here to start!";
    document.querySelector('body').appendChild(startGame);
}

function displayGameButton() {
    let button = document.createElement('button');
    button.id = 'placeShips';
    button.addEventListener('pointerdown', initializeGame);
    button.textContent = "Start Placing your Ships!";
    document.querySelector('body').appendChild(button);
}

window.addEventListener('load', displayGameButton);
