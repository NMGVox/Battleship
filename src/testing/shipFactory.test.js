const modules = require('./gameboard');

const { shipFactory } = modules;

test('Returns object with len 5', () => {
    expect(shipFactory(5)).toMatchObject({ length: 5 });
});

test('Returns object with len 5, hits 0, sunk = false', () => {
    expect(shipFactory(5)).toMatchObject({ length: 5, hits: 0, sunk: false });
});

test(`Test ship's hit function`, () => {
    let newShip = shipFactory(5);
    newShip.isHit();
    expect(newShip.hits).toEqual(1);
});

test('Test isSunk ship function', () => {
    let newShip = shipFactory(2);
    for (let i = 0; i < newShip.length; i++) {
        newShip.isHit();
    }
    expect(newShip.sunk).toEqual(true);
});

test('Test new orientation property.', () => {
    let newShip = shipFactory(3);
    expect(newShip.getOrientation()).toBe(0);
});

test('Switch orientation to 1', () => {
    let newShip = shipFactory(4);
    newShip.changeOrientation();
    expect(newShip.getOrientation()).toBe(1);
});

test('Switch orientation to 1, the back to 0', () => {
    let newShip = shipFactory(4);
    newShip.changeOrientation();
    newShip.changeOrientation();
    expect(newShip.getOrientation()).toBe(0);
});
