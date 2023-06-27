import { createPlayer } from './components/game_objects';
import './style.css';

let players = [];
//  let activePlayer = null;

function allowShipPlacement(length) {
    return new Promise((resolve) => {
        const boardCells = document.getElementsByClassName('boardSpace');
        const reportCellCoordinate = (event) => {
            let space = event.target;
            let coords = [];
            coords.push(space.getAttribute('data-row'));
            coords.push(space.getAttribute('data-col'));
            let res = players[0].gameBoard.placeShip(length, coords);
            if (!res) {
                return res;
            }
            Array.from(boardCells).forEach((cell) => {
                cell.removeEventListener('click', reportCellCoordinate);
            });
            resolve(res);
            return res;
        };

        Array.from(boardCells).forEach((cell) => {
            cell.addEventListener('click', reportCellCoordinate);
        });
    });
}

async function placeShips() {
    let shipLengths = [5, 4, 3, 3, 2];
    for (let i = 0; i < shipLengths.length; i++) {
        /* eslint-disable no-await-in-loop */
        let placement = await allowShipPlacement(shipLengths[i]);
        console.log(placement);
    }
    /* eslint-enable no-await-in-loop */
}

window.addEventListener('load', () => {
    players.push(createPlayer('hum'));
    players[0].gameBoard.displayBoard();
    placeShips();
});
