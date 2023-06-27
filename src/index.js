import { createPlayer } from './game_objects';

window.addEventListener('load', () => {
    let playerOne = createPlayer('hum');
    console.log(playerOne);
});
