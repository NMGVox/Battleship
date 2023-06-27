function shipFactory(len) {
    const length = len;
    const hits = 0;
    let ship;

    function isSunk() {
        if (ship.hits === ship.length) {
            ship.sunk = true;
        }
    }

    function isHit() {
        ship.hits++;
        isSunk();
    }

    ship = {
        length,
        hits,
        sunk: false,
        isHit,
        isSunk,
    };

    return ship;
}

function gameBoardFactory() {
    const ships = [];
    const spaces = [...Array(10)].map(() => Array(10));
    let gameBoard;

    function isValidPlacement(len, coord) {
        for (let i = 0; i < len; i++) {
            const x = Number(coord[0]);
            const y = Number(coord[1]) + i;
            console.log(`${x} and ${y}`);
             if (gameBoard.spaces[x][y] !== undefined) {
                return false;
            }
            if (!((x < 10 && x >= 0) && (y < 10 && y >= 0))) {
                return false;
            }
        }
        return true;
    }

    function displayBoard() {
        let boardArea = document.createElement('div');
        boardArea.classList.add('boardArea');
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                let newSpace = document.createElement('div');
                newSpace.classList.add('boardSpace');
                newSpace.setAttribute('data-row', x);
                newSpace.setAttribute('data-col', y);
                boardArea.appendChild(newSpace);
            }
        }
        document.querySelector('body').appendChild(boardArea);
    }

    function placeShip(len, coord) {
        const newShip = shipFactory(len);
        if (!isValidPlacement(len, coord)) {
            console.log(`uh-oh ${len}`);
            return false;
        }
        for (let i = 0; i < len; i++) {
            gameBoard.spaces[coord[0]][coord[1] + i] = newShip;
        }
        gameBoard.ships.push(newShip);
        return true;
    }

    function receiveAttack(coord) {
        const x = coord[0];
        const y = coord[1];
        const attackedSpace = gameBoard.spaces[x][y];

        if (attackedSpace === 'x') {
            return false;
        }
        if (gameBoard.ships.includes(attackedSpace)) {
            attackedSpace.isHit();
            gameBoard.spaces[x][y] = 'o';
            return true;
        }
        gameBoard.spaces[x][y] = 'x';
        return true;
    }

    function allShipsSunk() {
        return gameBoard.ships.every(
            (ship) => ship.sunk === true,
        );
    }

    gameBoard = {
        ships,
        spaces,
        placeShip,
        receiveAttack,
        allShipsSunk,
        displayBoard,
    };

    return gameBoard;
}

function createPlayer(type) {
    const gameBoard = gameBoardFactory();

    if (type === 'cpu') {
        const lengths = [5, 4, 3, 3, 2];
        for (let i = 0; i < lengths.length; i++) {
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            const res = gameBoard.placeShip(lengths[i], [x, y]);
            if (!res) {
                i--;
            }
        }
    }

    const player = {
        type,
        gameBoard,
    };
    return player;
}

export { createPlayer };