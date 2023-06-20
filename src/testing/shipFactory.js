function shipFactory(len) {
    let length = len;
    let hits = 0;
    let sunk = false;

    let ship = 
    {
        'length' : length,
        'hits' : hits,
        'sunk' : false
    };

    return ship;
}

module.exports = shipFactory;