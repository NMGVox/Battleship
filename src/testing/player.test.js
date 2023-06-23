const modules = require('./gameboard');
const createPlayer = modules.createPlayer;
const gameBoardFactory = modules.gameBoardFactory;

test('Create a player with type hum', () => {
    let newPlayer = createPlayer('hum');
    expect(newPlayer.type).toEqual('hum');
});

test('Create a player with type hum and an empty gameBoard object', () => {
    let newPlayer = createPlayer('hum');
    expect(newPlayer.gameBoard).toMatchObject({'ships': [], 'spaces': [...Array(8)].map(e => Array(8))});
});

// test('Create a player with type cpu and an empty gameBoard object', () => {
//     let newPlayer = createPlayer('cpu');
//     expect(newPlayer.gameBoard).toMatchObject({'spaces': [...Array(8)].map(e => Array(8))});
// }); PASSED 

// test('Create a player with type cpu and 1 correctly placed ship of length 5', () => {
//     let newPlayer = createPlayer('cpu');
//     expect(newPlayer.gameBoard.ships.length).toEqual(1);
// }); PASSED 

test('Create a player with type cpu and 4 correctly placed ship of descending length', () => {
    let newPlayer = createPlayer('cpu');
    expect(newPlayer.gameBoard.ships.length).toEqual(5);
});

test('Create a player with type human and 1 correctly placed ship of length 5', () => {
    let newPlayer = createPlayer('hum');
    newPlayer.gameBoard.placeShip(5, [2,2]);
    expect(newPlayer.gameBoard.ships.length).toEqual(1);
});

test('Create a player with type human and attempt to place 2 overlapping ships of legnths 2, and 3 respectively', () => {
    let newPlayer = createPlayer('hum');
    newPlayer.gameBoard.placeShip(2, [2,2]);
    newPlayer.gameBoard.placeShip(3, [2,1]);
    expect(newPlayer.gameBoard.ships.length).toEqual(1);
});

test('Create a player with type human and place 2 non-overlapping ships of legnths 2, and 3 respectively', () => {
    let newPlayer = createPlayer('hum');
    newPlayer.gameBoard.placeShip(2, [2,2]);
    newPlayer.gameBoard.placeShip(3, [2,4]);
    expect(newPlayer.gameBoard.ships.length).toEqual(2);
});

test('Create a player with type human and place 5 non-overlapping ships of corresponding lengths', () => {
    let newPlayer = createPlayer('hum');
    newPlayer.gameBoard.placeShip(2, [2,2]);
    newPlayer.gameBoard.placeShip(3, [1,4]);
    newPlayer.gameBoard.placeShip(3, [3,4]);
    newPlayer.gameBoard.placeShip(4, [1,0]);
    newPlayer.gameBoard.placeShip(5, [6,3]);
    expect(newPlayer.gameBoard.ships.length).toEqual(5);
});