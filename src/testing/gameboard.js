
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

    function _isValidPlacement(len, coord) {
        for(let i = 0; i < len; i++) {
            let x = coord[0];
            let y = coord[1] + i;
             if( gameBoard.spaces[x][y] !== undefined ) {
                return false;
            } else if ( !((x < 8 && x >= 0) && (y < 8 && y >= 0)) ) {
                return false;
            }
        }
        return true;
    }

    function placeShip(len, coord) {
        let newShip = shipFactory(len)
        if( !_isValidPlacement(len, coord)) {
            return null;
        }
        for (let i = 0; i < len; i++) {
            gameBoard.spaces[coord[0]][coord[1]+i] = newShip;
        }
        return;
    } //  I need to validate the spaces. Check if every space in len's range has a ship or is in bounds.
    //  Do not worry about rotation at this juncture.

    const gameBoard = 
    {
        ships, 
        spaces,
        placeShip
    }

    return gameBoard;
}

module.exports = gameBoardFactory;