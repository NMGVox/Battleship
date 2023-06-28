import { createPlayer } from './components/game_objects';
import './style.css';

let players = [];
//  let activePlayer = null;

function allowShipPlacement(length) {
    return new Promise((resolve) => {
        const boardCells = document.getElementsByClassName('boardSpace');
        let orientation = 0;
        const reportCellCoordinate = (event) => {
            let space = event.target;
            let coords = [];
            coords.push(space.getAttribute('data-row'));
            coords.push(space.getAttribute('data-col'));
            let res = players[0].gameBoard.placeShip(length, coords, orientation);
            if (!res) {
                return res;
            }
            Array.from(boardCells).forEach((cell) => {
                cell.removeEventListener('click', reportCellCoordinate);
            });
            resolve(res);
            return res;
        };

        const rotateShip = (event) => {
            if (!event.keyCode === 32) {
                return false;
            }
            if (orientation === 1) {
                orientation = 0;
            } else { orientation = 1; }
            return true;
        };

        window.addEventListener('keydown', rotateShip);

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
