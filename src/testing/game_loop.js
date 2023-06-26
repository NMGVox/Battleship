import { createPlayer } from '../game_objects';

let activePlayer;
let players = [];

window.addEventListener(load, () => {
    prompt('Enter Your name.');
    activePlayer = createPlayer('hum');
    players.push(activePlayer);

    players.push(createPlayer('cpu'));
    return;
});

