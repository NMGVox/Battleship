/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/displayInstructions.js":
/*!***********************************************!*\
  !*** ./src/components/displayInstructions.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayInstructions: () => (/* binding */ displayInstructions)
/* harmony export */ });
function displayInstructions(msg) {
  document.querySelector('#instructions').textContent = msg;
}


/***/ }),

/***/ "./src/components/game_objects.js":
/*!****************************************!*\
  !*** ./src/components/game_objects.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPlayer: () => (/* binding */ createPlayer)
/* harmony export */ });
function shipFactory(len) {
  const length = len;
  const hits = 0;
  let ship;
  let orientation = 0;
  function isSunk() {
    if (ship.hits === ship.length) {
      ship.sunk = true;
    }
  }
  function isHit() {
    ship.hits++;
    isSunk();
  }
  function changeOrientation() {
    if (orientation === 0) {
      orientation = 1;
    } else {
      orientation = 0;
    }
  }
  ship = {
    length,
    hits,
    sunk: false,
    isHit,
    isSunk,
    changeOrientation,
    getOrientation: () => orientation
  };
  return ship;
}
function gameBoardFactory() {
  const ships = [];
  const spaces = [...Array(10)].map(() => Array(10));
  const spaceElements = [...Array(10)].map(() => Array(10));
  let playArea;
  let gameBoard;
  function displayBoard() {
    let playerArea = document.createElement('div');
    playerArea.classList.add('playerArea');
    gameBoard.playArea = playerArea;
    let boardArea = document.createElement('div');
    boardArea.classList.add('boardArea');
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        let newSpace = document.createElement('div');
        newSpace.classList.add('boardSpace');
        newSpace.setAttribute('data-row', x);
        newSpace.setAttribute('data-col', y);
        boardArea.appendChild(newSpace);
        spaceElements[x][y] = newSpace;
      }
    }
    playerArea.appendChild(boardArea);
    document.querySelector('.gameArea').appendChild(playerArea);
  }
  function generateSpaces(orientation, len, x, y) {
    let occupied = [];
    if (orientation === 0) {
      for (let i = 0; i < len; i++) {
        occupied.push([x, y + i]);
      }
    } else {
      for (let i = 0; i < len; i++) {
        occupied.push([x + i, y]);
      }
    }
    return occupied;
  }
  function isValidPlacement(shipOccupancy) {
    for (let i = 0; i < shipOccupancy.length; i++) {
      let x = shipOccupancy[i][0];
      let y = shipOccupancy[i][1];
      if (!(x < 10 && x >= 0 && y < 10 && y >= 0)) {
        document.querySelector('#error').textContent = `Can't place here!`;
        return false;
      }
      if (gameBoard.spaces[x][y] !== undefined) {
        document.querySelector('#error').textContent = `Can't place here!`;
        return false;
      }
    }
    return true;
  }
  function placeShip(len, coord, orientation) {
    const newShip = shipFactory(len);
    const shipOccupancy = generateSpaces(orientation, len, Number(coord[0]), Number(coord[1]));
    if (!isValidPlacement(shipOccupancy)) {
      return false;
    }
    for (let i = 0; i < len; i++) {
      let x = shipOccupancy[i][0];
      let y = shipOccupancy[i][1];
      gameBoard.spaces[x][y] = newShip;
      let targetSpace = spaceElements[x][y];
      targetSpace.classList.remove('ghost');
      targetSpace.classList.add('carrier');
    }
    gameBoard.ships.push(newShip);
    return true;
  }
  function allShipsSunk() {
    return gameBoard.ships.every(ship => ship.sunk === true);
  }
  function isAttackOutOfBounds(x, y) {
    if (!(x < 10 && x >= 0 && y < 10 && y >= 0)) {
      return true;
    }
    return false;
  }
  function receiveAttack(coord) {
    const x = coord[0];
    const y = coord[1];
    if (isAttackOutOfBounds(x, y)) {
      return [false, null];
    }
    gameBoard.spaceElements[x][y].classList.remove('hide');
    const attackedSpace = gameBoard.spaces[x][y];
    if (attackedSpace === 'x') {
      return [false, null];
    }
    if (gameBoard.ships.includes(attackedSpace)) {
      attackedSpace.isHit();
      gameBoard.spaceElements[x][y].style.backgroundColor = 'blue';
      return [true, 'ship'];
    }
    if (gameBoard.spaces[x][y] === undefined) {
      gameBoard.spaces[x][y] = 'x';
      gameBoard.spaceElements[x][y].style.backgroundColor = 'red';
      return [true, 'empty'];
    }
    return [false, null];
  }
  gameBoard = {
    ships,
    spaces,
    placeShip,
    receiveAttack,
    allShipsSunk,
    displayBoard,
    generateSpaces,
    spaceElements,
    playArea
  };
  return gameBoard;
}
function createPlayer(type) {
  const gameBoard = gameBoardFactory();
  const moveStack = [];
  let lastMove;
  if (type === 'cpu') {
    gameBoard.displayBoard();
    const lengths = [5, 4, 3, 3, 2];
    for (let i = 0; i < lengths.length; i++) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const o = Math.floor(Math.random() * 2);
      const res = gameBoard.placeShip(lengths[i], [x, y], o);
      if (!res) {
        i--;
      }
    }
    gameBoard.spaceElements.forEach(elerow => {
      elerow.forEach(ele => {
        ele.classList.add('hide');
      });
    });
  }
  const player = {
    type,
    gameBoard,
    moveStack,
    lastMove
  };
  return player;
}


/***/ }),

/***/ "./src/components/howToPlay.js":
/*!*************************************!*\
  !*** ./src/components/howToPlay.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildHowTo: () => (/* binding */ buildHowTo)
/* harmony export */ });
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


/***/ }),

/***/ "./src/components/lengthsToNames.js":
/*!******************************************!*\
  !*** ./src/components/lengthsToNames.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   shipNames: () => (/* binding */ shipNames)
/* harmony export */ });
const shipNames = ['carrier', 'battleship', 'submarine', 'cruiser', 'destroyer'];


/***/ }),

/***/ "./src/components/placeShips.js":
/*!**************************************!*\
  !*** ./src/components/placeShips.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   placeShips: () => (/* binding */ placeShips)
/* harmony export */ });
/* harmony import */ var _lengthsToNames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lengthsToNames */ "./src/components/lengthsToNames.js");
/* harmony import */ var _displayInstructions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./displayInstructions */ "./src/components/displayInstructions.js");


let mouseposition;
function allowShipPlacement(length, players) {
  return new Promise(resolve => {
    const boardCells = document.getElementsByClassName('boardSpace');
    let orientation = 0;
    const getAffectedSquares = (x, y) => {
      const cells = [];
      let coords = players[0].gameBoard.generateSpaces(orientation, length, x, y);
      for (let i = 0; i < coords.length; i++) {
        let xi = coords[i][0];
        let yi = coords[i][1];
        let thisCell = document.querySelector(`[data-row="${xi}"][data-col="${yi}"]`);
        cells.push(thisCell);
      }
      return cells;
    };
    const updateShipDisplay = () => {
      let thisCell = document.elementFromPoint(mouseposition[0], mouseposition[1]);
      if (!thisCell.classList.contains('boardSpace')) {
        return;
      }
      let x = Number(thisCell.getAttribute('data-row'));
      let y = Number(thisCell.getAttribute('data-col'));
      let cells = getAffectedSquares(x, y);
      cells.forEach(cell => {
        if (cell !== null && cell.classList.contains('ghost')) {
          cell.classList.remove('ghost');
        } else if (cell !== null && !cell.classList.contains('ghost')) {
          cell.classList.add('ghost');
        }
      });
    };
    const rotateShip = event => {
      if (event.keyCode !== 32) {
        return false;
      }
      updateShipDisplay();
      if (orientation === 1) {
        orientation = 0;
      } else {
        orientation = 1;
      }
      updateShipDisplay();
      return true;
    };
    const lightSquare = event => {
      let x = event.target.getAttribute('data-row');
      let y = event.target.getAttribute('data-col');
      const cells = getAffectedSquares(Number(x), Number(y));
      cells.forEach(cell => {
        if (cell !== null) {
          cell.classList.add('ghost');
        }
      });
    };
    const unlightSquare = event => {
      let x = event.target.getAttribute('data-row');
      let y = event.target.getAttribute('data-col');
      const cells = getAffectedSquares(Number(x), Number(y));
      cells.forEach(cell => {
        if (cell !== null) {
          cell.classList.remove('ghost');
        }
      });
    };
    const reportCellCoordinate = event => {
      let space = event.target;
      let coords = [];
      coords.push(space.getAttribute('data-row'));
      coords.push(space.getAttribute('data-col'));
      let res = players[0].gameBoard.placeShip(length, coords, orientation);
      if (!res) {
        return res;
      }
      Array.from(boardCells).forEach(cell => {
        cell.removeEventListener('click', reportCellCoordinate);
        cell.removeEventListener('mouseenter', lightSquare);
        cell.removeEventListener('mouseleave', unlightSquare);
      });
      window.removeEventListener('keydown', rotateShip);
      resolve(res);
      return res;
    };
    window.addEventListener('keydown', rotateShip);
    Array.from(boardCells).forEach(cell => {
      cell.addEventListener('click', reportCellCoordinate);
      cell.addEventListener('mouseenter', lightSquare);
      cell.addEventListener('mouseleave', unlightSquare);
    });
  });
}
async function placeShips(players) {
  let shipLengths = [5, 4, 3, 3, 2];
  for (let i = 0; i < shipLengths.length; i++) {
    /* eslint-disable no-await-in-loop */
    (0,_displayInstructions__WEBPACK_IMPORTED_MODULE_1__.displayInstructions)(`Place your ${_lengthsToNames__WEBPACK_IMPORTED_MODULE_0__.shipNames[i]}!`);
    await allowShipPlacement(shipLengths[i], players);
    document.querySelector('#error').textContent = ``;
  }
  /* eslint-enable no-await-in-loop */
  (0,_displayInstructions__WEBPACK_IMPORTED_MODULE_1__.displayInstructions)('Press the button to start!');
}
window.addEventListener('mousemove', e => {
  mouseposition = [e.clientX, e.clientY];
});


/***/ }),

/***/ "./src/components/playerInput.js":
/*!***************************************!*\
  !*** ./src/components/playerInput.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   playerInput: () => (/* binding */ playerInput)
