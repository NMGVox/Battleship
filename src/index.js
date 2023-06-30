import { createPlayer } from './components/game_objects';
import { placeShips } from './components/placeShips';
import './style.css';

let players = [];
//  let activePlayer = null;

function mainLoop() {
    document.querySelector('#error').textContent = 'Begin!';
}

async function initializeGame() {
    players.push(createPlayer('hum'));
    players[0].gameBoard.displayBoard();
    await placeShips(players);
    players.push(createPlayer('cpu'));
    let startGame = document.createElement('button');
    startGame.addEventListener('pointerdown', mainLoop);
    startGame.textContent = "Click here to start!";
    document.querySelector('body').appendChild(startGame);
}

window.addEventListener('load', initializeGame);
