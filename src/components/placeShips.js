import { shipNames } from './lengthsToNames';
import { displayInstructions } from './displayInstructions';

let mouseposition;

function allowShipPlacement(length, players) {
    return new Promise((resolve) => {
        const boardCells = document.getElementsByClassName('boardSpace');
        let orientation = 0;
        const getAffectedSquares = (x, y) => {
            const cells = [];
            let coords = players[0].gameBoard.generateSpaces(orientation, length, x, y);
            for (let i = 0; i < coords.length; i++) {
                let xi = coords[i][0];
                let yi = coords[i][1];
                let thisCell = document.querySelector(`[data-row="${xi}"][data-col="${yi}"]`);
                cells.push(thisCell);
            }
            return cells;
        };

        const updateShipDisplay = () => {
            let thisCell = document.elementFromPoint(mouseposition[0], mouseposition[1]);
            if (!thisCell.classList.contains('boardSpace')) {
                return;
            }
            let x = Number(thisCell.getAttribute('data-row'));
            let y = Number(thisCell.getAttribute('data-col'));
            let cells = getAffectedSquares(x, y);
            cells.forEach((cell) => {
                if (cell !== null && cell.classList.contains('ghost')) {
                    cell.classList.remove('ghost');
                } else if (cell !== null && !cell.classList.contains('ghost')) {
                    cell.classList.add('ghost');
                }
            });
        };

        const rotateShip = (event) => {
            if (event.keyCode !== 32) {
                return false;
            }
            updateShipDisplay();
            if (orientation === 1) {
                orientation = 0;
            } else { orientation = 1; }
            updateShipDisplay();
            return true;
        };

        const lightSquare = (event) => {
            let x = event.target.getAttribute('data-row');
            let y = event.target.getAttribute('data-col');
            const cells = getAffectedSquares(Number(x), Number(y));
            cells.forEach((cell) => {
                if (cell !== null) { cell.classList.add('ghost'); }
            });
        };
        const unlightSquare = (event) => {
            let x = event.target.getAttribute('data-row');
            let y = event.target.getAttribute('data-col');
            const cells = getAffectedSquares(Number(x), Number(y));
            cells.forEach((cell) => {
                if (cell !== null) { cell.classList.remove('ghost'); }
            });
        };

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
                cell.removeEventListener('mouseenter', lightSquare);
                cell.removeEventListener('mouseleave', unlightSquare);
            });
            window.removeEventListener('keydown', rotateShip);
            resolve(res);
            return res;
        };

        window.addEventListener('keydown', rotateShip);

        Array.from(boardCells).forEach((cell) => {
            cell.addEventListener('click', reportCellCoordinate);
            cell.addEventListener('mouseenter', lightSquare);
            cell.addEventListener('mouseleave', unlightSquare);
        });
    });
}

async function placeShips(players) {
    let shipLengths = [5, 4, 3, 3, 2];
    for (let i = 0; i < shipLengths.length; i++) {
        /* eslint-disable no-await-in-loop */
        displayInstructions(`Place your ${shipNames[i]}!`);
        await allowShipPlacement(shipLengths[i], players);
        document.querySelector('#error').textContent = ``;
    }
    /* eslint-enable no-await-in-loop */
    displayInstructions('Press the button to start!');
}

window.addEventListener('mousemove', (e) => {
    mouseposition = [e.clientX, e.clientY];
});

export { placeShips };