/* harmony export */ });
/* eslint-disable no-constant-condition */
function playerInput(activePlayer, inactive) {
  return new Promise(resolve => {
    let disableBoardControl = () => {};
    const registerAttack = e => {
      let cell = e.target;
      let x = Number(cell.getAttribute('data-row'));
      let y = Number(cell.getAttribute('data-col'));
      let res = inactive.gameBoard.receiveAttack([x, y]);
      if (!res[0]) {
        return false;
      }
      disableBoardControl(inactive);
      resolve(res);
      return res;
    };
    disableBoardControl = p => {
      p.gameBoard.spaceElements.forEach(row => {
        for (let i = 0; i < row.length; i++) {
          row[i].removeEventListener('pointerdown', registerAttack);
        }
      });
    };
    const enableBoardControl = p => {
      p.gameBoard.spaceElements.forEach(row => {
        for (let i = 0; i < row.length; i++) {
          row[i].addEventListener('pointerdown', registerAttack);
        }
      });
    };
    const populateStack = (x, y, hitType, p) => {
      if (hitType === 'ship' && p.moveStack.length === 0) {
        // up, down, left, right
        p.moveStack.push('end');
        p.moveStack.push([x - 1, y]);
        p.moveStack.push([x + 1, y]);
        p.moveStack.push([x, y - 1]);
        p.moveStack.push([x, y + 1]);
      } else if (hitType === 'ship' && p.moveStack.length > 0) {
        let prev = p.lastMove;
        if (prev[0] > x) {
          p.moveStack.push([x - 1, y]);
        } else if (prev[0] < x) {
          p.moveStack.push([x + 1, y]);
        } else if (prev[1] > y) {
          p.moveStack.push([x, y - 1]);
        } else if (prev[1] < y) {
          p.moveStack.push([x, y + 1]);
        }
      }
    };
    const clearQueueIfShipSunk = (x, y) => {
      let space = inactive.gameBoard.spaces[x][y];
      if (typeof space === 'object' && space.sunk) {
        while (activePlayer.moveStack.length > 0) {
          activePlayer.moveStack.pop();
        }
      }
    };
    const getCPUCoordinates = () => {
      let x;
      let y;
      if (activePlayer.moveStack.length > 0) {
        let nextMove = activePlayer.moveStack.pop();
        [x, y] = nextMove;
      } else {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      }
      return [x, y];
    };
    if (activePlayer.type === 'cpu') {
      while (true) {
        let [x, y] = getCPUCoordinates();
        let res = inactive.gameBoard.receiveAttack([x, y]);
        if (res[0]) {
          populateStack(x, y, res[1], activePlayer);
          activePlayer.lastMove = [x, y];
          clearQueueIfShipSunk(x, y);
          break;
        }
      }
      disableBoardControl(inactive);
      resolve(true);
      return;
    }
    enableBoardControl(inactive);
  });
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./font/IronManOfWar2Ncv-E85l.ttf */ "./src/font/IronManOfWar2Ncv-E85l.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./font/DidactGothic-Regular.ttf */ "./src/font/DidactGothic-Regular.ttf"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `
@font-face {
	font-family: 'ironman';
	src: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
}

@font-face {
	font-family: 'didact-gothic';
	src: url(${___CSS_LOADER_URL_REPLACEMENT_1___});
}
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

body {
    display: grid;
    justify-content: center;
    align-items: center;
    height:100vh;
	background-color: #bbbbbb;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr 8fr .5fr;
	grid-column-gap: 0px;
	grid-row-gap: 5px;
	position:relative;
}

.header {
	display: flex;
	align-items: center;
	height:100%;
}

.heading-tabs {
	display:flex;
	align-items: center;
	justify-content: flex-end;
	margin-left: auto;
	gap: 10px;
	margin-right: 16px;
	height:90%;
}

.heading-tabs li {
	height:50%;
	background-color: rgb(145, 173, 211);
	border-style: solid;
	border-width: 2px;
	border-color: rgba(23, 68, 133, 0.178);
	border-radius: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: 'didact-gothic', sans-serif;
	padding: 0px 12px;
	color: whitesmoke;
	font-weight: 700;
	transition: all 1s ease-in;
}

.heading-tabs li:hover {
	cursor: pointer;
	background-color: #1a4a75;
}

.main {
	display:flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 2vh;
	height: 100%;
}

button {
	font-family: 'didact-gothic', sans-serif;
}

.initialDiv {
	height: 50vh;
	width: 60vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 33px;
	gap: 1rem;
	border: 8px solid #002546a8;
	background: linear-gradient(145deg, #163e62, #1a4a75);
	box-shadow:  16px 16px 19px #164065,
             -16px -16px 19px #1a4a75;
}

#error,
#instructions {
	font-family: 'ironman', sans-serif;
	letter-spacing: 2px;
}

.title {
	font-family: 'ironman', sans-serif;
	font-size: 6rem;
	letter-spacing: 10px;
	-webkit-text-stroke-color: #002647;
	-webkit-text-stroke-width: 2px;
	color: #bdbdbd; 
}

.gameArea {
	width: 90vw;
	height: 90%;
	display:flex;
	justify-content: center;
	align-items: center;
	border:2px solid black;
}

.boardArea {
    width: clamp(150px, 30%, 40%);
    aspect-ratio: 1 / 1;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    border: 2px solid black;
	background-color: #265885;
}

.playerArea {
	display: flex;
	align-items: center;
	justify-content: center;
	height:100%;
	width:100%;
	transition: all 1.5s;
}

.playerArea:first-child {
	border-right: solid 2px black;
}

.playerArea.enlarge{
	width:80%;
}

.playerArea.smaller {
	width:20%;
}

.boardArea:hover {
	cursor: crosshair;
}

.boardSpace {
    border: 1px solid black;
	transition: all .5s;
}

.carrier {
	background-color: lightblue;
}

.ghost {
	background-color: grey;
}

#error {
	color:red;
	font-size: 2rem;
	height: 2rem;
}

#instructions {
	font-size: 3rem;
	font-weight: bold;
}

.hide {
	background-color: transparent;
}

.gamebtn{
	min-width: 130px;
	height: 20%;
	width: 25%;
	font-size: 1.4rem;
	color: #fff;
	padding: 5px 10px;
	font-weight: bold;
	cursor: pointer;
	transition: all 0.3s ease;
	position: relative;
	display: inline-block;
	outline: none;
	border-radius: 5px;
	border: 4px solid #b4cafa31;
	background: #1a4a75;
  }
  .gamebtn:hover {
	background: #fff;
	color: #1a4a75;
  }

.footer {
	height: 100%;
	background-color: #777777;
	width: 100vw;
	position:relative;
	z-index: 4;
}

.waves {
	position:absolute;
	top:65%;
	right:0;
	width:100vw;
}

.wavesvg {
	width:100vw;
}

.tutContainer {
	overflow: auto;
	height: 60vh;
	width: 20vw;
	background-color: #c9c9c9;
	border: 4px solid #164065;
	position: absolute;
	top: -80%;
	left: 40%;
	transition: all 2s ease-in-out;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem 0;
	box-sizing: border-box;
	border-radius: 1rem;
}

.tutContainer.show {
	top: 20%;
}

.tutHeader {
	font-family: 'ironman', sans-serif;
	font-size: 3rem;
	letter-spacing: 4px;
	text-align: center;
	-webkit-text-stroke-color: #0026477a;
	-webkit-text-stroke-width: 3px;
	width:100%;
	border-bottom: 2px solid #002647;
}

#closeHowTo {
	height: 16px;
	aspect-ratio: 1 / 1;
	background-color: rgba(255, 0, 0, 0);
	border: 2px solid black;
	position:absolute;
	top: 1%;
	right: 1%;
	display:flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-size: 12px;
	border-radius: 50%;
}

#closeHowTo:hover {
	cursor: pointer;
}

.sectionDiv {
	display: flex;
	width:100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 1rem 0;
	gap: .5rem;
	border-bottom: 2px solid black;
}

.sectionTitle {
	font-family: 'ironman', sans-serif;
	font-size: 2rem;
	letter-spacing: 3px;
	text-align: center;
	-webkit-text-stroke-color: #0026477a;
	-webkit-text-stroke-width: 2px;
	text-decoration: underline;
}

.sectionText {
	font-size: 1rem;
	width: 90%;
	font-family: 'didact-gothic', sans-serif;
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["\n@font-face {\n\tfont-family: 'ironman';\n\tsrc: url('./font/IronManOfWar2Ncv-E85l.ttf');\n}\n\n@font-face {\n\tfont-family: 'didact-gothic';\n\tsrc: url('./font/DidactGothic-Regular.ttf');\n}\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\nbody {\n    display: grid;\n    justify-content: center;\n    align-items: center;\n    height:100vh;\n\tbackground-color: #bbbbbb;\n\tdisplay: grid;\n\tgrid-template-columns: 1fr;\n\tgrid-template-rows: 1fr 8fr .5fr;\n\tgrid-column-gap: 0px;\n\tgrid-row-gap: 5px;\n\tposition:relative;\n}\n\n.header {\n\tdisplay: flex;\n\talign-items: center;\n\theight:100%;\n}\n\n.heading-tabs {\n\tdisplay:flex;\n\talign-items: center;\n\tjustify-content: flex-end;\n\tmargin-left: auto;\n\tgap: 10px;\n\tmargin-right: 16px;\n\theight:90%;\n}\n\n.heading-tabs li {\n\theight:50%;\n\tbackground-color: rgb(145, 173, 211);\n\tborder-style: solid;\n\tborder-width: 2px;\n\tborder-color: rgba(23, 68, 133, 0.178);\n\tborder-radius: 4px;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tfont-family: 'didact-gothic', sans-serif;\n\tpadding: 0px 12px;\n\tcolor: whitesmoke;\n\tfont-weight: 700;\n\ttransition: all 1s ease-in;\n}\n\n.heading-tabs li:hover {\n\tcursor: pointer;\n\tbackground-color: #1a4a75;\n}\n\n.main {\n\tdisplay:flex;\n\tjustify-content: center;\n\talign-items: center;\n\tflex-direction: column;\n\tgap: 2vh;\n\theight: 100%;\n}\n\nbutton {\n\tfont-family: 'didact-gothic', sans-serif;\n}\n\n.initialDiv {\n\theight: 50vh;\n\twidth: 60vw;\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n\tjustify-content: center;\n\tborder-radius: 33px;\n\tgap: 1rem;\n\tborder: 8px solid #002546a8;\n\tbackground: linear-gradient(145deg, #163e62, #1a4a75);\n\tbox-shadow:  16px 16px 19px #164065,\n             -16px -16px 19px #1a4a75;\n}\n\n#error,\n#instructions {\n\tfont-family: 'ironman', sans-serif;\n\tletter-spacing: 2px;\n}\n\n.title {\n\tfont-family: 'ironman', sans-serif;\n\tfont-size: 6rem;\n\tletter-spacing: 10px;\n\t-webkit-text-stroke-color: #002647;\n\t-webkit-text-stroke-width: 2px;\n\tcolor: #bdbdbd; \n}\n\n.gameArea {\n\twidth: 90vw;\n\theight: 90%;\n\tdisplay:flex;\n\tjustify-content: center;\n\talign-items: center;\n\tborder:2px solid black;\n}\n\n.boardArea {\n    width: clamp(150px, 30%, 40%);\n    aspect-ratio: 1 / 1;\n    display: grid;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(10, 1fr);\n    border: 2px solid black;\n\tbackground-color: #265885;\n}\n\n.playerArea {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\theight:100%;\n\twidth:100%;\n\ttransition: all 1.5s;\n}\n\n.playerArea:first-child {\n\tborder-right: solid 2px black;\n}\n\n.playerArea.enlarge{\n\twidth:80%;\n}\n\n.playerArea.smaller {\n\twidth:20%;\n}\n\n.boardArea:hover {\n\tcursor: crosshair;\n}\n\n.boardSpace {\n    border: 1px solid black;\n\ttransition: all .5s;\n}\n\n.carrier {\n\tbackground-color: lightblue;\n}\n\n.ghost {\n\tbackground-color: grey;\n}\n\n#error {\n\tcolor:red;\n\tfont-size: 2rem;\n\theight: 2rem;\n}\n\n#instructions {\n\tfont-size: 3rem;\n\tfont-weight: bold;\n}\n\n.hide {\n\tbackground-color: transparent;\n}\n\n.gamebtn{\n\tmin-width: 130px;\n\theight: 20%;\n\twidth: 25%;\n\tfont-size: 1.4rem;\n\tcolor: #fff;\n\tpadding: 5px 10px;\n\tfont-weight: bold;\n\tcursor: pointer;\n\ttransition: all 0.3s ease;\n\tposition: relative;\n\tdisplay: inline-block;\n\toutline: none;\n\tborder-radius: 5px;\n\tborder: 4px solid #b4cafa31;\n\tbackground: #1a4a75;\n  }\n  .gamebtn:hover {\n\tbackground: #fff;\n\tcolor: #1a4a75;\n  }\n\n.footer {\n\theight: 100%;\n\tbackground-color: #777777;\n\twidth: 100vw;\n\tposition:relative;\n\tz-index: 4;\n}\n\n.waves {\n\tposition:absolute;\n\ttop:65%;\n\tright:0;\n\twidth:100vw;\n}\n\n.wavesvg {\n\twidth:100vw;\n}\n\n.tutContainer {\n\toverflow: auto;\n\theight: 60vh;\n\twidth: 20vw;\n\tbackground-color: #c9c9c9;\n\tborder: 4px solid #164065;\n\tposition: absolute;\n\ttop: -80%;\n\tleft: 40%;\n\ttransition: all 2s ease-in-out;\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n\tpadding: 1rem 0;\n\tbox-sizing: border-box;\n\tborder-radius: 1rem;\n}\n\n.tutContainer.show {\n\ttop: 20%;\n}\n\n.tutHeader {\n\tfont-family: 'ironman', sans-serif;\n\tfont-size: 3rem;\n\tletter-spacing: 4px;\n\ttext-align: center;\n\t-webkit-text-stroke-color: #0026477a;\n\t-webkit-text-stroke-width: 3px;\n\twidth:100%;\n\tborder-bottom: 2px solid #002647;\n}\n\n#closeHowTo {\n\theight: 16px;\n\taspect-ratio: 1 / 1;\n\tbackground-color: rgba(255, 0, 0, 0);\n\tborder: 2px solid black;\n\tposition:absolute;\n\ttop: 1%;\n\tright: 1%;\n\tdisplay:flex;\n\tjustify-content: center;\n\talign-items: center;\n\ttext-align: center;\n\tfont-size: 12px;\n\tborder-radius: 50%;\n}\n\n#closeHowTo:hover {\n\tcursor: pointer;\n}\n\n.sectionDiv {\n\tdisplay: flex;\n\twidth:100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n\tpadding: 1rem 0;\n\tgap: .5rem;\n\tborder-bottom: 2px solid black;\n}\n\n.sectionTitle {\n\tfont-family: 'ironman', sans-serif;\n\tfont-size: 2rem;\n\tletter-spacing: 3px;\n\ttext-align: center;\n\t-webkit-text-stroke-color: #0026477a;\n\t-webkit-text-stroke-width: 2px;\n\ttext-decoration: underline;\n}\n\n.sectionText {\n\tfont-size: 1rem;\n\twidth: 90%;\n\tfont-family: 'didact-gothic', sans-serif;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/font/DidactGothic-Regular.ttf":
/*!*******************************************!*\
  !*** ./src/font/DidactGothic-Regular.ttf ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "37c8a8ed522192cd4de5.ttf";

/***/ }),

/***/ "./src/font/IronManOfWar2Ncv-E85l.ttf":
/*!********************************************!*\
  !*** ./src/font/IronManOfWar2Ncv-E85l.ttf ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "29d555060b22f1018351.ttf";

/***/ }),

