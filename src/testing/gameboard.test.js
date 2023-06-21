const gameBoardFactory = require('./gameboard');

test('Return an empty gameBoard', () => {
    expect(gameBoardFactory()).toMatchObject({'ships': [], 'spaces' : [...Array(8)].map(e => Array(8))});
});

test('Place a ship of length 1 at coordinate (2,5)', () => {
    let newBoard = gameBoardFactory();
    newBoard.placeShip(5, [2, 5]);
    expect(newBoard.spaces[2][5]).toMatchObject({'length': 5});
})

test('Horizontally place a ship of length 3 at coordinate (0,1)', () => {
    let newBoard = gameBoardFactory();
    newBoard.placeShip(3, [0, 1]);

    const expectedIndices = [ [0, 1], [0, 2], [0, 3] ];

    let shipPlacedCorrectly = expectedIndices.every(
        ([row, col]) => newBoard.spaces[row][col] != null
    );

    expect(shipPlacedCorrectly).toEqual(true);
})