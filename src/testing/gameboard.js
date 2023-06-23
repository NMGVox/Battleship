
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
        gameBoard.ships.push(newShip);
        return true;
    }

    function receiveAttack(coord) {
        let x = coord[0];
        let y = coord[1];
        let attackedSpace = gameBoard.spaces[x][y];

        if( attackedSpace === 'x' ) {
            return false;
        }
        if( gameBoard.ships.includes(attackedSpace) ) {
            attackedSpace.isHit();
            gameBoard.spaces[x][y] = 'o';
            return;
        }
        gameBoard.spaces[x][y] = 'x';
        return;
    }

    function allShipsSunk() {
        return gameBoard.ships.every(
            (ship) => ship.sunk === true
        );
    }

    const gameBoard = 
    {
        ships, 
        spaces,
        placeShip,
        receiveAttack,
        allShipsSunk
    };

    return gameBoard;
}

function createPlayer(type) {
    const gameBoard = gameBoardFactory();

    if(type === 'cpu') {
        let lengths = [5,4,3,3,2];
        for(let i = 0; i < lengths.length; i++) {
            let x = Math.floor(Math.random() * 8);
            let y = Math.floor(Math.random() * 8);
            let res = gameBoard.placeShip(lengths[i], [x, y]);
            if(!res) {
                i--;
                continue;
            }
        }
    }
    
    const player = {
        type,
        gameBoard
    };
    return player;
}

module.exports = {
    gameBoardFactory,
    createPlayer
};