/***/ "./src/img/wave.svg":
/*!**************************!*\
  !*** ./src/img/wave.svg ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e8c6089e9dd0941410db.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_game_objects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/game_objects */ "./src/components/game_objects.js");
/* harmony import */ var _components_placeShips__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/placeShips */ "./src/components/placeShips.js");
/* harmony import */ var _components_playerInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/playerInput */ "./src/components/playerInput.js");
/* harmony import */ var _components_displayInstructions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/displayInstructions */ "./src/components/displayInstructions.js");
/* harmony import */ var _components_howToPlay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/howToPlay */ "./src/components/howToPlay.js");
/* harmony import */ var _img_wave_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./img/wave.svg */ "./src/img/wave.svg");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./style.css */ "./src/style.css");







let players = [];
function restartGame() {
  while (players.length > 0) {
    players.pop();
  }
  let restartBtn = document.querySelector('#restart');
  restartBtn.removeEventListener('pointerdown', restartGame);
  restartBtn.remove();
  document.querySelector('.initialDiv').style.display = 'flex';
  // eslint-disable-next-line no-use-before-define
  document.querySelector('#placeShips').addEventListener('pointerdown', initializeGame);
  document.querySelector('#error').textContent = '';
  document.querySelector('#instructions').textContent = '';
  document.querySelector('.gameArea').remove();
}
function timed(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  });
}
function switchSize(mode, act, inact) {
  if (mode === 1) {
    inact.gameBoard.playArea.classList.add('enlarge');
    act.gameBoard.playArea.classList.add('smaller');
  } else {
    inact.gameBoard.playArea.classList.remove('enlarge');
    act.gameBoard.playArea.classList.remove('smaller');
  }
}
async function mainLoop() {
  document.querySelector('#startgame').remove();
  let turn = 0;
  let activePlayer = players[0];
  let inactivePlayer = players[1];
  switchSize(1, activePlayer, inactivePlayer);
  while (!activePlayer.gameBoard.allShipsSunk()) {
    /* eslint-disable no-await-in-loop */
    (0,_components_displayInstructions__WEBPACK_IMPORTED_MODULE_3__.displayInstructions)(`Player ${Math.abs(turn % 2) + 1} is aiming...`);
    await timed(activePlayer.type === 'cpu' ? 2000 : 500);
    await (0,_components_playerInput__WEBPACK_IMPORTED_MODULE_2__.playerInput)(activePlayer, inactivePlayer);
    turn++;
    activePlayer = players[turn % 2];
    inactivePlayer = players[Math.abs((turn - 1) % 2)];
  }
  (0,_components_displayInstructions__WEBPACK_IMPORTED_MODULE_3__.displayInstructions)(`Player ${Math.abs((turn - 1) % 2) + 1} Wins!`);
  let restartBtn = document.createElement('button');
  restartBtn.id = 'restart';
  restartBtn.classList.add('gamebtn');
  restartBtn.addEventListener('pointerdown', restartGame);
  restartBtn.textContent = "Play Again!";
  document.querySelector('.main').appendChild(restartBtn);
}
async function initializeGame() {
  let rembutton = document.querySelector('#placeShips');
  rembutton.removeEventListener('pointerdown', initializeGame);
  document.querySelector('.initialDiv').style.display = 'none';
  let gameArea = document.createElement('div');
  gameArea.classList.add('gameArea');
  document.querySelector('.main').appendChild(gameArea);
  players.push((0,_components_game_objects__WEBPACK_IMPORTED_MODULE_0__.createPlayer)('hum'));
  players[0].gameBoard.displayBoard();
  await (0,_components_placeShips__WEBPACK_IMPORTED_MODULE_1__.placeShips)(players);
  players.push((0,_components_game_objects__WEBPACK_IMPORTED_MODULE_0__.createPlayer)('cpu'));
  document.querySelector('#error').textContent = '';
  let startGame = document.createElement('button');
  startGame.id = 'startgame';
  startGame.classList.add('gamebtn');
  startGame.addEventListener('pointerdown', mainLoop);
  startGame.textContent = "Click here to start!";
  document.querySelector('.main').appendChild(startGame);
}
function displayGameButton() {
  // let waveimg = document.createElement('img');
  // waveimg.src = waves;
  // waveimg.classList.add('wavesvg');
  // document.querySelector('.waves').appendChild(waveimg);
  (0,_components_howToPlay__WEBPACK_IMPORTED_MODULE_4__.buildHowTo)();
  let div = document.createElement('div');
  div.classList.add('initialDiv');
  document.querySelector('.main').appendChild(div);
  let title = document.createElement('h1');
  title.classList.add('title');
  title.textContent = "Battleship";
  div.appendChild(title);
  let button = document.createElement('button');
  button.id = 'placeShips';
  button.classList.add('gamebtn');
  button.addEventListener('pointerdown', initializeGame);
  button.textContent = "Start Placing your Ships!";
  div.appendChild(button);
}
window.addEventListener('load', displayGameButton);
document.querySelector('#source').addEventListener('pointerdown', () => {
  window.open('https://github.com/NMGVox/Battleship', '_blank');
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sNEVBQTRFLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsTUFBTSxpQkFBaUIsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksTUFBTSxZQUFZLE9BQU8sVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxLQUFLLE1BQU0sVUFBVSxVQUFVLEtBQUssS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxNQUFNLE9BQU8sT0FBTyxNQUFNLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZ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LENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUM7RUFDNUJpRCxLQUFLLENBQUN6RSxXQUFXLEdBQUcsWUFBWTtFQUNoQ3NKLEdBQUcsQ0FBQ3hILFdBQVcsQ0FBQzJDLEtBQUssQ0FBQztFQUN0QixJQUFJOEUsTUFBTSxHQUFHekosUUFBUSxDQUFDd0IsYUFBYSxDQUFDLFFBQVEsQ0FBQztFQUM3Q2lJLE1BQU0sQ0FBQ3pFLEVBQUUsR0FBRyxZQUFZO0VBQ3hCeUUsTUFBTSxDQUFDaEksU0FBUyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDO0VBQy9CK0gsTUFBTSxDQUFDeEUsZ0JBQWdCLENBQUMsYUFBYSxFQUFFdUQsY0FBYyxDQUFDO0VBQ3REaUIsTUFBTSxDQUFDdkosV0FBVyxHQUFHLDJCQUEyQjtFQUNoRHNKLEdBQUcsQ0FBQ3hILFdBQVcsQ0FBQ3lILE1BQU0sQ0FBQztBQUMzQjtBQUVBMUMsTUFBTSxDQUFDOUIsZ0JBQWdCLENBQUMsTUFBTSxFQUFFc0UsaUJBQWlCLENBQUM7QUFFbER2SixRQUFRLENBQUNDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQ2dGLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxNQUFNO0VBQ3BFOEIsTUFBTSxDQUFDMkMsSUFBSSxDQUFDLHNDQUFzQyxFQUFFLFFBQVEsQ0FBQztBQUNqRSxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9kaXNwbGF5SW5zdHJ1Y3Rpb25zLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9nYW1lX29iamVjdHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL2hvd1RvUGxheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvbGVuZ3Roc1RvTmFtZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL3BsYWNlU2hpcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL3BsYXllcklucHV0LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGRpc3BsYXlJbnN0cnVjdGlvbnMobXNnKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luc3RydWN0aW9ucycpLnRleHRDb250ZW50ID0gbXNnO1xufVxuXG5leHBvcnQgeyBkaXNwbGF5SW5zdHJ1Y3Rpb25zIH07XG4iLCJmdW5jdGlvbiBzaGlwRmFjdG9yeShsZW4pIHtcbiAgICBjb25zdCBsZW5ndGggPSBsZW47XG4gICAgY29uc3QgaGl0cyA9IDA7XG4gICAgbGV0IHNoaXA7XG4gICAgbGV0IG9yaWVudGF0aW9uID0gMDtcblxuICAgIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICAgICAgaWYgKHNoaXAuaGl0cyA9PT0gc2hpcC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNoaXAuc3VuayA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0hpdCgpIHtcbiAgICAgICAgc2hpcC5oaXRzKys7XG4gICAgICAgIGlzU3VuaygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoYW5nZU9yaWVudGF0aW9uKCkge1xuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09IDApIHtcbiAgICAgICAgICAgIG9yaWVudGF0aW9uID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9yaWVudGF0aW9uID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNoaXAgPSB7XG4gICAgICAgIGxlbmd0aCxcbiAgICAgICAgaGl0cyxcbiAgICAgICAgc3VuazogZmFsc2UsXG4gICAgICAgIGlzSGl0LFxuICAgICAgICBpc1N1bmssXG4gICAgICAgIGNoYW5nZU9yaWVudGF0aW9uLFxuICAgICAgICBnZXRPcmllbnRhdGlvbjogKCkgPT4gb3JpZW50YXRpb24sXG4gICAgfTtcblxuICAgIHJldHVybiBzaGlwO1xufVxuXG5mdW5jdGlvbiBnYW1lQm9hcmRGYWN0b3J5KCkge1xuICAgIGNvbnN0IHNoaXBzID0gW107XG4gICAgY29uc3Qgc3BhY2VzID0gWy4uLkFycmF5KDEwKV0ubWFwKCgpID0+IEFycmF5KDEwKSk7XG4gICAgY29uc3Qgc3BhY2VFbGVtZW50cyA9IFsuLi5BcnJheSgxMCldLm1hcCgoKSA9PiBBcnJheSgxMCkpO1xuICAgIGxldCBwbGF5QXJlYTtcbiAgICBsZXQgZ2FtZUJvYXJkO1xuXG4gICAgZnVuY3Rpb24gZGlzcGxheUJvYXJkKCkge1xuICAgICAgICBsZXQgcGxheWVyQXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwbGF5ZXJBcmVhLmNsYXNzTGlzdC5hZGQoJ3BsYXllckFyZWEnKTtcbiAgICAgICAgZ2FtZUJvYXJkLnBsYXlBcmVhID0gcGxheWVyQXJlYTtcbiAgICAgICAgbGV0IGJvYXJkQXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBib2FyZEFyZWEuY2xhc3NMaXN0LmFkZCgnYm9hcmRBcmVhJyk7XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgMTA7IHgrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1NwYWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgbmV3U3BhY2UuY2xhc3NMaXN0LmFkZCgnYm9hcmRTcGFjZScpO1xuICAgICAgICAgICAgICAgIG5ld1NwYWNlLnNldEF0dHJpYnV0ZSgnZGF0YS1yb3cnLCB4KTtcbiAgICAgICAgICAgICAgICBuZXdTcGFjZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29sJywgeSk7XG4gICAgICAgICAgICAgICAgYm9hcmRBcmVhLmFwcGVuZENoaWxkKG5ld1NwYWNlKTtcbiAgICAgICAgICAgICAgICBzcGFjZUVsZW1lbnRzW3hdW3ldID0gbmV3U3BhY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcGxheWVyQXJlYS5hcHBlbmRDaGlsZChib2FyZEFyZWEpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZUFyZWEnKS5hcHBlbmRDaGlsZChwbGF5ZXJBcmVhKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZVNwYWNlcyhvcmllbnRhdGlvbiwgbGVuLCB4LCB5KSB7XG4gICAgICAgIGxldCBvY2N1cGllZCA9IFtdO1xuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09IDApIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvY2N1cGllZC5wdXNoKFt4LCB5ICsgaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIG9jY3VwaWVkLnB1c2goW3ggKyBpLCB5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9jY3VwaWVkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVmFsaWRQbGFjZW1lbnQoc2hpcE9jY3VwYW5jeSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBPY2N1cGFuY3kubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB4ID0gc2hpcE9jY3VwYW5jeVtpXVswXTtcbiAgICAgICAgICAgIGxldCB5ID0gc2hpcE9jY3VwYW5jeVtpXVsxXTtcbiAgICAgICAgICAgIGlmICghKCh4IDwgMTAgJiYgeCA+PSAwKSAmJiAoeSA8IDEwICYmIHkgPj0gMCkpKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Vycm9yJykudGV4dENvbnRlbnQgPSBgQ2FuJ3QgcGxhY2UgaGVyZSFgO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChnYW1lQm9hcmQuc3BhY2VzW3hdW3ldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZXJyb3InKS50ZXh0Q29udGVudCA9IGBDYW4ndCBwbGFjZSBoZXJlIWA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlU2hpcChsZW4sIGNvb3JkLCBvcmllbnRhdGlvbikge1xuICAgICAgICBjb25zdCBuZXdTaGlwID0gc2hpcEZhY3RvcnkobGVuKTtcbiAgICAgICAgY29uc3Qgc2hpcE9jY3VwYW5jeSA9IGdlbmVyYXRlU3BhY2VzKG9yaWVudGF0aW9uLCBsZW4sIE51bWJlcihjb29yZFswXSksIE51bWJlcihjb29yZFsxXSkpO1xuICAgICAgICBpZiAoIWlzVmFsaWRQbGFjZW1lbnQoc2hpcE9jY3VwYW5jeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgeCA9IHNoaXBPY2N1cGFuY3lbaV1bMF07XG4gICAgICAgICAgICBsZXQgeSA9IHNoaXBPY2N1cGFuY3lbaV1bMV07XG4gICAgICAgICAgICBnYW1lQm9hcmQuc3BhY2VzW3hdW3ldID0gbmV3U2hpcDtcbiAgICAgICAgICAgIGxldCB0YXJnZXRTcGFjZSA9IHNwYWNlRWxlbWVudHNbeF1beV07XG4gICAgICAgICAgICB0YXJnZXRTcGFjZS5jbGFzc0xpc3QucmVtb3ZlKCdnaG9zdCcpO1xuICAgICAgICAgICAgdGFyZ2V0U3BhY2UuY2xhc3NMaXN0LmFkZCgnY2FycmllcicpO1xuICAgICAgICB9XG4gICAgICAgIGdhbWVCb2FyZC5zaGlwcy5wdXNoKG5ld1NoaXApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbGxTaGlwc1N1bmsoKSB7XG4gICAgICAgIHJldHVybiBnYW1lQm9hcmQuc2hpcHMuZXZlcnkoXG4gICAgICAgICAgICAoc2hpcCkgPT4gc2hpcC5zdW5rID09PSB0cnVlLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzQXR0YWNrT3V0T2ZCb3VuZHMoeCwgeSkge1xuICAgICAgICBpZiAoISgoeCA8IDEwICYmIHggPj0gMCkgJiYgKHkgPCAxMCAmJiB5ID49IDApKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soY29vcmQpIHtcbiAgICAgICAgY29uc3QgeCA9IGNvb3JkWzBdO1xuICAgICAgICBjb25zdCB5ID0gY29vcmRbMV07XG5cbiAgICAgICAgaWYgKGlzQXR0YWNrT3V0T2ZCb3VuZHMoeCwgeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBbZmFsc2UsIG51bGxdO1xuICAgICAgICB9XG4gICAgICAgIGdhbWVCb2FyZC5zcGFjZUVsZW1lbnRzW3hdW3ldLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblxuICAgICAgICBjb25zdCBhdHRhY2tlZFNwYWNlID0gZ2FtZUJvYXJkLnNwYWNlc1t4XVt5XTtcbiAgICAgICAgaWYgKGF0dGFja2VkU3BhY2UgPT09ICd4Jykge1xuICAgICAgICAgICAgcmV0dXJuIFtmYWxzZSwgbnVsbF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdhbWVCb2FyZC5zaGlwcy5pbmNsdWRlcyhhdHRhY2tlZFNwYWNlKSkge1xuICAgICAgICAgICAgYXR0YWNrZWRTcGFjZS5pc0hpdCgpO1xuICAgICAgICAgICAgZ2FtZUJvYXJkLnNwYWNlRWxlbWVudHNbeF1beV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2JsdWUnO1xuICAgICAgICAgICAgcmV0dXJuIFt0cnVlLCAnc2hpcCddO1xuICAgICAgICB9IGlmIChnYW1lQm9hcmQuc3BhY2VzW3hdW3ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGdhbWVCb2FyZC5zcGFjZXNbeF1beV0gPSAneCc7XG4gICAgICAgICAgICBnYW1lQm9hcmQuc3BhY2VFbGVtZW50c1t4XVt5XS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcbiAgICAgICAgICAgIHJldHVybiBbdHJ1ZSwgJ2VtcHR5J107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtmYWxzZSwgbnVsbF07XG4gICAgfVxuXG4gICAgZ2FtZUJvYXJkID0ge1xuICAgICAgICBzaGlwcyxcbiAgICAgICAgc3BhY2VzLFxuICAgICAgICBwbGFjZVNoaXAsXG4gICAgICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgICAgIGFsbFNoaXBzU3VuayxcbiAgICAgICAgZGlzcGxheUJvYXJkLFxuICAgICAgICBnZW5lcmF0ZVNwYWNlcyxcbiAgICAgICAgc3BhY2VFbGVtZW50cyxcbiAgICAgICAgcGxheUFyZWEsXG4gICAgfTtcblxuICAgIHJldHVybiBnYW1lQm9hcmQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYXllcih0eXBlKSB7XG4gICAgY29uc3QgZ2FtZUJvYXJkID0gZ2FtZUJvYXJkRmFjdG9yeSgpO1xuICAgIGNvbnN0IG1vdmVTdGFjayA9IFtdO1xuICAgIGxldCBsYXN0TW92ZTtcblxuICAgIGlmICh0eXBlID09PSAnY3B1Jykge1xuICAgICAgICBnYW1lQm9hcmQuZGlzcGxheUJvYXJkKCk7XG4gICAgICAgIGNvbnN0IGxlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3Rocy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICBjb25zdCBvID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBnYW1lQm9hcmQucGxhY2VTaGlwKGxlbmd0aHNbaV0sIFt4LCB5XSwgbyk7XG4gICAgICAgICAgICBpZiAoIXJlcykge1xuICAgICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBnYW1lQm9hcmQuc3BhY2VFbGVtZW50cy5mb3JFYWNoKChlbGVyb3cpID0+IHtcbiAgICAgICAgICAgIGVsZXJvdy5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHBsYXllciA9IHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAgZ2FtZUJvYXJkLFxuICAgICAgICBtb3ZlU3RhY2ssXG4gICAgICAgIGxhc3RNb3ZlLFxuICAgIH07XG4gICAgcmV0dXJuIHBsYXllcjtcbn1cblxuZXhwb3J0IHsgY3JlYXRlUGxheWVyIH07XG4iLCJmdW5jdGlvbiBzaG93SG93VG8oKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50dXRDb250YWluZXInKTtcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xufVxuXG5mdW5jdGlvbiBjbG9zZUhvd1RvKCkge1xuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHV0Q29udGFpbmVyJyk7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbn1cblxuZnVuY3Rpb24gYWRkRGl2KHNlY3Rpb25IZWFkZXIsIHRleHQpIHtcbiAgICBsZXQgbmV3RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBsZXQgc2VjdGlvblRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBzZWN0aW9uSGVhZGVyO1xuICAgIHNlY3Rpb25UZXh0LnRleHRDb250ZW50ID0gdGV4dDtcblxuICAgIG5ld0Rpdi5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uRGl2Jyk7XG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgnc2VjdGlvblRpdGxlJyk7XG4gICAgc2VjdGlvblRleHQuY2xhc3NMaXN0LmFkZCgnc2VjdGlvblRleHQnKTtcblxuICAgIG5ld0Rpdi5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgbmV3RGl2LmFwcGVuZENoaWxkKHNlY3Rpb25UZXh0KTtcblxuICAgIHJldHVybiBuZXdEaXY7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkSG93VG8oKSB7XG4gICAgbGV0IHR1dG9yaWFsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IGNsb3NlYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY2xvc2VidXR0b24uaWQgPSAnY2xvc2VIb3dUbyc7XG4gICAgY2xvc2VidXR0b24udGV4dENvbnRlbnQgPSAn4pyVJztcbiAgICBjbG9zZWJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIGNsb3NlSG93VG8pO1xuICAgIHR1dG9yaWFsQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsb3NlYnV0dG9uKTtcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIHR1dG9yaWFsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0dXRDb250YWluZXJcIik7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIkhvdyB0byBQbGF5IVwiO1xuICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ3R1dEhlYWRlcicpO1xuICAgIHR1dG9yaWFsQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcblxuICAgIHR1dG9yaWFsQ29udGFpbmVyLmFwcGVuZENoaWxkKGFkZERpdignUGxhY2luZyBTaGlwcycsIGBTaGlwcyBjYW4gYmUgcGxhY2VkIG9uIHRoZSBib2FyZCBieSBsZWZ0IGNsaWNraW5nIGEgY2VsbC4gXG4gICAgWW91IG1heSByb3RhdGUgeW91ciBjdXJyZW50IHNoaXAgYnkgcHJlc3Npbmcgc3BhY2ViYXIuIFlvdSBoYXZlIDUgc2hpcHMgdG8gcGxhY2Ugb24gdGhlIGJvYXJkLiBBIGNhcnJpZXIgKDUgc3BhY2VzKSwgXG4gICAgYSBiYXR0bGVzaGlwICg0IHNwYWNlcyksIGEgc3VibWFyaW5lICgzIHNwYWNlcyksIGEgY3J1aXNlciwgYW5kIGEgZGVzdHJveWVyICgyIHNwYWNlcykuIE9uY2UgYWxsIHNoaXBzIGFyZSBwbGFjZWQsIHlvdSBtYXlcbiAgICBiZWdpbi5gKSk7XG5cbiAgICB0dXRvcmlhbENvbnRhaW5lci5hcHBlbmRDaGlsZChhZGREaXYoJ1BsYXlpbmcnLCBgQ2xpY2sgYSBjZWxsIG9uIHRoZSBvcHBvbmVudHMgYm9hcmQgdG8gbGF1bmNoIGFuIGF0dGFjay4gSWYgeW91IGhpdCBhICBzaGlwLCB0aGUgY2VsbCB3aWxsXG4gICAgdHVybiAoYmx1ZSkuIElmIHlvdSBtaXNzLCB0aGUgY2VsbCB3aWxsIHR1cm4gcmVkLiBTaW5rIGFsbCBvZiB0aGUgb3Bwb25lbnQncyBzaGlwcyB0byB3aW4gdGhlIGdhbWUhYCkpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKHR1dG9yaWFsQ29udGFpbmVyKTtcbn1cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hvd1RvJykuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBzaG93SG93VG8pO1xuXG5leHBvcnQgeyBidWlsZEhvd1RvIH07XG4iLCJjb25zdCBzaGlwTmFtZXMgPSBbXG4gICAgJ2NhcnJpZXInLFxuICAgICdiYXR0bGVzaGlwJyxcbiAgICAnc3VibWFyaW5lJyxcbiAgICAnY3J1aXNlcicsXG4gICAgJ2Rlc3Ryb3llcicsXG5dO1xuXG5leHBvcnQgeyBzaGlwTmFtZXMgfTtcbiIsImltcG9ydCB7IHNoaXBOYW1lcyB9IGZyb20gJy4vbGVuZ3Roc1RvTmFtZXMnO1xuaW1wb3J0IHsgZGlzcGxheUluc3RydWN0aW9ucyB9IGZyb20gJy4vZGlzcGxheUluc3RydWN0aW9ucyc7XG5cbmxldCBtb3VzZXBvc2l0aW9uO1xuXG5mdW5jdGlvbiBhbGxvd1NoaXBQbGFjZW1lbnQobGVuZ3RoLCBwbGF5ZXJzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGNvbnN0IGJvYXJkQ2VsbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdib2FyZFNwYWNlJyk7XG4gICAgICAgIGxldCBvcmllbnRhdGlvbiA9IDA7XG4gICAgICAgIGNvbnN0IGdldEFmZmVjdGVkU3F1YXJlcyA9ICh4LCB5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxscyA9IFtdO1xuICAgICAgICAgICAgbGV0IGNvb3JkcyA9IHBsYXllcnNbMF0uZ2FtZUJvYXJkLmdlbmVyYXRlU3BhY2VzKG9yaWVudGF0aW9uLCBsZW5ndGgsIHgsIHkpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgeGkgPSBjb29yZHNbaV1bMF07XG4gICAgICAgICAgICAgICAgbGV0IHlpID0gY29vcmRzW2ldWzFdO1xuICAgICAgICAgICAgICAgIGxldCB0aGlzQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz1cIiR7eGl9XCJdW2RhdGEtY29sPVwiJHt5aX1cIl1gKTtcbiAgICAgICAgICAgICAgICBjZWxscy5wdXNoKHRoaXNDZWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjZWxscztcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB1cGRhdGVTaGlwRGlzcGxheSA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0aGlzQ2VsbCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQobW91c2Vwb3NpdGlvblswXSwgbW91c2Vwb3NpdGlvblsxXSk7XG4gICAgICAgICAgICBpZiAoIXRoaXNDZWxsLmNsYXNzTGlzdC5jb250YWlucygnYm9hcmRTcGFjZScpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHggPSBOdW1iZXIodGhpc0NlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpKTtcbiAgICAgICAgICAgIGxldCB5ID0gTnVtYmVyKHRoaXNDZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2wnKSk7XG4gICAgICAgICAgICBsZXQgY2VsbHMgPSBnZXRBZmZlY3RlZFNxdWFyZXMoeCwgeSk7XG4gICAgICAgICAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwgIT09IG51bGwgJiYgY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2dob3N0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdnaG9zdCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2VsbCAhPT0gbnVsbCAmJiAhY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2dob3N0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdnaG9zdCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHJvdGF0ZVNoaXAgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlICE9PSAzMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVwZGF0ZVNoaXBEaXNwbGF5KCk7XG4gICAgICAgICAgICBpZiAob3JpZW50YXRpb24gPT09IDEpIHtcbiAgICAgICAgICAgICAgICBvcmllbnRhdGlvbiA9IDA7XG4gICAgICAgICAgICB9IGVsc2UgeyBvcmllbnRhdGlvbiA9IDE7IH1cbiAgICAgICAgICAgIHVwZGF0ZVNoaXBEaXNwbGF5KCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBsaWdodFNxdWFyZSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IHggPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpO1xuICAgICAgICAgICAgbGV0IHkgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbCcpO1xuICAgICAgICAgICAgY29uc3QgY2VsbHMgPSBnZXRBZmZlY3RlZFNxdWFyZXMoTnVtYmVyKHgpLCBOdW1iZXIoeSkpO1xuICAgICAgICAgICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjZWxsICE9PSBudWxsKSB7IGNlbGwuY2xhc3NMaXN0LmFkZCgnZ2hvc3QnKTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHVubGlnaHRTcXVhcmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGxldCB4ID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yb3cnKTtcbiAgICAgICAgICAgIGxldCB5ID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb2wnKTtcbiAgICAgICAgICAgIGNvbnN0IGNlbGxzID0gZ2V0QWZmZWN0ZWRTcXVhcmVzKE51bWJlcih4KSwgTnVtYmVyKHkpKTtcbiAgICAgICAgICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbCAhPT0gbnVsbCkgeyBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2dob3N0Jyk7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHJlcG9ydENlbGxDb29yZGluYXRlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBsZXQgc3BhY2UgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICBsZXQgY29vcmRzID0gW107XG4gICAgICAgICAgICBjb29yZHMucHVzaChzcGFjZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93JykpO1xuICAgICAgICAgICAgY29vcmRzLnB1c2goc3BhY2UuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbCcpKTtcbiAgICAgICAgICAgIGxldCByZXMgPSBwbGF5ZXJzWzBdLmdhbWVCb2FyZC5wbGFjZVNoaXAobGVuZ3RoLCBjb29yZHMsIG9yaWVudGF0aW9uKTtcbiAgICAgICAgICAgIGlmICghcmVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEFycmF5LmZyb20oYm9hcmRDZWxscykuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNlbGwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZXBvcnRDZWxsQ29vcmRpbmF0ZSk7XG4gICAgICAgICAgICAgICAgY2VsbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgbGlnaHRTcXVhcmUpO1xuICAgICAgICAgICAgICAgIGNlbGwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHVubGlnaHRTcXVhcmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHJvdGF0ZVNoaXApO1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHJvdGF0ZVNoaXApO1xuXG4gICAgICAgIEFycmF5LmZyb20oYm9hcmRDZWxscykuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlcG9ydENlbGxDb29yZGluYXRlKTtcbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGxpZ2h0U3F1YXJlKTtcbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHVubGlnaHRTcXVhcmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcGxhY2VTaGlwcyhwbGF5ZXJzKSB7XG4gICAgbGV0IHNoaXBMZW5ndGhzID0gWzUsIDQsIDMsIDMsIDJdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tYXdhaXQtaW4tbG9vcCAqL1xuICAgICAgICBkaXNwbGF5SW5zdHJ1Y3Rpb25zKGBQbGFjZSB5b3VyICR7c2hpcE5hbWVzW2ldfSFgKTtcbiAgICAgICAgYXdhaXQgYWxsb3dTaGlwUGxhY2VtZW50KHNoaXBMZW5ndGhzW2ldLCBwbGF5ZXJzKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Vycm9yJykudGV4dENvbnRlbnQgPSBgYDtcbiAgICB9XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby1hd2FpdC1pbi1sb29wICovXG4gICAgZGlzcGxheUluc3RydWN0aW9ucygnUHJlc3MgdGhlIGJ1dHRvbiB0byBzdGFydCEnKTtcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XG4gICAgbW91c2Vwb3NpdGlvbiA9IFtlLmNsaWVudFgsIGUuY2xpZW50WV07XG59KTtcblxuZXhwb3J0IHsgcGxhY2VTaGlwcyB9O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc3RhbnQtY29uZGl0aW9uICovXG5mdW5jdGlvbiBwbGF5ZXJJbnB1dChhY3RpdmVQbGF5ZXIsIGluYWN0aXZlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGxldCBkaXNhYmxlQm9hcmRDb250cm9sID0gKCkgPT4ge307XG5cbiAgICAgICAgY29uc3QgcmVnaXN0ZXJBdHRhY2sgPSAoZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGNlbGwgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIGxldCB4ID0gTnVtYmVyKGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpKTtcbiAgICAgICAgICAgIGxldCB5ID0gTnVtYmVyKGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbCcpKTtcbiAgICAgICAgICAgIGxldCByZXMgPSBpbmFjdGl2ZS5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhbeCwgeV0pO1xuICAgICAgICAgICAgaWYgKCFyZXNbMF0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaXNhYmxlQm9hcmRDb250cm9sKGluYWN0aXZlKTtcbiAgICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgZGlzYWJsZUJvYXJkQ29udHJvbCA9IChwKSA9PiB7XG4gICAgICAgICAgICBwLmdhbWVCb2FyZC5zcGFjZUVsZW1lbnRzLmZvckVhY2goKHJvdykgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvd1tpXS5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHJlZ2lzdGVyQXR0YWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBlbmFibGVCb2FyZENvbnRyb2wgPSAocCkgPT4ge1xuICAgICAgICAgICAgcC5nYW1lQm9hcmQuc3BhY2VFbGVtZW50cy5mb3JFYWNoKChyb3cpID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICByb3dbaV0uYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCByZWdpc3RlckF0dGFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcG9wdWxhdGVTdGFjayA9ICh4LCB5LCBoaXRUeXBlLCBwKSA9PiB7XG4gICAgICAgICAgICBpZiAoaGl0VHlwZSA9PT0gJ3NoaXAnICYmIHAubW92ZVN0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIHVwLCBkb3duLCBsZWZ0LCByaWdodFxuICAgICAgICAgICAgICAgIHAubW92ZVN0YWNrLnB1c2goJ2VuZCcpO1xuICAgICAgICAgICAgICAgIHAubW92ZVN0YWNrLnB1c2goW3ggLSAxLCB5XSk7XG4gICAgICAgICAgICAgICAgcC5tb3ZlU3RhY2sucHVzaChbeCArIDEsIHldKTtcbiAgICAgICAgICAgICAgICBwLm1vdmVTdGFjay5wdXNoKFt4LCB5IC0gMV0pO1xuICAgICAgICAgICAgICAgIHAubW92ZVN0YWNrLnB1c2goW3gsIHkgKyAxXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhpdFR5cGUgPT09ICdzaGlwJyAmJiBwLm1vdmVTdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByZXYgPSBwLmxhc3RNb3ZlO1xuICAgICAgICAgICAgICAgIGlmIChwcmV2WzBdID4geCkge1xuICAgICAgICAgICAgICAgICAgICBwLm1vdmVTdGFjay5wdXNoKFt4IC0gMSwgeV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJldlswXSA8IHgpIHtcbiAgICAgICAgICAgICAgICAgICAgcC5tb3ZlU3RhY2sucHVzaChbeCArIDEsIHldKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByZXZbMV0gPiB5KSB7XG4gICAgICAgICAgICAgICAgICAgIHAubW92ZVN0YWNrLnB1c2goW3gsIHkgLSAxXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcmV2WzFdIDwgeSkge1xuICAgICAgICAgICAgICAgICAgICBwLm1vdmVTdGFjay5wdXNoKFt4LCB5ICsgMV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjbGVhclF1ZXVlSWZTaGlwU3VuayA9ICh4LCB5KSA9PiB7XG4gICAgICAgICAgICBsZXQgc3BhY2UgPSBpbmFjdGl2ZS5nYW1lQm9hcmQuc3BhY2VzW3hdW3ldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAoc3BhY2UpID09PSAnb2JqZWN0JyAmJiBzcGFjZS5zdW5rKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGFjdGl2ZVBsYXllci5tb3ZlU3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVQbGF5ZXIubW92ZVN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBnZXRDUFVDb29yZGluYXRlcyA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCB4O1xuICAgICAgICAgICAgbGV0IHk7XG4gICAgICAgICAgICBpZiAoYWN0aXZlUGxheWVyLm1vdmVTdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRNb3ZlID0gYWN0aXZlUGxheWVyLm1vdmVTdGFjay5wb3AoKTtcbiAgICAgICAgICAgICAgICBbeCwgeV0gPSBuZXh0TW92ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFt4LCB5XTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYWN0aXZlUGxheWVyLnR5cGUgPT09ICdjcHUnKSB7XG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIGxldCBbeCwgeV0gPSBnZXRDUFVDb29yZGluYXRlcygpO1xuICAgICAgICAgICAgICAgIGxldCByZXMgPSBpbmFjdGl2ZS5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhbeCwgeV0pO1xuICAgICAgICAgICAgICAgIGlmIChyZXNbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcG9wdWxhdGVTdGFjayh4LCB5LCByZXNbMV0sIGFjdGl2ZVBsYXllcik7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVBsYXllci5sYXN0TW92ZSA9IFt4LCB5XTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJRdWV1ZUlmU2hpcFN1bmsoeCwgeSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRpc2FibGVCb2FyZENvbnRyb2woaW5hY3RpdmUpO1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbmFibGVCb2FyZENvbnRyb2woaW5hY3RpdmUpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgeyBwbGF5ZXJJbnB1dCB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vZm9udC9Jcm9uTWFuT2ZXYXIyTmN2LUU4NWwudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9mb250L0RpZGFjdEdvdGhpYy1SZWd1bGFyLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYFxuQGZvbnQtZmFjZSB7XG5cdGZvbnQtZmFtaWx5OiAnaXJvbm1hbic7XG5cdHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xufVxuXG5AZm9udC1mYWNlIHtcblx0Zm9udC1mYW1pbHk6ICdkaWRhY3QtZ290aGljJztcblx0c3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19ffSk7XG59XG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxuYiwgdSwgaSwgY2VudGVyLFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xuXHRtYXJnaW46IDA7XG5cdHBhZGRpbmc6IDA7XG5cdGJvcmRlcjogMDtcblx0Zm9udC1zaXplOiAxMDAlO1xuXHRmb250OiBpbmhlcml0O1xuXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XG59XG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XG5cdGRpc3BsYXk6IGJsb2NrO1xufVxuYm9keSB7XG5cdGxpbmUtaGVpZ2h0OiAxO1xufVxub2wsIHVsIHtcblx0bGlzdC1zdHlsZTogbm9uZTtcbn1cbmJsb2NrcXVvdGUsIHEge1xuXHRxdW90ZXM6IG5vbmU7XG59XG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcbnE6YmVmb3JlLCBxOmFmdGVyIHtcblx0Y29udGVudDogJyc7XG5cdGNvbnRlbnQ6IG5vbmU7XG59XG50YWJsZSB7XG5cdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG5cdGJvcmRlci1zcGFjaW5nOiAwO1xufVxuXG5ib2R5IHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgaGVpZ2h0OjEwMHZoO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjYmJiYmJiO1xuXHRkaXNwbGF5OiBncmlkO1xuXHRncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcblx0Z3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgOGZyIC41ZnI7XG5cdGdyaWQtY29sdW1uLWdhcDogMHB4O1xuXHRncmlkLXJvdy1nYXA6IDVweDtcblx0cG9zaXRpb246cmVsYXRpdmU7XG59XG5cbi5oZWFkZXIge1xuXHRkaXNwbGF5OiBmbGV4O1xuXHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRoZWlnaHQ6MTAwJTtcbn1cblxuLmhlYWRpbmctdGFicyB7XG5cdGRpc3BsYXk6ZmxleDtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0anVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcblx0bWFyZ2luLWxlZnQ6IGF1dG87XG5cdGdhcDogMTBweDtcblx0bWFyZ2luLXJpZ2h0OiAxNnB4O1xuXHRoZWlnaHQ6OTAlO1xufVxuXG4uaGVhZGluZy10YWJzIGxpIHtcblx0aGVpZ2h0OjUwJTtcblx0YmFja2dyb3VuZC1jb2xvcjogcmdiKDE0NSwgMTczLCAyMTEpO1xuXHRib3JkZXItc3R5bGU6IHNvbGlkO1xuXHRib3JkZXItd2lkdGg6IDJweDtcblx0Ym9yZGVyLWNvbG9yOiByZ2JhKDIzLCA2OCwgMTMzLCAwLjE3OCk7XG5cdGJvcmRlci1yYWRpdXM6IDRweDtcblx0ZGlzcGxheTogZmxleDtcblx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdGZvbnQtZmFtaWx5OiAnZGlkYWN0LWdvdGhpYycsIHNhbnMtc2VyaWY7XG5cdHBhZGRpbmc6IDBweCAxMnB4O1xuXHRjb2xvcjogd2hpdGVzbW9rZTtcblx0Zm9udC13ZWlnaHQ6IDcwMDtcblx0dHJhbnNpdGlvbjogYWxsIDFzIGVhc2UtaW47XG59XG5cbi5oZWFkaW5nLXRhYnMgbGk6aG92ZXIge1xuXHRjdXJzb3I6IHBvaW50ZXI7XG5cdGJhY2tncm91bmQtY29sb3I6ICMxYTRhNzU7XG59XG5cbi5tYWluIHtcblx0ZGlzcGxheTpmbGV4O1xuXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblx0Z2FwOiAydmg7XG5cdGhlaWdodDogMTAwJTtcbn1cblxuYnV0dG9uIHtcblx0Zm9udC1mYW1pbHk6ICdkaWRhY3QtZ290aGljJywgc2Fucy1zZXJpZjtcbn1cblxuLmluaXRpYWxEaXYge1xuXHRoZWlnaHQ6IDUwdmg7XG5cdHdpZHRoOiA2MHZ3O1xuXHRkaXNwbGF5OiBmbGV4O1xuXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0Ym9yZGVyLXJhZGl1czogMzNweDtcblx0Z2FwOiAxcmVtO1xuXHRib3JkZXI6IDhweCBzb2xpZCAjMDAyNTQ2YTg7XG5cdGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxNDVkZWcsICMxNjNlNjIsICMxYTRhNzUpO1xuXHRib3gtc2hhZG93OiAgMTZweCAxNnB4IDE5cHggIzE2NDA2NSxcbiAgICAgICAgICAgICAtMTZweCAtMTZweCAxOXB4ICMxYTRhNzU7XG59XG5cbiNlcnJvcixcbiNpbnN0cnVjdGlvbnMge1xuXHRmb250LWZhbWlseTogJ2lyb25tYW4nLCBzYW5zLXNlcmlmO1xuXHRsZXR0ZXItc3BhY2luZzogMnB4O1xufVxuXG4udGl0bGUge1xuXHRmb250LWZhbWlseTogJ2lyb25tYW4nLCBzYW5zLXNlcmlmO1xuXHRmb250LXNpemU6IDZyZW07XG5cdGxldHRlci1zcGFjaW5nOiAxMHB4O1xuXHQtd2Via2l0LXRleHQtc3Ryb2tlLWNvbG9yOiAjMDAyNjQ3O1xuXHQtd2Via2l0LXRleHQtc3Ryb2tlLXdpZHRoOiAycHg7XG5cdGNvbG9yOiAjYmRiZGJkOyBcbn1cblxuLmdhbWVBcmVhIHtcblx0d2lkdGg6IDkwdnc7XG5cdGhlaWdodDogOTAlO1xuXHRkaXNwbGF5OmZsZXg7XG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRib3JkZXI6MnB4IHNvbGlkIGJsYWNrO1xufVxuXG4uYm9hcmRBcmVhIHtcbiAgICB3aWR0aDogY2xhbXAoMTUwcHgsIDMwJSwgNDAlKTtcbiAgICBhc3BlY3QtcmF0aW86IDEgLyAxO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XG4gICAgYm9yZGVyOiAycHggc29saWQgYmxhY2s7XG5cdGJhY2tncm91bmQtY29sb3I6ICMyNjU4ODU7XG59XG5cbi5wbGF5ZXJBcmVhIHtcblx0ZGlzcGxheTogZmxleDtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cdGhlaWdodDoxMDAlO1xuXHR3aWR0aDoxMDAlO1xuXHR0cmFuc2l0aW9uOiBhbGwgMS41cztcbn1cblxuLnBsYXllckFyZWE6Zmlyc3QtY2hpbGQge1xuXHRib3JkZXItcmlnaHQ6IHNvbGlkIDJweCBibGFjaztcbn1cblxuLnBsYXllckFyZWEuZW5sYXJnZXtcblx0d2lkdGg6ODAlO1xufVxuXG4ucGxheWVyQXJlYS5zbWFsbGVyIHtcblx0d2lkdGg6MjAlO1xufVxuXG4uYm9hcmRBcmVhOmhvdmVyIHtcblx0Y3Vyc29yOiBjcm9zc2hhaXI7XG59XG5cbi5ib2FyZFNwYWNlIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcblx0dHJhbnNpdGlvbjogYWxsIC41cztcbn1cblxuLmNhcnJpZXIge1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XG59XG5cbi5naG9zdCB7XG5cdGJhY2tncm91bmQtY29sb3I6IGdyZXk7XG59XG5cbiNlcnJvciB7XG5cdGNvbG9yOnJlZDtcblx0Zm9udC1zaXplOiAycmVtO1xuXHRoZWlnaHQ6IDJyZW07XG59XG5cbiNpbnN0cnVjdGlvbnMge1xuXHRmb250LXNpemU6IDNyZW07XG5cdGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uaGlkZSB7XG5cdGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG4uZ2FtZWJ0bntcblx0bWluLXdpZHRoOiAxMzBweDtcblx0aGVpZ2h0OiAyMCU7XG5cdHdpZHRoOiAyNSU7XG5cdGZvbnQtc2l6ZTogMS40cmVtO1xuXHRjb2xvcjogI2ZmZjtcblx0cGFkZGluZzogNXB4IDEwcHg7XG5cdGZvbnQtd2VpZ2h0OiBib2xkO1xuXHRjdXJzb3I6IHBvaW50ZXI7XG5cdHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXHRvdXRsaW5lOiBub25lO1xuXHRib3JkZXItcmFkaXVzOiA1cHg7XG5cdGJvcmRlcjogNHB4IHNvbGlkICNiNGNhZmEzMTtcblx0YmFja2dyb3VuZDogIzFhNGE3NTtcbiAgfVxuICAuZ2FtZWJ0bjpob3ZlciB7XG5cdGJhY2tncm91bmQ6ICNmZmY7XG5cdGNvbG9yOiAjMWE0YTc1O1xuICB9XG5cbi5mb290ZXIge1xuXHRoZWlnaHQ6IDEwMCU7XG5cdGJhY2tncm91bmQtY29sb3I6ICM3Nzc3Nzc7XG5cdHdpZHRoOiAxMDB2dztcblx0cG9zaXRpb246cmVsYXRpdmU7XG5cdHotaW5kZXg6IDQ7XG59XG5cbi53YXZlcyB7XG5cdHBvc2l0aW9uOmFic29sdXRlO1xuXHR0b3A6NjUlO1xuXHRyaWdodDowO1xuXHR3aWR0aDoxMDB2dztcbn1cblxuLndhdmVzdmcge1xuXHR3aWR0aDoxMDB2dztcbn1cblxuLnR1dENvbnRhaW5lciB7XG5cdG92ZXJmbG93OiBhdXRvO1xuXHRoZWlnaHQ6IDYwdmg7XG5cdHdpZHRoOiAyMHZ3O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjYzljOWM5O1xuXHRib3JkZXI6IDRweCBzb2xpZCAjMTY0MDY1O1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHRvcDogLTgwJTtcblx0bGVmdDogNDAlO1xuXHR0cmFuc2l0aW9uOiBhbGwgMnMgZWFzZS1pbi1vdXQ7XG5cdGRpc3BsYXk6IGZsZXg7XG5cdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdHBhZGRpbmc6IDFyZW0gMDtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0Ym9yZGVyLXJhZGl1czogMXJlbTtcbn1cblxuLnR1dENvbnRhaW5lci5zaG93IHtcblx0dG9wOiAyMCU7XG59XG5cbi50dXRIZWFkZXIge1xuXHRmb250LWZhbWlseTogJ2lyb25tYW4nLCBzYW5zLXNlcmlmO1xuXHRmb250LXNpemU6IDNyZW07XG5cdGxldHRlci1zcGFjaW5nOiA0cHg7XG5cdHRleHQtYWxpZ246IGNlbnRlcjtcblx0LXdlYmtpdC10ZXh0LXN0cm9rZS1jb2xvcjogIzAwMjY0NzdhO1xuXHQtd2Via2l0LXRleHQtc3Ryb2tlLXdpZHRoOiAzcHg7XG5cdHdpZHRoOjEwMCU7XG5cdGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjMDAyNjQ3O1xufVxuXG4jY2xvc2VIb3dUbyB7XG5cdGhlaWdodDogMTZweDtcblx0YXNwZWN0LXJhdGlvOiAxIC8gMTtcblx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDAsIDAsIDApO1xuXHRib3JkZXI6IDJweCBzb2xpZCBibGFjaztcblx0cG9zaXRpb246YWJzb2x1dGU7XG5cdHRvcDogMSU7XG5cdHJpZ2h0OiAxJTtcblx0ZGlzcGxheTpmbGV4O1xuXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRmb250LXNpemU6IDEycHg7XG5cdGJvcmRlci1yYWRpdXM6IDUwJTtcbn1cblxuI2Nsb3NlSG93VG86aG92ZXIge1xuXHRjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5zZWN0aW9uRGl2IHtcblx0ZGlzcGxheTogZmxleDtcblx0d2lkdGg6MTAwJTtcblx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdHBhZGRpbmc6IDFyZW0gMDtcblx0Z2FwOiAuNXJlbTtcblx0Ym9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIGJsYWNrO1xufVxuXG4uc2VjdGlvblRpdGxlIHtcblx0Zm9udC1mYW1pbHk6ICdpcm9ubWFuJywgc2Fucy1zZXJpZjtcblx0Zm9udC1zaXplOiAycmVtO1xuXHRsZXR0ZXItc3BhY2luZzogM3B4O1xuXHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdC13ZWJraXQtdGV4dC1zdHJva2UtY29sb3I6ICMwMDI2NDc3YTtcblx0LXdlYmtpdC10ZXh0LXN0cm9rZS13aWR0aDogMnB4O1xuXHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1cblxuLnNlY3Rpb25UZXh0IHtcblx0Zm9udC1zaXplOiAxcmVtO1xuXHR3aWR0aDogOTAlO1xuXHRmb250LWZhbWlseTogJ2RpZGFjdC1nb3RoaWMnLCBzYW5zLXNlcmlmO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQ0E7Q0FDQyxzQkFBc0I7Q0FDdEIsNENBQTRDO0FBQzdDOztBQUVBO0NBQ0MsNEJBQTRCO0NBQzVCLDRDQUEyQztBQUM1QztBQUNBOzs7Ozs7Ozs7Ozs7O0NBYUMsU0FBUztDQUNULFVBQVU7Q0FDVixTQUFTO0NBQ1QsZUFBZTtDQUNmLGFBQWE7Q0FDYix3QkFBd0I7QUFDekI7QUFDQSxnREFBZ0Q7QUFDaEQ7O0NBRUMsY0FBYztBQUNmO0FBQ0E7Q0FDQyxjQUFjO0FBQ2Y7QUFDQTtDQUNDLGdCQUFnQjtBQUNqQjtBQUNBO0NBQ0MsWUFBWTtBQUNiO0FBQ0E7O0NBRUMsV0FBVztDQUNYLGFBQWE7QUFDZDtBQUNBO0NBQ0MseUJBQXlCO0NBQ3pCLGlCQUFpQjtBQUNsQjs7QUFFQTtJQUNJLGFB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QXlCO0NBQ3pCLHlCQUF5QjtDQUN6QixrQkFBa0I7Q0FDbEIsU0FBUztDQUNULFNBQVM7Q0FDVCw4QkFBOEI7Q0FDOUIsYUFBYTtDQUNiLHNCQUFzQjtDQUN0QixtQkFBbUI7Q0FDbkIsZUFBZTtDQUNmLHNCQUFzQjtDQUN0QixtQkFBbUI7QUFDcEI7O0FBRUE7Q0FDQyxRQUFRO0FBQ1Q7O0FBRUE7Q0FDQyxrQ0FBa0M7Q0FDbEMsZUFBZTtDQUNmLG1CQUFtQjtDQUNuQixrQkFBa0I7Q0FDbEIsb0NBQW9DO0NBQ3BDLDhCQUE4QjtDQUM5QixVQUFVO0NBQ1YsZ0NBQWdDO0FBQ2pDOztBQUVBO0NBQ0MsWUFBWTtDQUNaLG1CQUFtQjtDQUNuQixvQ0FBb0M7Q0FDcEMsdUJBQXVCO0NBQ3ZCLGlCQUFpQjtDQUNqQixPQUFPO0NBQ1AsU0FBUztDQUNULFlBQVk7Q0FDWix1QkFBdUI7Q0FDdkIsbUJBQW1CO0NBQ25CLGtCQUFrQjtDQUNsQixlQUFlO0NBQ2Ysa0JBQWtCO0FBQ25COztBQUVBO0NBQ0MsZUFBZTtBQUNoQjs7QUFFQTtDQUNDLGFBQWE7Q0FDYixVQUFVO0NBQ1Ysc0JBQXNCO0NBQ3RCLHVCQUF1QjtDQUN2QixtQkFBbUI7Q0FDbkIsZUFBZTtDQUNmLFVBQVU7Q0FDViw4QkFBOEI7QUFDL0I7O0FBRUE7Q0FDQyxrQ0FBa0M7Q0FDbEMsZUFBZTtDQUNmLG1CQUFtQjtDQUNuQixrQkFBa0I7Q0FDbEIsb0NBQW9DO0NBQ3BDLDhCQUE4QjtDQUM5QiwwQkFBMEI7QUFDM0I7O0FBRUE7Q0FDQyxlQUFlO0NBQ2YsVUFBVTtDQUNWLHdDQUF3QztBQUN6Q1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCJcXG5AZm9udC1mYWNlIHtcXG5cXHRmb250LWZhbWlseTogJ2lyb25tYW4nO1xcblxcdHNyYzogdXJsKCcuL2ZvbnQvSXJvbk1hbk9mV2FyMk5jdi1FODVsLnR0ZicpO1xcbn1cXG5cXG5AZm9udC1mYWNlIHtcXG5cXHRmb250LWZhbWlseTogJ2RpZGFjdC1nb3RoaWMnO1xcblxcdHNyYzogdXJsKCcuL2ZvbnQvRGlkYWN0R290aGljLVJlZ3VsYXIudHRmJyk7XFxufVxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcblxcdHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGhlaWdodDoxMDB2aDtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiAjYmJiYmJiO1xcblxcdGRpc3BsYXk6IGdyaWQ7XFxuXFx0Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxuXFx0Z3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgOGZyIC41ZnI7XFxuXFx0Z3JpZC1jb2x1bW4tZ2FwOiAwcHg7XFxuXFx0Z3JpZC1yb3ctZ2FwOiA1cHg7XFxuXFx0cG9zaXRpb246cmVsYXRpdmU7XFxufVxcblxcbi5oZWFkZXIge1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXHRoZWlnaHQ6MTAwJTtcXG59XFxuXFxuLmhlYWRpbmctdGFicyB7XFxuXFx0ZGlzcGxheTpmbGV4O1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0anVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG5cXHRtYXJnaW4tbGVmdDogYXV0bztcXG5cXHRnYXA6IDEwcHg7XFxuXFx0bWFyZ2luLXJpZ2h0OiAxNnB4O1xcblxcdGhlaWdodDo5MCU7XFxufVxcblxcbi5oZWFkaW5nLXRhYnMgbGkge1xcblxcdGhlaWdodDo1MCU7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogcmdiKDE0NSwgMTczLCAyMTEpO1xcblxcdGJvcmRlci1zdHlsZTogc29saWQ7XFxuXFx0Ym9yZGVyLXdpZHRoOiAycHg7XFxuXFx0Ym9yZGVyLWNvbG9yOiByZ2JhKDIzLCA2OCwgMTMzLCAwLjE3OCk7XFxuXFx0Ym9yZGVyLXJhZGl1czogNHB4O1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuXFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXHRmb250LWZhbWlseTogJ2RpZGFjdC1nb3RoaWMnLCBzYW5zLXNlcmlmO1xcblxcdHBhZGRpbmc6IDBweCAxMnB4O1xcblxcdGNvbG9yOiB3aGl0ZXNtb2tlO1xcblxcdGZvbnQtd2VpZ2h0OiA3MDA7XFxuXFx0dHJhbnNpdGlvbjogYWxsIDFzIGVhc2UtaW47XFxufVxcblxcbi5oZWFkaW5nLXRhYnMgbGk6aG92ZXIge1xcblxcdGN1cnNvcjogcG9pbnRlcjtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiAjMWE0YTc1O1xcbn1cXG5cXG4ubWFpbiB7XFxuXFx0ZGlzcGxheTpmbGV4O1xcblxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG5cXHRnYXA6IDJ2aDtcXG5cXHRoZWlnaHQ6IDEwMCU7XFxufVxcblxcbmJ1dHRvbiB7XFxuXFx0Zm9udC1mYW1pbHk6ICdkaWRhY3QtZ290aGljJywgc2Fucy1zZXJpZjtcXG59XFxuXFxuLmluaXRpYWxEaXYge1xcblxcdGhlaWdodDogNTB2aDtcXG5cXHR3aWR0aDogNjB2dztcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHRib3JkZXItcmFkaXVzOiAzM3B4O1xcblxcdGdhcDogMXJlbTtcXG5cXHRib3JkZXI6IDhweCBzb2xpZCAjMDAyNTQ2YTg7XFxuXFx0YmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE0NWRlZywgIzE2M2U2MiwgIzFhNGE3NSk7XFxuXFx0Ym94LXNoYWRvdzogIDE2cHggMTZweCAxOXB4ICMxNjQwNjUsXFxuICAgICAgICAgICAgIC0xNnB4IC0xNnB4IDE5cHggIzFhNGE3NTtcXG59XFxuXFxuI2Vycm9yLFxcbiNpbnN0cnVjdGlvbnMge1xcblxcdGZvbnQtZmFtaWx5OiAnaXJvbm1hbicsIHNhbnMtc2VyaWY7XFxuXFx0bGV0dGVyLXNwYWNpbmc6IDJweDtcXG59XFxuXFxuLnRpdGxlIHtcXG5cXHRmb250LWZhbWlseTogJ2lyb25tYW4nLCBzYW5zLXNlcmlmO1xcblxcdGZvbnQtc2l6ZTogNnJlbTtcXG5cXHRsZXR0ZXItc3BhY2luZzogMTBweDtcXG5cXHQtd2Via2l0LXRleHQtc3Ryb2tlLWNvbG9yOiAjMDAyNjQ3O1xcblxcdC13ZWJraXQtdGV4dC1zdHJva2Utd2lkdGg6IDJweDtcXG5cXHRjb2xvcjogI2JkYmRiZDsgXFxufVxcblxcbi5nYW1lQXJlYSB7XFxuXFx0d2lkdGg6IDkwdnc7XFxuXFx0aGVpZ2h0OiA5MCU7XFxuXFx0ZGlzcGxheTpmbGV4O1xcblxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0Ym9yZGVyOjJweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmJvYXJkQXJlYSB7XFxuICAgIHdpZHRoOiBjbGFtcCgxNTBweCwgMzAlLCA0MCUpO1xcbiAgICBhc3BlY3QtcmF0aW86IDEgLyAxO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xcblxcdGJhY2tncm91bmQtY29sb3I6ICMyNjU4ODU7XFxufVxcblxcbi5wbGF5ZXJBcmVhIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuXFx0aGVpZ2h0OjEwMCU7XFxuXFx0d2lkdGg6MTAwJTtcXG5cXHR0cmFuc2l0aW9uOiBhbGwgMS41cztcXG59XFxuXFxuLnBsYXllckFyZWE6Zmlyc3QtY2hpbGQge1xcblxcdGJvcmRlci1yaWdodDogc29saWQgMnB4IGJsYWNrO1xcbn1cXG5cXG4ucGxheWVyQXJlYS5lbmxhcmdle1xcblxcdHdpZHRoOjgwJTtcXG59XFxuXFxuLnBsYXllckFyZWEuc21hbGxlciB7XFxuXFx0d2lkdGg6MjAlO1xcbn1cXG5cXG4uYm9hcmRBcmVhOmhvdmVyIHtcXG5cXHRjdXJzb3I6IGNyb3NzaGFpcjtcXG59XFxuXFxuLmJvYXJkU3BhY2Uge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG5cXHR0cmFuc2l0aW9uOiBhbGwgLjVzO1xcbn1cXG5cXG4uY2FycmllciB7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xcbn1cXG5cXG4uZ2hvc3Qge1xcblxcdGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxufVxcblxcbiNlcnJvciB7XFxuXFx0Y29sb3I6cmVkO1xcblxcdGZvbnQtc2l6ZTogMnJlbTtcXG5cXHRoZWlnaHQ6IDJyZW07XFxufVxcblxcbiNpbnN0cnVjdGlvbnMge1xcblxcdGZvbnQtc2l6ZTogM3JlbTtcXG5cXHRmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuLmhpZGUge1xcblxcdGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4uZ2FtZWJ0bntcXG5cXHRtaW4td2lkdGg6IDEzMHB4O1xcblxcdGhlaWdodDogMjAlO1xcblxcdHdpZHRoOiAyNSU7XFxuXFx0Zm9udC1zaXplOiAxLjRyZW07XFxuXFx0Y29sb3I6ICNmZmY7XFxuXFx0cGFkZGluZzogNXB4IDEwcHg7XFxuXFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XFxuXFx0Y3Vyc29yOiBwb2ludGVyO1xcblxcdHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG5cXHRvdXRsaW5lOiBub25lO1xcblxcdGJvcmRlci1yYWRpdXM6IDVweDtcXG5cXHRib3JkZXI6IDRweCBzb2xpZCAjYjRjYWZhMzE7XFxuXFx0YmFja2dyb3VuZDogIzFhNGE3NTtcXG4gIH1cXG4gIC5nYW1lYnRuOmhvdmVyIHtcXG5cXHRiYWNrZ3JvdW5kOiAjZmZmO1xcblxcdGNvbG9yOiAjMWE0YTc1O1xcbiAgfVxcblxcbi5mb290ZXIge1xcblxcdGhlaWdodDogMTAwJTtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiAjNzc3Nzc3O1xcblxcdHdpZHRoOiAxMDB2dztcXG5cXHRwb3NpdGlvbjpyZWxhdGl2ZTtcXG5cXHR6LWluZGV4OiA0O1xcbn1cXG5cXG4ud2F2ZXMge1xcblxcdHBvc2l0aW9uOmFic29sdXRlO1xcblxcdHRvcDo2NSU7XFxuXFx0cmlnaHQ6MDtcXG5cXHR3aWR0aDoxMDB2dztcXG59XFxuXFxuLndhdmVzdmcge1xcblxcdHdpZHRoOjEwMHZ3O1xcbn1cXG5cXG4udHV0Q29udGFpbmVyIHtcXG5cXHRvdmVyZmxvdzogYXV0bztcXG5cXHRoZWlnaHQ6IDYwdmg7XFxuXFx0d2lkdGg6IDIwdnc7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogI2M5YzljOTtcXG5cXHRib3JkZXI6IDRweCBzb2xpZCAjMTY0MDY1O1xcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXHR0b3A6IC04MCU7XFxuXFx0bGVmdDogNDAlO1xcblxcdHRyYW5zaXRpb246IGFsbCAycyBlYXNlLWluLW91dDtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXHRwYWRkaW5nOiAxcmVtIDA7XFxuXFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcXG5cXHRib3JkZXItcmFkaXVzOiAxcmVtO1xcbn1cXG5cXG4udHV0Q29udGFpbmVyLnNob3cge1xcblxcdHRvcDogMjAlO1xcbn1cXG5cXG4udHV0SGVhZGVyIHtcXG5cXHRmb250LWZhbWlseTogJ2lyb25tYW4nLCBzYW5zLXNlcmlmO1xcblxcdGZvbnQtc2l6ZTogM3JlbTtcXG5cXHRsZXR0ZXItc3BhY2luZzogNHB4O1xcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHQtd2Via2l0LXRleHQtc3Ryb2tlLWNvbG9yOiAjMDAyNjQ3N2E7XFxuXFx0LXdlYmtpdC10ZXh0LXN0cm9rZS13aWR0aDogM3B4O1xcblxcdHdpZHRoOjEwMCU7XFxuXFx0Ym9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICMwMDI2NDc7XFxufVxcblxcbiNjbG9zZUhvd1RvIHtcXG5cXHRoZWlnaHQ6IDE2cHg7XFxuXFx0YXNwZWN0LXJhdGlvOiAxIC8gMTtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMCwgMCwgMCk7XFxuXFx0Ym9yZGVyOiAycHggc29saWQgYmxhY2s7XFxuXFx0cG9zaXRpb246YWJzb2x1dGU7XFxuXFx0dG9wOiAxJTtcXG5cXHRyaWdodDogMSU7XFxuXFx0ZGlzcGxheTpmbGV4O1xcblxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdGZvbnQtc2l6ZTogMTJweDtcXG5cXHRib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcblxcbiNjbG9zZUhvd1RvOmhvdmVyIHtcXG5cXHRjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5zZWN0aW9uRGl2IHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdHdpZHRoOjEwMCU7XFxuXFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcdHBhZGRpbmc6IDFyZW0gMDtcXG5cXHRnYXA6IC41cmVtO1xcblxcdGJvcmRlci1ib3R0b206IDJweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLnNlY3Rpb25UaXRsZSB7XFxuXFx0Zm9udC1mYW1pbHk6ICdpcm9ubWFuJywgc2Fucy1zZXJpZjtcXG5cXHRmb250LXNpemU6IDJyZW07XFxuXFx0bGV0dGVyLXNwYWNpbmc6IDNweDtcXG5cXHR0ZXh0LWFsaWduOiBjZW50ZXI7XFxuXFx0LXdlYmtpdC10ZXh0LXN0cm9rZS1jb2xvcjogIzAwMjY0NzdhO1xcblxcdC13ZWJraXQtdGV4dC1zdHJva2Utd2lkdGg6IDJweDtcXG5cXHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuXFxuLnNlY3Rpb25UZXh0IHtcXG5cXHRmb250LXNpemU6IDFyZW07XFxuXFx0d2lkdGg6IDkwJTtcXG5cXHRmb250LWZhbWlseTogJ2RpZGFjdC1nb3RoaWMnLCBzYW5zLXNlcmlmO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImluZGV4XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCB7IGNyZWF0ZVBsYXllciB9IGZyb20gJy4vY29tcG9uZW50cy9nYW1lX29iamVjdHMnO1xuaW1wb3J0IHsgcGxhY2VTaGlwcyB9IGZyb20gJy4vY29tcG9uZW50cy9wbGFjZVNoaXBzJztcbmltcG9ydCB7IHBsYXllcklucHV0IH0gZnJvbSAnLi9jb21wb25lbnRzL3BsYXllcklucHV0JztcbmltcG9ydCB7IGRpc3BsYXlJbnN0cnVjdGlvbnMgfSBmcm9tICcuL2NvbXBvbmVudHMvZGlzcGxheUluc3RydWN0aW9ucyc7XG5pbXBvcnQgeyBidWlsZEhvd1RvIH0gZnJvbSAnLi9jb21wb25lbnRzL2hvd1RvUGxheSc7XG5pbXBvcnQgd2F2ZXMgZnJvbSAnLi9pbWcvd2F2ZS5zdmcnO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5cbmxldCBwbGF5ZXJzID0gW107XG5cbmZ1bmN0aW9uIHJlc3RhcnRHYW1lKCkge1xuICAgIHdoaWxlIChwbGF5ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcGxheWVycy5wb3AoKTtcbiAgICB9XG4gICAgbGV0IHJlc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdGFydCcpO1xuICAgIHJlc3RhcnRCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCByZXN0YXJ0R2FtZSk7XG4gICAgcmVzdGFydEJ0bi5yZW1vdmUoKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5pdGlhbERpdicpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYWNlU2hpcHMnKS5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIGluaXRpYWxpemVHYW1lKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZXJyb3InKS50ZXh0Q29udGVudCA9ICcnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnN0cnVjdGlvbnMnKS50ZXh0Q29udGVudCA9ICcnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lQXJlYScpLnJlbW92ZSgpO1xufVxuXG5mdW5jdGlvbiB0aW1lZChpbnRlcnZhbCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIGludGVydmFsKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc3dpdGNoU2l6ZShtb2RlLCBhY3QsIGluYWN0KSB7XG4gICAgaWYgKG1vZGUgPT09IDEpIHtcbiAgICAgICAgaW5hY3QuZ2FtZUJvYXJkLnBsYXlBcmVhLmNsYXNzTGlzdC5hZGQoJ2VubGFyZ2UnKTtcbiAgICAgICAgYWN0LmdhbWVCb2FyZC5wbGF5QXJlYS5jbGFzc0xpc3QuYWRkKCdzbWFsbGVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaW5hY3QuZ2FtZUJvYXJkLnBsYXlBcmVhLmNsYXNzTGlzdC5yZW1vdmUoJ2VubGFyZ2UnKTtcbiAgICAgICAgYWN0LmdhbWVCb2FyZC5wbGF5QXJlYS5jbGFzc0xpc3QucmVtb3ZlKCdzbWFsbGVyJyk7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBtYWluTG9vcCgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnRnYW1lJykucmVtb3ZlKCk7XG4gICAgbGV0IHR1cm4gPSAwO1xuICAgIGxldCBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXJzWzBdO1xuICAgIGxldCBpbmFjdGl2ZVBsYXllciA9IHBsYXllcnNbMV07XG4gICAgc3dpdGNoU2l6ZSgxLCBhY3RpdmVQbGF5ZXIsIGluYWN0aXZlUGxheWVyKTtcbiAgICB3aGlsZSAoIWFjdGl2ZVBsYXllci5nYW1lQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tYXdhaXQtaW4tbG9vcCAqL1xuICAgICAgICBkaXNwbGF5SW5zdHJ1Y3Rpb25zKGBQbGF5ZXIgJHtNYXRoLmFicyh0dXJuICUgMikgKyAxfSBpcyBhaW1pbmcuLi5gKTtcbiAgICAgICAgYXdhaXQgdGltZWQoYWN0aXZlUGxheWVyLnR5cGUgPT09ICdjcHUnID8gMjAwMCA6IDUwMCk7XG4gICAgICAgIGF3YWl0IHBsYXllcklucHV0KGFjdGl2ZVBsYXllciwgaW5hY3RpdmVQbGF5ZXIpO1xuICAgICAgICB0dXJuKys7XG4gICAgICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcnNbdHVybiAlIDJdO1xuICAgICAgICBpbmFjdGl2ZVBsYXllciA9IHBsYXllcnNbTWF0aC5hYnMoKHR1cm4gLSAxKSAlIDIpXTtcbiAgICB9XG4gICAgZGlzcGxheUluc3RydWN0aW9ucyhgUGxheWVyICR7TWF0aC5hYnMoKHR1cm4gLSAxKSAlIDIpICsgMX0gV2lucyFgKTtcbiAgICBsZXQgcmVzdGFydEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHJlc3RhcnRCdG4uaWQgPSAncmVzdGFydCc7XG4gICAgcmVzdGFydEJ0bi5jbGFzc0xpc3QuYWRkKCdnYW1lYnRuJyk7XG4gICAgcmVzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHJlc3RhcnRHYW1lKTtcbiAgICByZXN0YXJ0QnRuLnRleHRDb250ZW50ID0gXCJQbGF5IEFnYWluIVwiO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJykuYXBwZW5kQ2hpbGQocmVzdGFydEJ0bik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluaXRpYWxpemVHYW1lKCkge1xuICAgIGxldCByZW1idXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxhY2VTaGlwcycpO1xuICAgIHJlbWJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIGluaXRpYWxpemVHYW1lKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5pdGlhbERpdicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgbGV0IGdhbWVBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZ2FtZUFyZWEuY2xhc3NMaXN0LmFkZCgnZ2FtZUFyZWEnKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpLmFwcGVuZENoaWxkKGdhbWVBcmVhKTtcbiAgICBwbGF5ZXJzLnB1c2goY3JlYXRlUGxheWVyKCdodW0nKSk7XG4gICAgcGxheWVyc1swXS5nYW1lQm9hcmQuZGlzcGxheUJvYXJkKCk7XG4gICAgYXdhaXQgcGxhY2VTaGlwcyhwbGF5ZXJzKTtcbiAgICBwbGF5ZXJzLnB1c2goY3JlYXRlUGxheWVyKCdjcHUnKSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Vycm9yJykudGV4dENvbnRlbnQgPSAnJztcbiAgICBsZXQgc3RhcnRHYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgc3RhcnRHYW1lLmlkID0gJ3N0YXJ0Z2FtZSc7XG4gICAgc3RhcnRHYW1lLmNsYXNzTGlzdC5hZGQoJ2dhbWVidG4nKTtcbiAgICBzdGFydEdhbWUuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBtYWluTG9vcCk7XG4gICAgc3RhcnRHYW1lLnRleHRDb250ZW50ID0gXCJDbGljayBoZXJlIHRvIHN0YXJ0IVwiO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJykuYXBwZW5kQ2hpbGQoc3RhcnRHYW1lKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUdhbWVCdXR0b24oKSB7XG4gICAgLy8gbGV0IHdhdmVpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAvLyB3YXZlaW1nLnNyYyA9IHdhdmVzO1xuICAgIC8vIHdhdmVpbWcuY2xhc3NMaXN0LmFkZCgnd2F2ZXN2ZycpO1xuICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53YXZlcycpLmFwcGVuZENoaWxkKHdhdmVpbWcpO1xuICAgIGJ1aWxkSG93VG8oKTtcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2luaXRpYWxEaXYnKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpLmFwcGVuZENoaWxkKGRpdik7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCd0aXRsZScpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gXCJCYXR0bGVzaGlwXCI7XG4gICAgZGl2LmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnV0dG9uLmlkID0gJ3BsYWNlU2hpcHMnO1xuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdnYW1lYnRuJyk7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgaW5pdGlhbGl6ZUdhbWUpO1xuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IFwiU3RhcnQgUGxhY2luZyB5b3VyIFNoaXBzIVwiO1xuICAgIGRpdi5hcHBlbmRDaGlsZChidXR0b24pO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGRpc3BsYXlHYW1lQnV0dG9uKTtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NvdXJjZScpLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgKCkgPT4ge1xuICAgIHdpbmRvdy5vcGVuKCdodHRwczovL2dpdGh1Yi5jb20vTk1HVm94L0JhdHRsZXNoaXAnLCAnX2JsYW5rJyk7XG59KTtcbiJdLCJuYW1lcyI6WyJkaXNwbGF5SW5zdHJ1Y3Rpb25zIiwibXNnIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGV4dENvbnRlbnQiLCJzaGlwRmFjdG9yeSIsImxlbiIsImxlbmd0aCIsImhpdHMiLCJzaGlwIiwib3JpZW50YXRpb24iLCJpc1N1bmsiLCJzdW5rIiwiaXNIaXQiLCJjaGFuZ2VPcmllbnRhdGlvbiIsImdldE9yaWVudGF0aW9uIiwiZ2FtZUJvYXJkRmFjdG9yeSIsInNoaXBzIiwic3BhY2VzIiwiQXJyYXkiLCJtYXAiLCJzcGFjZUVsZW1lbnRzIiwicGxheUFyZWEiLCJnYW1lQm9hcmQiLCJkaXNwbGF5Qm9hcmQiLCJwbGF5ZXJBcmVhIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImJvYXJkQXJlYSIsIngiLCJ5IiwibmV3U3BhY2UiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImdlbmVyYXRlU3BhY2VzIiwib2NjdXBpZWQiLCJpIiwicHVzaCIsImlzVmFsaWRQbGFjZW1lbnQiLCJzaGlwT2NjdXBhbmN5IiwidW5kZWZpbmVkIiwicGxhY2VTaGlwIiwiY29vcmQiLCJuZXdTaGlwIiwiTnVtYmVyIiwidGFyZ2V0U3BhY2UiLCJyZW1vdmUiLCJhbGxTaGlwc1N1bmsiLCJldmVyeSIsImlzQXR0YWNrT3V0T2ZCb3VuZHMiLCJyZWNlaXZlQXR0YWNrIiwiYXR0YWNrZWRTcGFjZSIsImluY2x1ZGVzIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjcmVhdGVQbGF5ZXIiLCJ0eXBlIiwibW92ZVN0YWNrIiwibGFzdE1vdmUiLCJsZW5ndGhzIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibyIsInJlcyIsImZvckVhY2giLCJlbGVyb3ciLCJlbGUiLCJwbGF5ZXIiLCJzaG93SG93VG8iLCJjb250YWluZXIiLCJjbG9zZUhvd1RvIiwiYWRkRGl2Iiwic2VjdGlvbkhlYWRlciIsInRleHQiLCJuZXdEaXYiLCJ0aXRsZSIsInNlY3Rpb25UZXh0IiwiYnVpbGRIb3dUbyIsInR1dG9yaWFsQ29udGFpbmVyIiwiY2xvc2VidXR0b24iLCJpZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzaGlwTmFtZXMiLCJtb3VzZXBvc2l0aW9uIiwiYWxsb3dTaGlwUGxhY2VtZW50IiwicGxheWVycyIsIlByb21pc2UiLCJyZXNvbHZlIiwiYm9hcmRDZWxscyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJnZXRBZmZlY3RlZFNxdWFyZXMiLCJjZWxscyIsImNvb3JkcyIsInhpIiwieWkiLCJ0aGlzQ2VsbCIsInVwZGF0ZVNoaXBEaXNwbGF5IiwiZWxlbWVudEZyb21Qb2ludCIsImNvbnRhaW5zIiwiZ2V0QXR0cmlidXRlIiwiY2VsbCIsInJvdGF0ZVNoaXAiLCJldmVudCIsImtleUNvZGUiLCJsaWdodFNxdWFyZSIsInRhcmdldCIsInVubGlnaHRTcXVhcmUiLCJyZXBvcnRDZWxsQ29vcmRpbmF0ZSIsInNwYWNlIiwiZnJvbSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ3aW5kb3ciLCJwbGFjZVNoaXBzIiwic2hpcExlbmd0aHMiLCJlIiwiY2xpZW50WCIsImNsaWVudFkiLCJwbGF5ZXJJbnB1dCIsImFjdGl2ZVBsYXllciIsImluYWN0aXZlIiwiZGlzYWJsZUJvYXJkQ29udHJvbCIsInJlZ2lzdGVyQXR0YWNrIiwicCIsInJvdyIsImVuYWJsZUJvYXJkQ29udHJvbCIsInBvcHVsYXRlU3RhY2siLCJoaXRUeXBlIiwicHJldiIsImNsZWFyUXVldWVJZlNoaXBTdW5rIiwicG9wIiwiZ2V0Q1BVQ29vcmRpbmF0ZXMiLCJuZXh0TW92ZSIsIndhdmVzIiwicmVzdGFydEdhbWUiLCJyZXN0YXJ0QnRuIiwiZGlzcGxheSIsImluaXRpYWxpemVHYW1lIiwidGltZWQiLCJpbnRlcnZhbCIsInNldFRpbWVvdXQiLCJzd2l0Y2hTaXplIiwibW9kZSIsImFjdCIsImluYWN0IiwibWFpbkxvb3AiLCJ0dXJuIiwiaW5hY3RpdmVQbGF5ZXIiLCJhYnMiLCJyZW1idXR0b24iLCJnYW1lQXJlYSIsInN0YXJ0R2FtZSIsImRpc3BsYXlHYW1lQnV0dG9uIiwiZGl2IiwiYnV0dG9uIiwib3BlbiJdLCJzb3VyY2VSb290IjoiIn0=