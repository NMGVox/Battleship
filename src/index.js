import { createPlayer } from './components/game_objects';
import { placeShips } from './components/placeShips';
import { playerInput } from './components/playerInput';
import { displayInstructions } from './components/displayInstructions';
import './style.css';

let players = [];

function restartGame() {
    while (players.length > 0) {
        players.pop();
    }
    let restartBtn = document.querySelector('#restart');
    restartBtn.removeEventListener('pointerdown', restartGame);
    restartBtn.remove();
    document.querySelector('.initialDiv').style.display = 'flex';
    // eslint-disable-next-line no-use-before-define
    document.querySelector('#placeShips').addEventListener('pointerdown', initializeGame);
    document.querySelector('#error').textContent = '';
    document.querySelector('#instructions').textContent = '';
    document.querySelector('.gameArea').remove();
}

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
    let restartBtn = document.createElement('button');
    restartBtn.id = 'restart';
    restartBtn.classList.add('gamebtn');
    restartBtn.addEventListener('pointerdown', restartGame);
    restartBtn.textContent = "Play Again!";
    document.querySelector('.main').appendChild(restartBtn);
}

async function initializeGame() {
    let rembutton = document.querySelector('#placeShips');
    rembutton.removeEventListener('pointerdown', initializeGame);
    document.querySelector('.initialDiv').style.display = 'none';
    let gameArea = document.createElement('div');
    gameArea.classList.add('gameArea');
    document.querySelector('.main').appendChild(gameArea);
    players.push(createPlayer('hum'));
    players[0].gameBoard.displayBoard();
    await placeShips(players);
    players.push(createPlayer('cpu'));
    document.querySelector('#error').textContent = '';
    let startGame = document.createElement('button');
    startGame.id = 'startgame';
    startGame.classList.add('gamebtn');
    startGame.addEventListener('pointerdown', mainLoop);
    startGame.textContent = "Click here to start!";
    document.querySelector('.main').appendChild(startGame);
}

function displayGameButton() {
    let div = document.createElement('div');
    div.classList.add('initialDiv');
    document.querySelector('.main').appendChild(div);
    let button = document.createElement('button');
    button.id = 'placeShips';
    button.classList.add('gamebtn');
    button.addEventListener('pointerdown', initializeGame);
    button.textContent = "Start Placing your Ships!";
    div.appendChild(button);
}

window.addEventListener('load', displayGameButton);
