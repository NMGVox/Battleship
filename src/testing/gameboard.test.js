const modules = require('./gameboard');

const { gameBoardFactory } = modules;

test('Return an empty gameBoard', () => {
    expect(gameBoardFactory()).toMatchObject({ ships: [], spaces: [...Array(10)].map(() => Array(10)) });
});

test('Place a ship of length 1 at coordinate (2,5)', () => {
    let newBoard = gameBoardFactory();
    newBoard.placeShip(1, [2, 5]);
    expect(newBoard.spaces[2][5]).toMatchObject({ length: 1 });
});

test('Horizontally place a ship of length 3 at coordinate (0,1)', () => {
    let newBoard = gameBoardFactory();
    newBoard.placeShip(3, [0, 1]);

    const expectedIndices = [[0, 1], [0, 2], [0, 3]];

    let shipPlacedCorrectly = expectedIndices.every(
        ([row, col]) => newBoard.spaces[row][col] != null,
    );

    expect(shipPlacedCorrectly).toEqual(true);
});

test('Horizontally place two ships. One at 0,1 and another at 0,0. This should be illegal (overlap).', () => {
    let newBoard = gameBoardFactory();
    newBoard.placeShip(3, [0, 1]);

    expect(newBoard.placeShip(3, [0, 0])).toEqual(null);
});

test('Horizontally place 3 ships of length 2 at non-overlapping coordinates', () => {
    let newBoard = gameBoardFactory();
    newBoard.placeShip(2, [0, 1]);
    newBoard.placeShip(2, [1, 1]);
    newBoard.placeShip(2, [2, 1]);

    const expectedIndices = [
      [0, 1], [0, 2],
      [1, 1], [1, 2],
      [2, 1], [2, 2],
    ];

    let shipPlacedCorrectly = expectedIndices.every(
        ([row, col]) => newBoard.spaces[row][col] != null,
    );

    expect(shipPlacedCorrectly).toEqual(true);
});

test('Successfully receive an attack at empty coordinate [0,0]', () => {
    let newBoard = gameBoardFactory();
    newBoard.placeShip(2, [0, 1]);
    newBoard.placeShip(2, [1, 1]);
    newBoard.placeShip(2, [2, 1]);

    newBoard.receiveAttack([0, 0]);

    expect(newBoard.spaces[0][0]).toEqual('x');
});

test('Successfully sink a ship', () => {
    let newBoard = gameBoardFactory();
    newBoard.placeShip(2, [0, 1]);
    newBoard.placeShip(2, [1, 1]);
    newBoard.placeShip(2, [2, 1]);

    newBoard.receiveAttack([0, 1]);
    newBoard.receiveAttack([0, 2]);

    expect(newBoard.ships[0].sunk).toEqual(true);
});

test('All ships sunk (1 ship)', () => {
    let newBoard = gameBoardFactory();
    newBoard.placeShip(2, [0, 1]);

    newBoard.receiveAttack([0, 1]);
    newBoard.receiveAttack([0, 2]);

    expect(newBoard.allShipsSunk()).toEqual(true);
});

test('All ships sunk (3 ship)', () => {
    let newBoard = gameBoardFactory();
    newBoard.placeShip(2, [0, 1]);
    newBoard.placeShip(2, [1, 1]);
    newBoard.placeShip(2, [2, 1]);

    newBoard.receiveAttack([0, 1]);
    newBoard.receiveAttack([0, 2]);

    newBoard.receiveAttack([0, 1]);
    newBoard.receiveAttack([0, 2]);
    newBoard.receiveAttack([1, 1]);
    newBoard.receiveAttack([1, 2]);
    newBoard.receiveAttack([2, 1]);
    newBoard.receiveAttack([2, 2]);

    expect(newBoard.allShipsSunk()).toEqual(true);
});
