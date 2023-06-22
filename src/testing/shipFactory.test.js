const shipFactory = require('./shipFactory');

test('Returns object with len 5', () => {
    expect(shipFactory(5)).toMatchObject({'length' : 5});
});

test('Returns object with len 5, hits 0, sunk = false', () => {
    expect(shipFactory(5)).toMatchObject({'length' : 5, 'hits': 0, 'sunk' : false})
});

test(`Test ship's hit function`, () => {
    let newShip = shipFactory(5);
    newShip.isHit();
    expect(newShip.hits).toEqual(1);
})

test('Test isSunk ship function', () => {
    let newShip = shipFactory(2);
    for(let i = 0; i < newShip.length; i++) {
        newShip.isHit();
    }
    expect(newShip.sunk).toEqual(true);
})
