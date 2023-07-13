function showHowTo() {
    let container = document.querySelector('.tutContainer');
    container.classList.add('show');
}

function closeHowTo() {
    let container = document.querySelector('.tutContainer');
    container.classList.remove('show');
}

function addDiv(sectionHeader, text) {
    let newDiv = document.createElement('div');
    let title = document.createElement('h1');
    let sectionText = document.createElement('p');
    title.textContent = sectionHeader;
    sectionText.textContent = text;

    newDiv.classList.add('sectionDiv');
    title.classList.add('sectionTitle');
    sectionText.classList.add('sectionText');

    newDiv.appendChild(title);
    newDiv.appendChild(sectionText);

    return newDiv;
}

function buildHowTo() {
    let tutorialContainer = document.createElement('div');
    let closebutton = document.createElement('div');
    closebutton.id = 'closeHowTo';
    closebutton.textContent = '✕';
    closebutton.addEventListener('pointerdown', closeHowTo);
    tutorialContainer.appendChild(closebutton);
    let title = document.createElement('h1');
    tutorialContainer.classList.add("tutContainer");
    title.textContent = "How to Play!";
    title.classList.add('tutHeader');
    tutorialContainer.appendChild(title);

    tutorialContainer.appendChild(addDiv('Placing Ships', `Ships can be placed on the board by left clicking a cell. 
    You may rotate your current ship by pressing spacebar. You have 5 ships to place on the board. A carrier (5 spaces), 
    a battleship (4 spaces), a submarine (3 spaces), a cruiser, and a destroyer (2 spaces). Once all ships are placed, you may
    begin.`));

    tutorialContainer.appendChild(addDiv('Playing', `Click a cell on the opponents board to launch an attack. If you hit a  ship, the cell will
    turn (blue). If you miss, the cell will turn red. Sink all of the opponent's ships to win the game!`));

    document.querySelector('body').appendChild(tutorialContainer);
}

document.querySelector('#howTo').addEventListener('pointerdown', showHowTo);

export { buildHowTo };
