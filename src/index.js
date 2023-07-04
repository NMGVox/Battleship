import { createPlayer } from './components/game_objects';
import { placeShips } from './components/placeShips';
import { playerInput } from './components/playerInput';
import { displayInstructions } from './components/displayInstructions';
import './style.css';

let players = [];
//  let activePlayer = null;

function timed(interval) {
    return new Promise((resolve) => {
        setTimeout(resolve, interval);
    });
}

function switchSize(mode, act, inact) {
    if (mode === 1) {
        inact.gameBoard.playArea.classList.add('enlarge');
        act.gameBoard.playArea.classList.add('smaller');
    } else {
        inact.gameBoard.playArea.classList.remove('enlarge');
        act.gameBoard.playArea.classList.remove('smaller');
    }
}

async function mainLoop() {
    document.querySelector('#startgame').remove();
    let turn = 0;
    let activePlayer = players[0];
    let inactivePlayer = players[1];
    switchSize(1, activePlayer, inactivePlayer);
    while (!activePlayer.gameBoard.allShipsSunk()) {
        /* eslint-disable no-await-in-loop */
        displayInstructions(`Player ${Math.abs(turn % 2) + 1} is aiming...`);
        await timed(activePlayer.type === 'cpu' ? 2000 : 500);
        await playerInput(activePlayer, inactivePlayer);
        turn++;
        activePlayer = players[turn % 2];
        inactivePlayer = players[Math.abs((turn - 1) % 2)];
    }
    displayInstructions(`Player ${Math.abs((turn - 1) % 2) + 1} Wins!`);
}

async function initializeGame() {
    let rembutton = document.querySelector('#placeShips');
    rembutton.removeEventListener('pointerdown', initializeGame);
    document.querySelector('.initialDiv').style.display = 'none';
    let gameArea = document.createElement('div');
    gameArea.classList.add('gameArea');
    document.querySelector('body').appendChild(gameArea);
    players.push(createPlayer('hum'));
    players[0].gameBoard.displayBoard();
    await placeShips(players);
    players.push(createPlayer('cpu'));
    document.querySelector('#error').textContent = '';
    let startGame = document.createElement('button');
    startGame.id = 'startgame';
    startGame.addEventListener('pointerdown', mainLoop);
    startGame.textContent = "Click here to start!";
    document.querySelector('body').appendChild(startGame);
}

function displayGameButton() {
    let div = document.createElement('div');
    div.classList.add('initialDiv');
    document.querySelector('body').appendChild(div);
    let button = document.createElement('button');
    button.id = 'placeShips';
    button.addEventListener('pointerdown', initializeGame);
    button.textContent = "Start Placing your Ships!";
    div.appendChild(button);
}

window.addEventListener('load', displayGameButton);
