import { createPlayer } from './components/game_objects';
import { placeShips } from './components/placeShips';
import './style.css';

let players = [];
//  let activePlayer = null;

window.addEventListener('load', () => {
    players.push(createPlayer('hum'));
    players[0].gameBoard.displayBoard();
    placeShips(players);
});
