function shipFactory(len) {
    const length = len;
    const hits = 0;
    let ship;
    let orientation = 0;

    function isSunk() {
        if (ship.hits === ship.length) {
            ship.sunk = true;
        }
    }

    function isHit() {
        ship.hits++;
        isSunk();
    }

    function changeOrientation() {
        if (orientation === 0) {
            orientation = 1;
        } else {
            orientation = 0;
        }
    }

    ship = {
        length,
        hits,
        sunk: false,
        isHit,
        isSunk,
        changeOrientation,
        getOrientation: () => orientation,
    };

    return ship;
}

function gameBoardFactory() {
    const ships = [];
    const spaces = [...Array(10)].map(() => Array(10));
    const spaceElements = [...Array(10)].map(() => Array(10));
    let gameBoard;

    function noShipsLeft() {
        const allSunk = ships.every(
            (ship) => (ship.isSunk === true),
        );
        return allSunk;
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
                spaceElements[x][y] = newSpace;
            }
        }
        document.querySelector('body').appendChild(boardArea);
    }

    function generateSpaces(orientation, len, x, y) {
        let occupied = [];
        if (orientation === 0) {
            for (let i = 0; i < len; i++) {
                occupied.push([x, y + i]);
            }
        } else {
            for (let i = 0; i < len; i++) {
                occupied.push([x + i, y]);
            }
        }
        return occupied;
    }

    function isValidPlacement(shipOccupancy) {
        for (let i = 0; i < shipOccupancy.length; i++) {
            let x = shipOccupancy[i][0];
            let y = shipOccupancy[i][1];
            if (!((x < 10 && x >= 0) && (y < 10 && y >= 0))) {
                document.querySelector('#error').textContent = `Can't place here!`;
                return false;
            }
            if (gameBoard.spaces[x][y] !== undefined) {
                document.querySelector('#error').textContent = `Can't place here!`;
                return false;
            }
        }
        return true;
    }

    function placeShip(len, coord, orientation) {
        const newShip = shipFactory(len);
        const shipOccupancy = generateSpaces(orientation, len, Number(coord[0]), Number(coord[1]));
        if (!isValidPlacement(shipOccupancy)) {
            return false;
        }
        for (let i = 0; i < len; i++) {
            let x = shipOccupancy[i][0];
            let y = shipOccupancy[i][1];
            gameBoard.spaces[x][y] = newShip;
            let targetSpace = spaceElements[x][y];
            targetSpace.classList.remove('ghost');
            targetSpace.classList.add('carrier');
        }
        gameBoard.ships.push(newShip);
        return true;
    }

    function allShipsSunk() {
        return gameBoard.ships.every(
            (ship) => ship.sunk === true,
        );
    }

    function isAttackOutOfBounds(x, y) {
        if (!((x < 10 && x >= 0) && (y < 10 && y >= 0))) {
            return true;
        }
        return false;
    }

    function receiveAttack(coord) {
        const x = coord[0];
        const y = coord[1];

        if (isAttackOutOfBounds(x, y)) {
            return [false, null];
        }

        const attackedSpace = gameBoard.spaces[x][y];

        if (attackedSpace === 'x') {
            return [false, null];
        }
        if (gameBoard.ships.includes(attackedSpace)) {
            attackedSpace.isHit();
            gameBoard.spaceElements[x][y].style.backgroundColor = 'blue';
            return [true, 'ship'];
        } if (gameBoard.spaces[x][y] === undefined) {
            gameBoard.spaces[x][y] = 'x';
            gameBoard.spaceElements[x][y].style.backgroundColor = 'red';
            return [true, 'empty'];
        }
        return [false, null];
    }

    gameBoard = {
        ships,
        spaces,
        placeShip,
        receiveAttack,
        allShipsSunk,
        displayBoard,
        generateSpaces,
        spaceElements,
    };

    return gameBoard;
}

function createPlayer(type) {
    const gameBoard = gameBoardFactory();
    const moveStack = [];
    let lastMove;

    if (type === 'cpu') {
        gameBoard.displayBoard();
        const lengths = [5, 4, 3, 3, 2];
        for (let i = 0; i < lengths.length; i++) {
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            const o = Math.floor(Math.random() * 2);
            const res = gameBoard.placeShip(lengths[i], [x, y], o);
            if (!res) {
                i--;
            }
        }
    }

    const player = {
        type,
        gameBoard,
        moveStack,
        lastMove,
    };
    return player;
}

export { createPlayer };
