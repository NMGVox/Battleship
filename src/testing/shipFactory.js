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

module.exports = shipFactory;