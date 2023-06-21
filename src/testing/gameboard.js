
function shipFactory(len) {
    let length = len;
    let hits = 0;
    let sunk = false;

    function isHit() {
        ship.hits++;
        isSunk();
        return;
    }

    function isSunk() {
        if ( ship.hits === ship.length ) {
            ship.sunk = true;
        }
        return;
    }

    let ship = 
    {
        'length' : length,
        'hits' : hits,
        'sunk' : false,
        isHit,
        isSunk
    };

    return ship;
}

function gameBoardFactory() {
    let ships = [];
    let spaces = [...Array(8)].map(e => Array(8));

    function placeShip(len, coord) {
        let newShip = shipFactory(len)
        for (let i = 0; i < len; i++) {
            gameBoard.spaces[coord[0]][coord[1]+i] = newShip;
        }
        return;
    }

    const gameBoard = 
    {
        ships, 
        spaces,
        placeShip
    }

    return gameBoard;
}

module.exports = gameBoardFactory;