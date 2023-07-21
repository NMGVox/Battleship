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
      gameBoard.spaceElements[x][y].style.backgroundColor = '#0b9c2a';
      return [true, 'ship'];
    }
    if (gameBoard.spaces[x][y] === undefined) {
      gameBoard.spaces[x][y] = 'x';
      gameBoard.spaceElements[x][y].style.backgroundColor = '#b30707';
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
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./img/water.jpg */ "./src/img/water.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
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
	font-family: 'ironman', Georgia, 'Times New Roman', Times, serif;
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
	background: -webkit-linear-gradient(#eee, #8d8d8d);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	opacity: 0;
	transition: all 2s;
	position:relative;
	top: -25%;
}

.title.show {
	opacity:1;
	top:0;
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
    border: 2px solid #002647;
	background-image: url(${___CSS_LOADER_URL_REPLACEMENT_2___});
	background-size: cover;
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
	color: #002647;
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
	border-color: #002647;
  }

.footer {
	height: 100%;
	background-color: #777777;
	width: 100vw;
	position:relative;
	z-index: 4;
	display:flex;
	justify-content: center;
	align-items: center;
}

.footer-text {
	font-size: 1.2rem;
	letter-spacing: 1px;
}

.footer-text a{
	text-decoration: none;
	color: #1a4a75;
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
	transition: transform 2s ease-in-out;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem 0;
	box-sizing: border-box;
	border-radius: 1rem;
	z-index: 50;
}

.tutContainer.show {
	transform: translateY(150%);
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
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["\n@font-face {\n\tfont-family: 'ironman';\n\tsrc: url('./font/IronManOfWar2Ncv-E85l.ttf');\n}\n\n@font-face {\n\tfont-family: 'didact-gothic';\n\tsrc: url('./font/DidactGothic-Regular.ttf');\n}\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\nbody {\n\tfont-family: 'ironman', Georgia, 'Times New Roman', Times, serif;\n    display: grid;\n    justify-content: center;\n    align-items: center;\n    height:100vh;\n\tbackground-color: #bbbbbb;\n\tdisplay: grid;\n\tgrid-template-columns: 1fr;\n\tgrid-template-rows: 1fr 8fr .5fr;\n\tgrid-column-gap: 0px;\n\tgrid-row-gap: 5px;\n\tposition:relative;\n}\n\n.header {\n\tdisplay: flex;\n\talign-items: center;\n\theight:100%;\n}\n\n.heading-tabs {\n\tdisplay:flex;\n\talign-items: center;\n\tjustify-content: flex-end;\n\tmargin-left: auto;\n\tgap: 10px;\n\tmargin-right: 16px;\n\theight:90%;\n}\n\n.heading-tabs li {\n\theight:50%;\n\tbackground-color: rgb(145, 173, 211);\n\tborder-style: solid;\n\tborder-width: 2px;\n\tborder-color: rgba(23, 68, 133, 0.178);\n\tborder-radius: 4px;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tfont-family: 'didact-gothic', sans-serif;\n\tpadding: 0px 12px;\n\tcolor: whitesmoke;\n\tfont-weight: 700;\n\ttransition: all 1s ease-in;\n}\n\n.heading-tabs li:hover {\n\tcursor: pointer;\n\tbackground-color: #1a4a75;\n}\n\n.main {\n\tdisplay:flex;\n\tjustify-content: center;\n\talign-items: center;\n\tflex-direction: column;\n\tgap: 2vh;\n\theight: 100%;\n}\n\nbutton {\n\tfont-family: 'didact-gothic', sans-serif;\n}\n\n.initialDiv {\n\theight: 50vh;\n\twidth: 60vw;\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n\tjustify-content: center;\n\tborder-radius: 33px;\n\tgap: 1rem;\n\tborder: 8px solid #002546a8;\n\tbackground: linear-gradient(145deg, #163e62, #1a4a75);\n\tbox-shadow:  16px 16px 19px #164065,\n             -16px -16px 19px #1a4a75;\n}\n\n#error,\n#instructions {\n\tfont-family: 'ironman', sans-serif;\n\tletter-spacing: 2px;\n}\n\n.title {\n\tfont-family: 'ironman', sans-serif;\n\tfont-size: 6rem;\n\tletter-spacing: 10px;\n\t-webkit-text-stroke-color: #002647;\n\t-webkit-text-stroke-width: 2px;\n\tbackground: -webkit-linear-gradient(#eee, #8d8d8d);\n\t-webkit-background-clip: text;\n\t-webkit-text-fill-color: transparent;\n\topacity: 0;\n\ttransition: all 2s;\n\tposition:relative;\n\ttop: -25%;\n}\n\n.title.show {\n\topacity:1;\n\ttop:0;\n}\n\n.gameArea {\n\twidth: 90vw;\n\theight: 90%;\n\tdisplay:flex;\n\tjustify-content: center;\n\talign-items: center;\n\tborder:2px solid black;\n}\n\n.boardArea {\n    width: clamp(150px, 30%, 40%);\n    aspect-ratio: 1 / 1;\n    display: grid;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(10, 1fr);\n    border: 2px solid #002647;\n\tbackground-image: url('./img/water.jpg');\n\tbackground-size: cover;\n}\n\n.playerArea {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\theight:100%;\n\twidth:100%;\n\ttransition: all 1.5s;\n}\n\n.playerArea:first-child {\n\tborder-right: solid 2px black;\n}\n\n.playerArea.enlarge{\n\twidth:80%;\n}\n\n.playerArea.smaller {\n\twidth:20%;\n}\n\n.boardArea:hover {\n\tcursor: crosshair;\n}\n\n.boardSpace {\n    border: 1px solid black;\n\ttransition: all .5s;\n}\n\n.carrier {\n\tbackground-color: lightblue;\n}\n\n.ghost {\n\tbackground-color: grey;\n}\n\n#error {\n\tcolor:red;\n\tfont-size: 2rem;\n\theight: 2rem;\n}\n\n#instructions {\n\tfont-size: 3rem;\n\tfont-weight: bold;\n\tcolor: #002647;\n}\n\n.hide {\n\tbackground-color: transparent;\n}\n\n.gamebtn{\n\tmin-width: 130px;\n\theight: 20%;\n\twidth: 25%;\n\tfont-size: 1.4rem;\n\tcolor: #fff;\n\tpadding: 5px 10px;\n\tfont-weight: bold;\n\tcursor: pointer;\n\ttransition: all 0.3s ease;\n\tposition: relative;\n\tdisplay: inline-block;\n\toutline: none;\n\tborder-radius: 5px;\n\tborder: 4px solid #b4cafa31;\n\tbackground: #1a4a75;\n  }\n  .gamebtn:hover {\n\tbackground: #fff;\n\tcolor: #1a4a75;\n\tborder-color: #002647;\n  }\n\n.footer {\n\theight: 100%;\n\tbackground-color: #777777;\n\twidth: 100vw;\n\tposition:relative;\n\tz-index: 4;\n\tdisplay:flex;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n.footer-text {\n\tfont-size: 1.2rem;\n\tletter-spacing: 1px;\n}\n\n.footer-text a{\n\ttext-decoration: none;\n\tcolor: #1a4a75;\n}\n\n.waves {\n\tposition:absolute;\n\ttop:65%;\n\tright:0;\n\twidth:100vw;\n}\n\n.wavesvg {\n\twidth:100vw;\n}\n\n.tutContainer {\n\toverflow: auto;\n\theight: 60vh;\n\twidth: 20vw;\n\tbackground-color: #c9c9c9;\n\tborder: 4px solid #164065;\n\tposition: absolute;\n\ttop: -80%;\n\tleft: 40%;\n\ttransition: transform 2s ease-in-out;\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n\tpadding: 1rem 0;\n\tbox-sizing: border-box;\n\tborder-radius: 1rem;\n\tz-index: 50;\n}\n\n.tutContainer.show {\n\ttransform: translateY(150%);\n}\n\n.tutHeader {\n\tfont-family: 'ironman', sans-serif;\n\tfont-size: 3rem;\n\tletter-spacing: 4px;\n\ttext-align: center;\n\t-webkit-text-stroke-color: #0026477a;\n\t-webkit-text-stroke-width: 3px;\n\twidth:100%;\n\tborder-bottom: 2px solid #002647;\n}\n\n#closeHowTo {\n\theight: 16px;\n\taspect-ratio: 1 / 1;\n\tbackground-color: rgba(255, 0, 0, 0);\n\tborder: 2px solid black;\n\tposition:absolute;\n\ttop: 1%;\n\tright: 1%;\n\tdisplay:flex;\n\tjustify-content: center;\n\talign-items: center;\n\ttext-align: center;\n\tfont-size: 12px;\n\tborder-radius: 50%;\n}\n\n#closeHowTo:hover {\n\tcursor: pointer;\n}\n\n.sectionDiv {\n\tdisplay: flex;\n\twidth:100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n\tpadding: 1rem 0;\n\tgap: .5rem;\n\tborder-bottom: 2px solid black;\n}\n\n.sectionTitle {\n\tfont-family: 'ironman', sans-serif;\n\tfont-size: 2rem;\n\tletter-spacing: 3px;\n\ttext-align: center;\n\t-webkit-text-stroke-color: #0026477a;\n\t-webkit-text-stroke-width: 2px;\n\ttext-decoration: underline;\n}\n\n.sectionText {\n\tfont-size: 1rem;\n\twidth: 90%;\n\tfont-family: 'didact-gothic', sans-serif;\n}"],"sourceRoot":""}]);
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

/***/ "./src/img/water.jpg":
/*!***************************!*\
  !*** ./src/img/water.jpg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "5fa385e8c8e9bb671158.jpg";

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
  setTimeout(() => {
    title.classList.add('show');
  }, 100);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsbUNBQW1DO0FBQzVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyw0RUFBNEUsS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxNQUFNLGlCQUFpQixVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxNQUFNLFlBQVksT0FBTyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLEtBQUssTUFBTSxVQUFVLFVBQVUsS0FBSyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsTUFBTSxPQUFPLE9BQU8sTUFBTSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksd0NBQXdDLDJCQUEyQixpREFBaUQsR0FBRyxnQkFBZ0IsaUNBQWlDLGdEQUFnRCxHQUFH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dERpQixNQUFNLENBQUN2SixXQUFXLEdBQUcsMkJBQTJCO0VBQ2hEc0osR0FBRyxDQUFDeEgsV0FBVyxDQUFDeUgsTUFBTSxDQUFDO0FBQzNCO0FBRUExQyxNQUFNLENBQUM5QixnQkFBZ0IsQ0FBQyxNQUFNLEVBQUVzRSxpQkFBaUIsQ0FBQztBQUVsRHZKLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDZ0YsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLE1BQU07RUFDcEU4QixNQUFNLENBQUMyQyxJQUFJLENBQUMsc0NBQXNDLEVBQUUsUUFBUSxDQUFDO0FBQ2pFLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL2Rpc3BsYXlJbnN0cnVjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL2dhbWVfb2JqZWN0cy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvaG93VG9QbGF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9sZW5ndGhzVG9OYW1lcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvcGxhY2VTaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvcGxheWVySW5wdXQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZGlzcGxheUluc3RydWN0aW9ucyhtc2cpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5zdHJ1Y3Rpb25zJykudGV4dENvbnRlbnQgPSBtc2c7XG59XG5cbmV4cG9ydCB7IGRpc3BsYXlJbnN0cnVjdGlvbnMgfTtcbiIsImZ1bmN0aW9uIHNoaXBGYWN0b3J5KGxlbikge1xuICAgIGNvbnN0IGxlbmd0aCA9IGxlbjtcbiAgICBjb25zdCBoaXRzID0gMDtcbiAgICBsZXQgc2hpcDtcbiAgICBsZXQgb3JpZW50YXRpb24gPSAwO1xuXG4gICAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgICAgICBpZiAoc2hpcC5oaXRzID09PSBzaGlwLmxlbmd0aCkge1xuICAgICAgICAgICAgc2hpcC5zdW5rID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzSGl0KCkge1xuICAgICAgICBzaGlwLmhpdHMrKztcbiAgICAgICAgaXNTdW5rKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hhbmdlT3JpZW50YXRpb24oKSB7XG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgb3JpZW50YXRpb24gPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3JpZW50YXRpb24gPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hpcCA9IHtcbiAgICAgICAgbGVuZ3RoLFxuICAgICAgICBoaXRzLFxuICAgICAgICBzdW5rOiBmYWxzZSxcbiAgICAgICAgaXNIaXQsXG4gICAgICAgIGlzU3VuayxcbiAgICAgICAgY2hhbmdlT3JpZW50YXRpb24sXG4gICAgICAgIGdldE9yaWVudGF0aW9uOiAoKSA9PiBvcmllbnRhdGlvbixcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNoaXA7XG59XG5cbmZ1bmN0aW9uIGdhbWVCb2FyZEZhY3RvcnkoKSB7XG4gICAgY29uc3Qgc2hpcHMgPSBbXTtcbiAgICBjb25zdCBzcGFjZXMgPSBbLi4uQXJyYXkoMTApXS5tYXAoKCkgPT4gQXJyYXkoMTApKTtcbiAgICBjb25zdCBzcGFjZUVsZW1lbnRzID0gWy4uLkFycmF5KDEwKV0ubWFwKCgpID0+IEFycmF5KDEwKSk7XG4gICAgbGV0IHBsYXlBcmVhO1xuICAgIGxldCBnYW1lQm9hcmQ7XG5cbiAgICBmdW5jdGlvbiBkaXNwbGF5Qm9hcmQoKSB7XG4gICAgICAgIGxldCBwbGF5ZXJBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHBsYXllckFyZWEuY2xhc3NMaXN0LmFkZCgncGxheWVyQXJlYScpO1xuICAgICAgICBnYW1lQm9hcmQucGxheUFyZWEgPSBwbGF5ZXJBcmVhO1xuICAgICAgICBsZXQgYm9hcmRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJvYXJkQXJlYS5jbGFzc0xpc3QuYWRkKCdib2FyZEFyZWEnKTtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5KyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3U3BhY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBuZXdTcGFjZS5jbGFzc0xpc3QuYWRkKCdib2FyZFNwYWNlJyk7XG4gICAgICAgICAgICAgICAgbmV3U3BhY2Uuc2V0QXR0cmlidXRlKCdkYXRhLXJvdycsIHgpO1xuICAgICAgICAgICAgICAgIG5ld1NwYWNlLnNldEF0dHJpYnV0ZSgnZGF0YS1jb2wnLCB5KTtcbiAgICAgICAgICAgICAgICBib2FyZEFyZWEuYXBwZW5kQ2hpbGQobmV3U3BhY2UpO1xuICAgICAgICAgICAgICAgIHNwYWNlRWxlbWVudHNbeF1beV0gPSBuZXdTcGFjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwbGF5ZXJBcmVhLmFwcGVuZENoaWxkKGJvYXJkQXJlYSk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lQXJlYScpLmFwcGVuZENoaWxkKHBsYXllckFyZWEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlU3BhY2VzKG9yaWVudGF0aW9uLCBsZW4sIHgsIHkpIHtcbiAgICAgICAgbGV0IG9jY3VwaWVkID0gW107XG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIG9jY3VwaWVkLnB1c2goW3gsIHkgKyBpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgb2NjdXBpZWQucHVzaChbeCArIGksIHldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2NjdXBpZWQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNWYWxpZFBsYWNlbWVudChzaGlwT2NjdXBhbmN5KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcE9jY3VwYW5jeS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHggPSBzaGlwT2NjdXBhbmN5W2ldWzBdO1xuICAgICAgICAgICAgbGV0IHkgPSBzaGlwT2NjdXBhbmN5W2ldWzFdO1xuICAgICAgICAgICAgaWYgKCEoKHggPCAxMCAmJiB4ID49IDApICYmICh5IDwgMTAgJiYgeSA+PSAwKSkpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZXJyb3InKS50ZXh0Q29udGVudCA9IGBDYW4ndCBwbGFjZSBoZXJlIWA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGdhbWVCb2FyZC5zcGFjZXNbeF1beV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlcnJvcicpLnRleHRDb250ZW50ID0gYENhbid0IHBsYWNlIGhlcmUhYDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VTaGlwKGxlbiwgY29vcmQsIG9yaWVudGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IG5ld1NoaXAgPSBzaGlwRmFjdG9yeShsZW4pO1xuICAgICAgICBjb25zdCBzaGlwT2NjdXBhbmN5ID0gZ2VuZXJhdGVTcGFjZXMob3JpZW50YXRpb24sIGxlbiwgTnVtYmVyKGNvb3JkWzBdKSwgTnVtYmVyKGNvb3JkWzFdKSk7XG4gICAgICAgIGlmICghaXNWYWxpZFBsYWNlbWVudChzaGlwT2NjdXBhbmN5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB4ID0gc2hpcE9jY3VwYW5jeVtpXVswXTtcbiAgICAgICAgICAgIGxldCB5ID0gc2hpcE9jY3VwYW5jeVtpXVsxXTtcbiAgICAgICAgICAgIGdhbWVCb2FyZC5zcGFjZXNbeF1beV0gPSBuZXdTaGlwO1xuICAgICAgICAgICAgbGV0IHRhcmdldFNwYWNlID0gc3BhY2VFbGVtZW50c1t4XVt5XTtcbiAgICAgICAgICAgIHRhcmdldFNwYWNlLmNsYXNzTGlzdC5yZW1vdmUoJ2dob3N0Jyk7XG4gICAgICAgICAgICB0YXJnZXRTcGFjZS5jbGFzc0xpc3QuYWRkKCdjYXJyaWVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgZ2FtZUJvYXJkLnNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFsbFNoaXBzU3VuaygpIHtcbiAgICAgICAgcmV0dXJuIGdhbWVCb2FyZC5zaGlwcy5ldmVyeShcbiAgICAgICAgICAgIChzaGlwKSA9PiBzaGlwLnN1bmsgPT09IHRydWUsXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNBdHRhY2tPdXRPZkJvdW5kcyh4LCB5KSB7XG4gICAgICAgIGlmICghKCh4IDwgMTAgJiYgeCA+PSAwKSAmJiAoeSA8IDEwICYmIHkgPj0gMCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhjb29yZCkge1xuICAgICAgICBjb25zdCB4ID0gY29vcmRbMF07XG4gICAgICAgIGNvbnN0IHkgPSBjb29yZFsxXTtcblxuICAgICAgICBpZiAoaXNBdHRhY2tPdXRPZkJvdW5kcyh4LCB5KSkge1xuICAgICAgICAgICAgcmV0dXJuIFtmYWxzZSwgbnVsbF07XG4gICAgICAgIH1cbiAgICAgICAgZ2FtZUJvYXJkLnNwYWNlRWxlbWVudHNbeF1beV0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgICAgIGNvbnN0IGF0dGFja2VkU3BhY2UgPSBnYW1lQm9hcmQuc3BhY2VzW3hdW3ldO1xuICAgICAgICBpZiAoYXR0YWNrZWRTcGFjZSA9PT0gJ3gnKSB7XG4gICAgICAgICAgICByZXR1cm4gW2ZhbHNlLCBudWxsXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2FtZUJvYXJkLnNoaXBzLmluY2x1ZGVzKGF0dGFja2VkU3BhY2UpKSB7XG4gICAgICAgICAgICBhdHRhY2tlZFNwYWNlLmlzSGl0KCk7XG4gICAgICAgICAgICBnYW1lQm9hcmQuc3BhY2VFbGVtZW50c1t4XVt5XS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzBiOWMyYSc7XG4gICAgICAgICAgICByZXR1cm4gW3RydWUsICdzaGlwJ107XG4gICAgICAgIH0gaWYgKGdhbWVCb2FyZC5zcGFjZXNbeF1beV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZ2FtZUJvYXJkLnNwYWNlc1t4XVt5XSA9ICd4JztcbiAgICAgICAgICAgIGdhbWVCb2FyZC5zcGFjZUVsZW1lbnRzW3hdW3ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjYjMwNzA3JztcbiAgICAgICAgICAgIHJldHVybiBbdHJ1ZSwgJ2VtcHR5J107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtmYWxzZSwgbnVsbF07XG4gICAgfVxuXG4gICAgZ2FtZUJvYXJkID0ge1xuICAgICAgICBzaGlwcyxcbiAgICAgICAgc3BhY2VzLFxuICAgICAgICBwbGFjZVNoaXAsXG4gICAgICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgICAgIGFsbFNoaXBzU3VuayxcbiAgICAgICAgZGlzcGxheUJvYXJkLFxuICAgICAgICBnZW5lcmF0ZVNwYWNlcyxcbiAgICAgICAgc3BhY2VFbGVtZW50cyxcbiAgICAgICAgcGxheUFyZWEsXG4gICAgfTtcblxuICAgIHJldHVybiBnYW1lQm9hcmQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYXllcih0eXBlKSB7XG4gICAgY29uc3QgZ2FtZUJvYXJkID0gZ2FtZUJvYXJkRmFjdG9yeSgpO1xuICAgIGNvbnN0IG1vdmVTdGFjayA9IFtdO1xuICAgIGxldCBsYXN0TW92ZTtcblxuICAgIGlmICh0eXBlID09PSAnY3B1Jykge1xuICAgICAgICBnYW1lQm9hcmQuZGlzcGxheUJvYXJkKCk7XG4gICAgICAgIGNvbnN0IGxlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3Rocy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICBjb25zdCBvID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBnYW1lQm9hcmQucGxhY2VTaGlwKGxlbmd0aHNbaV0sIFt4LCB5XSwgbyk7XG4gICAgICAgICAgICBpZiAoIXJlcykge1xuICAgICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBnYW1lQm9hcmQuc3BhY2VFbGVtZW50cy5mb3JFYWNoKChlbGVyb3cpID0+IHtcbiAgICAgICAgICAgIGVsZXJvdy5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHBsYXllciA9IHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAgZ2FtZUJvYXJkLFxuICAgICAgICBtb3ZlU3RhY2ssXG4gICAgICAgIGxhc3RNb3ZlLFxuICAgIH07XG4gICAgcmV0dXJuIHBsYXllcjtcbn1cblxuZXhwb3J0IHsgY3JlYXRlUGxheWVyIH07XG4iLCJmdW5jdGlvbiBzaG93SG93VG8oKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50dXRDb250YWluZXInKTtcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xufVxuXG5mdW5jdGlvbiBjbG9zZUhvd1RvKCkge1xuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHV0Q29udGFpbmVyJyk7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbn1cblxuZnVuY3Rpb24gYWRkRGl2KHNlY3Rpb25IZWFkZXIsIHRleHQpIHtcbiAgICBsZXQgbmV3RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBsZXQgc2VjdGlvblRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBzZWN0aW9uSGVhZGVyO1xuICAgIHNlY3Rpb25UZXh0LnRleHRDb250ZW50ID0gdGV4dDtcblxuICAgIG5ld0Rpdi5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uRGl2Jyk7XG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgnc2VjdGlvblRpdGxlJyk7XG4gICAgc2VjdGlvblRleHQuY2xhc3NMaXN0LmFkZCgnc2VjdGlvblRleHQnKTtcblxuICAgIG5ld0Rpdi5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgbmV3RGl2LmFwcGVuZENoaWxkKHNlY3Rpb25UZXh0KTtcblxuICAgIHJldHVybiBuZXdEaXY7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkSG93VG8oKSB7XG4gICAgbGV0IHR1dG9yaWFsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IGNsb3NlYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY2xvc2VidXR0b24uaWQgPSAnY2xvc2VIb3dUbyc7XG4gICAgY2xvc2VidXR0b24udGV4dENvbnRlbnQgPSAn4pyVJztcbiAgICBjbG9zZWJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIGNsb3NlSG93VG8pO1xuICAgIHR1dG9yaWFsQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsb3NlYnV0dG9uKTtcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIHR1dG9yaWFsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0dXRDb250YWluZXJcIik7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIkhvdyB0byBQbGF5IVwiO1xuICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ3R1dEhlYWRlcicpO1xuICAgIHR1dG9yaWFsQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcblxuICAgIHR1dG9yaWFsQ29udGFpbmVyLmFwcGVuZENoaWxkKGFkZERpdignUGxhY2luZyBTaGlwcycsIGBTaGlwcyBjYW4gYmUgcGxhY2VkIG9uIHRoZSBib2FyZCBieSBsZWZ0IGNsaWNraW5nIGEgY2VsbC4gXG4gICAgWW91IG1heSByb3RhdGUgeW91ciBjdXJyZW50IHNoaXAgYnkgcHJlc3Npbmcgc3BhY2ViYXIuIFlvdSBoYXZlIDUgc2hpcHMgdG8gcGxhY2Ugb24gdGhlIGJvYXJkLiBBIGNhcnJpZXIgKDUgc3BhY2VzKSwgXG4gICAgYSBiYXR0bGVzaGlwICg0IHNwYWNlcyksIGEgc3VibWFyaW5lICgzIHNwYWNlcyksIGEgY3J1aXNlciwgYW5kIGEgZGVzdHJveWVyICgyIHNwYWNlcykuIE9uY2UgYWxsIHNoaXBzIGFyZSBwbGFjZWQsIHlvdSBtYXlcbiAgICBiZWdpbi5gKSk7XG5cbiAgICB0dXRvcmlhbENvbnRhaW5lci5hcHBlbmRDaGlsZChhZGREaXYoJ1BsYXlpbmcnLCBgQ2xpY2sgYSBjZWxsIG9uIHRoZSBvcHBvbmVudHMgYm9hcmQgdG8gbGF1bmNoIGFuIGF0dGFjay4gSWYgeW91IGhpdCBhICBzaGlwLCB0aGUgY2VsbCB3aWxsXG4gICAgdHVybiAoYmx1ZSkuIElmIHlvdSBtaXNzLCB0aGUgY2VsbCB3aWxsIHR1cm4gcmVkLiBTaW5rIGFsbCBvZiB0aGUgb3Bwb25lbnQncyBzaGlwcyB0byB3aW4gdGhlIGdhbWUhYCkpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKHR1dG9yaWFsQ29udGFpbmVyKTtcbn1cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hvd1RvJykuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBzaG93SG93VG8pO1xuXG5leHBvcnQgeyBidWlsZEhvd1RvIH07XG4iLCJjb25zdCBzaGlwTmFtZXMgPSBbXG4gICAgJ2NhcnJpZXInLFxuICAgICdiYXR0bGVzaGlwJyxcbiAgICAnc3VibWFyaW5lJyxcbiAgICAnY3J1aXNlcicsXG4gICAgJ2Rlc3Ryb3llcicsXG5dO1xuXG5leHBvcnQgeyBzaGlwTmFtZXMgfTtcbiIsImltcG9ydCB7IHNoaXBOYW1lcyB9IGZyb20gJy4vbGVuZ3Roc1RvTmFtZXMnO1xuaW1wb3J0IHsgZGlzcGxheUluc3RydWN0aW9ucyB9IGZyb20gJy4vZGlzcGxheUluc3RydWN0aW9ucyc7XG5cbmxldCBtb3VzZXBvc2l0aW9uO1xuXG5mdW5jdGlvbiBhbGxvd1NoaXBQbGFjZW1lbnQobGVuZ3RoLCBwbGF5ZXJzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGNvbnN0IGJvYXJkQ2VsbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdib2FyZFNwYWNlJyk7XG4gICAgICAgIGxldCBvcmllbnRhdGlvbiA9IDA7XG4gICAgICAgIGNvbnN0IGdldEFmZmVjdGVkU3F1YXJlcyA9ICh4LCB5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxscyA9IFtdO1xuICAgICAgICAgICAgbGV0IGNvb3JkcyA9IHBsYXllcnNbMF0uZ2FtZUJvYXJkLmdlbmVyYXRlU3BhY2VzKG9yaWVudGF0aW9uLCBsZW5ndGgsIHgsIHkpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgeGkgPSBjb29yZHNbaV1bMF07XG4gICAgICAgICAgICAgICAgbGV0IHlpID0gY29vcmRzW2ldWzFdO1xuICAgICAgICAgICAgICAgIGxldCB0aGlzQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz1cIiR7eGl9XCJdW2RhdGEtY29sPVwiJHt5aX1cIl1gKTtcbiAgICAgICAgICAgICAgICBjZWxscy5wdXNoKHRoaXNDZWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjZWxscztcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB1cGRhdGVTaGlwRGlzcGxheSA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0aGlzQ2VsbCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQobW91c2Vwb3NpdGlvblswXSwgbW91c2Vwb3NpdGlvblsxXSk7XG4gICAgICAgICAgICBpZiAoIXRoaXNDZWxsLmNsYXNzTGlzdC5jb250YWlucygnYm9hcmRTcGFjZScpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHggPSBOdW1iZXIodGhpc0NlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpKTtcbiAgICAgICAgICAgIGxldCB5ID0gTnVtYmVyKHRoaXNDZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2wnKSk7XG4gICAgICAgICAgICBsZXQgY2VsbHMgPSBnZXRBZmZlY3RlZFNxdWFyZXMoeCwgeSk7XG4gICAgICAgICAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwgIT09IG51bGwgJiYgY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2dob3N0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdnaG9zdCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2VsbCAhPT0gbnVsbCAmJiAhY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2dob3N0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdnaG9zdCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHJvdGF0ZVNoaXAgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlICE9PSAzMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVwZGF0ZVNoaXBEaXNwbGF5KCk7XG4gICAgICAgICAgICBpZiAob3JpZW50YXRpb24gPT09IDEpIHtcbiAgICAgICAgICAgICAgICBvcmllbnRhdGlvbiA9IDA7XG4gICAgICAgICAgICB9IGVsc2UgeyBvcmllbnRhdGlvbiA9IDE7IH1cbiAgICAgICAgICAgIHVwZGF0ZVNoaXBEaXNwbGF5KCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBsaWdodFNxdWFyZSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IHggPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpO1xuICAgICAgICAgICAgbGV0IHkgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbCcpO1xuICAgICAgICAgICAgY29uc3QgY2VsbHMgPSBnZXRBZmZlY3RlZFNxdWFyZXMoTnVtYmVyKHgpLCBOdW1iZXIoeSkpO1xuICAgICAgICAgICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjZWxsICE9PSBudWxsKSB7IGNlbGwuY2xhc3NMaXN0LmFkZCgnZ2hvc3QnKTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHVubGlnaHRTcXVhcmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGxldCB4ID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yb3cnKTtcbiAgICAgICAgICAgIGxldCB5ID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb2wnKTtcbiAgICAgICAgICAgIGNvbnN0IGNlbGxzID0gZ2V0QWZmZWN0ZWRTcXVhcmVzKE51bWJlcih4KSwgTnVtYmVyKHkpKTtcbiAgICAgICAgICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbCAhPT0gbnVsbCkgeyBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2dob3N0Jyk7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHJlcG9ydENlbGxDb29yZGluYXRlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBsZXQgc3BhY2UgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICBsZXQgY29vcmRzID0gW107XG4gICAgICAgICAgICBjb29yZHMucHVzaChzcGFjZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93JykpO1xuICAgICAgICAgICAgY29vcmRzLnB1c2goc3BhY2UuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbCcpKTtcbiAgICAgICAgICAgIGxldCByZXMgPSBwbGF5ZXJzWzBdLmdhbWVCb2FyZC5wbGFjZVNoaXAobGVuZ3RoLCBjb29yZHMsIG9yaWVudGF0aW9uKTtcbiAgICAgICAgICAgIGlmICghcmVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEFycmF5LmZyb20oYm9hcmRDZWxscykuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNlbGwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZXBvcnRDZWxsQ29vcmRpbmF0ZSk7XG4gICAgICAgICAgICAgICAgY2VsbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgbGlnaHRTcXVhcmUpO1xuICAgICAgICAgICAgICAgIGNlbGwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHVubGlnaHRTcXVhcmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHJvdGF0ZVNoaXApO1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHJvdGF0ZVNoaXApO1xuXG4gICAgICAgIEFycmF5LmZyb20oYm9hcmRDZWxscykuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlcG9ydENlbGxDb29yZGluYXRlKTtcbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGxpZ2h0U3F1YXJlKTtcbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHVubGlnaHRTcXVhcmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcGxhY2VTaGlwcyhwbGF5ZXJzKSB7XG4gICAgbGV0IHNoaXBMZW5ndGhzID0gWzUsIDQsIDMsIDMsIDJdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tYXdhaXQtaW4tbG9vcCAqL1xuICAgICAgICBkaXNwbGF5SW5zdHJ1Y3Rpb25zKGBQbGFjZSB5b3VyICR7c2hpcE5hbWVzW2ldfSFgKTtcbiAgICAgICAgYXdhaXQgYWxsb3dTaGlwUGxhY2VtZW50KHNoaXBMZW5ndGhzW2ldLCBwbGF5ZXJzKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Vycm9yJykudGV4dENvbnRlbnQgPSBgYDtcbiAgICB9XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby1hd2FpdC1pbi1sb29wICovXG4gICAgZGlzcGxheUluc3RydWN0aW9ucygnUHJlc3MgdGhlIGJ1dHRvbiB0byBzdGFydCEnKTtcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XG4gICAgbW91c2Vwb3NpdGlvbiA9IFtlLmNsaWVudFgsIGUuY2xpZW50WV07XG59KTtcblxuZXhwb3J0IHsgcGxhY2VTaGlwcyB9O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc3RhbnQtY29uZGl0aW9uICovXG5mdW5jdGlvbiBwbGF5ZXJJbnB1dChhY3RpdmVQbGF5ZXIsIGluYWN0aXZlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGxldCBkaXNhYmxlQm9hcmRDb250cm9sID0gKCkgPT4ge307XG5cbiAgICAgICAgY29uc3QgcmVnaXN0ZXJBdHRhY2sgPSAoZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGNlbGwgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIGxldCB4ID0gTnVtYmVyKGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpKTtcbiAgICAgICAgICAgIGxldCB5ID0gTnVtYmVyKGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbCcpKTtcbiAgICAgICAgICAgIGxldCByZXMgPSBpbmFjdGl2ZS5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhbeCwgeV0pO1xuICAgICAgICAgICAgaWYgKCFyZXNbMF0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaXNhYmxlQm9hcmRDb250cm9sKGluYWN0aXZlKTtcbiAgICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgZGlzYWJsZUJvYXJkQ29udHJvbCA9IChwKSA9PiB7XG4gICAgICAgICAgICBwLmdhbWVCb2FyZC5zcGFjZUVsZW1lbnRzLmZvckVhY2goKHJvdykgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvd1tpXS5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHJlZ2lzdGVyQXR0YWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBlbmFibGVCb2FyZENvbnRyb2wgPSAocCkgPT4ge1xuICAgICAgICAgICAgcC5nYW1lQm9hcmQuc3BhY2VFbGVtZW50cy5mb3JFYWNoKChyb3cpID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICByb3dbaV0uYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCByZWdpc3RlckF0dGFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcG9wdWxhdGVTdGFjayA9ICh4LCB5LCBoaXRUeXBlLCBwKSA9PiB7XG4gICAgICAgICAgICBpZiAoaGl0VHlwZSA9PT0gJ3NoaXAnICYmIHAubW92ZVN0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIHVwLCBkb3duLCBsZWZ0LCByaWdodFxuICAgICAgICAgICAgICAgIHAubW92ZVN0YWNrLnB1c2goJ2VuZCcpO1xuICAgICAgICAgICAgICAgIHAubW92ZVN0YWNrLnB1c2goW3ggLSAxLCB5XSk7XG4gICAgICAgICAgICAgICAgcC5tb3ZlU3RhY2sucHVzaChbeCArIDEsIHldKTtcbiAgICAgICAgICAgICAgICBwLm1vdmVTdGFjay5wdXNoKFt4LCB5IC0gMV0pO1xuICAgICAgICAgICAgICAgIHAubW92ZVN0YWNrLnB1c2goW3gsIHkgKyAxXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhpdFR5cGUgPT09ICdzaGlwJyAmJiBwLm1vdmVTdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByZXYgPSBwLmxhc3RNb3ZlO1xuICAgICAgICAgICAgICAgIGlmIChwcmV2WzBdID4geCkge1xuICAgICAgICAgICAgICAgICAgICBwLm1vdmVTdGFjay5wdXNoKFt4IC0gMSwgeV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJldlswXSA8IHgpIHtcbiAgICAgICAgICAgICAgICAgICAgcC5tb3ZlU3RhY2sucHVzaChbeCArIDEsIHldKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByZXZbMV0gPiB5KSB7XG4gICAgICAgICAgICAgICAgICAgIHAubW92ZVN0YWNrLnB1c2goW3gsIHkgLSAxXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcmV2WzFdIDwgeSkge1xuICAgICAgICAgICAgICAgICAgICBwLm1vdmVTdGFjay5wdXNoKFt4LCB5ICsgMV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjbGVhclF1ZXVlSWZTaGlwU3VuayA9ICh4LCB5KSA9PiB7XG4gICAgICAgICAgICBsZXQgc3BhY2UgPSBpbmFjdGl2ZS5nYW1lQm9hcmQuc3BhY2VzW3hdW3ldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAoc3BhY2UpID09PSAnb2JqZWN0JyAmJiBzcGFjZS5zdW5rKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGFjdGl2ZVBsYXllci5tb3ZlU3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVQbGF5ZXIubW92ZVN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBnZXRDUFVDb29yZGluYXRlcyA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCB4O1xuICAgICAgICAgICAgbGV0IHk7XG4gICAgICAgICAgICBpZiAoYWN0aXZlUGxheWVyLm1vdmVTdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRNb3ZlID0gYWN0aXZlUGxheWVyLm1vdmVTdGFjay5wb3AoKTtcbiAgICAgICAgICAgICAgICBbeCwgeV0gPSBuZXh0TW92ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFt4LCB5XTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYWN0aXZlUGxheWVyLnR5cGUgPT09ICdjcHUnKSB7XG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIGxldCBbeCwgeV0gPSBnZXRDUFVDb29yZGluYXRlcygpO1xuICAgICAgICAgICAgICAgIGxldCByZXMgPSBpbmFjdGl2ZS5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhbeCwgeV0pO1xuICAgICAgICAgICAgICAgIGlmIChyZXNbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcG9wdWxhdGVTdGFjayh4LCB5LCByZXNbMV0sIGFjdGl2ZVBsYXllcik7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVBsYXllci5sYXN0TW92ZSA9IFt4LCB5XTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJRdWV1ZUlmU2hpcFN1bmsoeCwgeSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRpc2FibGVCb2FyZENvbnRyb2woaW5hY3RpdmUpO1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbmFibGVCb2FyZENvbnRyb2woaW5hY3RpdmUpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgeyBwbGF5ZXJJbnB1dCB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vZm9udC9Jcm9uTWFuT2ZXYXIyTmN2LUU4NWwudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9mb250L0RpZGFjdEdvdGhpYy1SZWd1bGFyLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4vaW1nL3dhdGVyLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBcbkBmb250LWZhY2Uge1xuXHRmb250LWZhbWlseTogJ2lyb25tYW4nO1xuXHRzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX199KTtcbn1cblxuQGZvbnQtZmFjZSB7XG5cdGZvbnQtZmFtaWx5OiAnZGlkYWN0LWdvdGhpYyc7XG5cdHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fX30pO1xufVxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcbmIsIHUsIGksIGNlbnRlcixcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcblx0bWFyZ2luOiAwO1xuXHRwYWRkaW5nOiAwO1xuXHRib3JkZXI6IDA7XG5cdGZvbnQtc2l6ZTogMTAwJTtcblx0Zm9udDogaW5oZXJpdDtcblx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xufVxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xuXHRkaXNwbGF5OiBibG9jaztcbn1cbmJvZHkge1xuXHRsaW5lLWhlaWdodDogMTtcbn1cbm9sLCB1bCB7XG5cdGxpc3Qtc3R5bGU6IG5vbmU7XG59XG5ibG9ja3F1b3RlLCBxIHtcblx0cXVvdGVzOiBub25lO1xufVxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXG5xOmJlZm9yZSwgcTphZnRlciB7XG5cdGNvbnRlbnQ6ICcnO1xuXHRjb250ZW50OiBub25lO1xufVxudGFibGUge1xuXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuXHRib3JkZXItc3BhY2luZzogMDtcbn1cblxuYm9keSB7XG5cdGZvbnQtZmFtaWx5OiAnaXJvbm1hbicsIEdlb3JnaWEsICdUaW1lcyBOZXcgUm9tYW4nLCBUaW1lcywgc2VyaWY7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGhlaWdodDoxMDB2aDtcblx0YmFja2dyb3VuZC1jb2xvcjogI2JiYmJiYjtcblx0ZGlzcGxheTogZ3JpZDtcblx0Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG5cdGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDhmciAuNWZyO1xuXHRncmlkLWNvbHVtbi1nYXA6IDBweDtcblx0Z3JpZC1yb3ctZ2FwOiA1cHg7XG5cdHBvc2l0aW9uOnJlbGF0aXZlO1xufVxuXG4uaGVhZGVyIHtcblx0ZGlzcGxheTogZmxleDtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0aGVpZ2h0OjEwMCU7XG59XG5cbi5oZWFkaW5nLXRhYnMge1xuXHRkaXNwbGF5OmZsZXg7XG5cdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG5cdG1hcmdpbi1sZWZ0OiBhdXRvO1xuXHRnYXA6IDEwcHg7XG5cdG1hcmdpbi1yaWdodDogMTZweDtcblx0aGVpZ2h0OjkwJTtcbn1cblxuLmhlYWRpbmctdGFicyBsaSB7XG5cdGhlaWdodDo1MCU7XG5cdGJhY2tncm91bmQtY29sb3I6IHJnYigxNDUsIDE3MywgMjExKTtcblx0Ym9yZGVyLXN0eWxlOiBzb2xpZDtcblx0Ym9yZGVyLXdpZHRoOiAycHg7XG5cdGJvcmRlci1jb2xvcjogcmdiYSgyMywgNjgsIDEzMywgMC4xNzgpO1xuXHRib3JkZXItcmFkaXVzOiA0cHg7XG5cdGRpc3BsYXk6IGZsZXg7XG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRmb250LWZhbWlseTogJ2RpZGFjdC1nb3RoaWMnLCBzYW5zLXNlcmlmO1xuXHRwYWRkaW5nOiAwcHggMTJweDtcblx0Y29sb3I6IHdoaXRlc21va2U7XG5cdGZvbnQtd2VpZ2h0OiA3MDA7XG5cdHRyYW5zaXRpb246IGFsbCAxcyBlYXNlLWluO1xufVxuXG4uaGVhZGluZy10YWJzIGxpOmhvdmVyIHtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjMWE0YTc1O1xufVxuXG4ubWFpbiB7XG5cdGRpc3BsYXk6ZmxleDtcblx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cdGdhcDogMnZoO1xuXHRoZWlnaHQ6IDEwMCU7XG59XG5cbmJ1dHRvbiB7XG5cdGZvbnQtZmFtaWx5OiAnZGlkYWN0LWdvdGhpYycsIHNhbnMtc2VyaWY7XG59XG5cbi5pbml0aWFsRGl2IHtcblx0aGVpZ2h0OiA1MHZoO1xuXHR3aWR0aDogNjB2dztcblx0ZGlzcGxheTogZmxleDtcblx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cdGJvcmRlci1yYWRpdXM6IDMzcHg7XG5cdGdhcDogMXJlbTtcblx0Ym9yZGVyOiA4cHggc29saWQgIzAwMjU0NmE4O1xuXHRiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTQ1ZGVnLCAjMTYzZTYyLCAjMWE0YTc1KTtcblx0Ym94LXNoYWRvdzogIDE2cHggMTZweCAxOXB4ICMxNjQwNjUsXG4gICAgICAgICAgICAgLTE2cHggLTE2cHggMTlweCAjMWE0YTc1O1xufVxuXG4jZXJyb3IsXG4jaW5zdHJ1Y3Rpb25zIHtcblx0Zm9udC1mYW1pbHk6ICdpcm9ubWFuJywgc2Fucy1zZXJpZjtcblx0bGV0dGVyLXNwYWNpbmc6IDJweDtcbn1cblxuLnRpdGxlIHtcblx0Zm9udC1mYW1pbHk6ICdpcm9ubWFuJywgc2Fucy1zZXJpZjtcblx0Zm9udC1zaXplOiA2cmVtO1xuXHRsZXR0ZXItc3BhY2luZzogMTBweDtcblx0LXdlYmtpdC10ZXh0LXN0cm9rZS1jb2xvcjogIzAwMjY0Nztcblx0LXdlYmtpdC10ZXh0LXN0cm9rZS13aWR0aDogMnB4O1xuXHRiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCgjZWVlLCAjOGQ4ZDhkKTtcblx0LXdlYmtpdC1iYWNrZ3JvdW5kLWNsaXA6IHRleHQ7XG5cdC13ZWJraXQtdGV4dC1maWxsLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0b3BhY2l0eTogMDtcblx0dHJhbnNpdGlvbjogYWxsIDJzO1xuXHRwb3NpdGlvbjpyZWxhdGl2ZTtcblx0dG9wOiAtMjUlO1xufVxuXG4udGl0bGUuc2hvdyB7XG5cdG9wYWNpdHk6MTtcblx0dG9wOjA7XG59XG5cbi5nYW1lQXJlYSB7XG5cdHdpZHRoOiA5MHZ3O1xuXHRoZWlnaHQ6IDkwJTtcblx0ZGlzcGxheTpmbGV4O1xuXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0Ym9yZGVyOjJweCBzb2xpZCBibGFjaztcbn1cblxuLmJvYXJkQXJlYSB7XG4gICAgd2lkdGg6IGNsYW1wKDE1MHB4LCAzMCUsIDQwJSk7XG4gICAgYXNwZWN0LXJhdGlvOiAxIC8gMTtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xuICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMDI2NDc7XG5cdGJhY2tncm91bmQtaW1hZ2U6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX199KTtcblx0YmFja2dyb3VuZC1zaXplOiBjb3Zlcjtcbn1cblxuLnBsYXllckFyZWEge1xuXHRkaXNwbGF5OiBmbGV4O1xuXHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0aGVpZ2h0OjEwMCU7XG5cdHdpZHRoOjEwMCU7XG5cdHRyYW5zaXRpb246IGFsbCAxLjVzO1xufVxuXG4ucGxheWVyQXJlYTpmaXJzdC1jaGlsZCB7XG5cdGJvcmRlci1yaWdodDogc29saWQgMnB4IGJsYWNrO1xufVxuXG4ucGxheWVyQXJlYS5lbmxhcmdle1xuXHR3aWR0aDo4MCU7XG59XG5cbi5wbGF5ZXJBcmVhLnNtYWxsZXIge1xuXHR3aWR0aDoyMCU7XG59XG5cbi5ib2FyZEFyZWE6aG92ZXIge1xuXHRjdXJzb3I6IGNyb3NzaGFpcjtcbn1cblxuLmJvYXJkU3BhY2Uge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuXHR0cmFuc2l0aW9uOiBhbGwgLjVzO1xufVxuXG4uY2FycmllciB7XG5cdGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcbn1cblxuLmdob3N0IHtcblx0YmFja2dyb3VuZC1jb2xvcjogZ3JleTtcbn1cblxuI2Vycm9yIHtcblx0Y29sb3I6cmVkO1xuXHRmb250LXNpemU6IDJyZW07XG5cdGhlaWdodDogMnJlbTtcbn1cblxuI2luc3RydWN0aW9ucyB7XG5cdGZvbnQtc2l6ZTogM3JlbTtcblx0Zm9udC13ZWlnaHQ6IGJvbGQ7XG5cdGNvbG9yOiAjMDAyNjQ3O1xufVxuXG4uaGlkZSB7XG5cdGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG4uZ2FtZWJ0bntcblx0bWluLXdpZHRoOiAxMzBweDtcblx0aGVpZ2h0OiAyMCU7XG5cdHdpZHRoOiAyNSU7XG5cdGZvbnQtc2l6ZTogMS40cmVtO1xuXHRjb2xvcjogI2ZmZjtcblx0cGFkZGluZzogNXB4IDEwcHg7XG5cdGZvbnQtd2VpZ2h0OiBib2xkO1xuXHRjdXJzb3I6IHBvaW50ZXI7XG5cdHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXHRvdXRsaW5lOiBub25lO1xuXHRib3JkZXItcmFkaXVzOiA1cHg7XG5cdGJvcmRlcjogNHB4IHNvbGlkICNiNGNhZmEzMTtcblx0YmFja2dyb3VuZDogIzFhNGE3NTtcbiAgfVxuICAuZ2FtZWJ0bjpob3ZlciB7XG5cdGJhY2tncm91bmQ6ICNmZmY7XG5cdGNvbG9yOiAjMWE0YTc1O1xuXHRib3JkZXItY29sb3I6ICMwMDI2NDc7XG4gIH1cblxuLmZvb3RlciB7XG5cdGhlaWdodDogMTAwJTtcblx0YmFja2dyb3VuZC1jb2xvcjogIzc3Nzc3Nztcblx0d2lkdGg6IDEwMHZ3O1xuXHRwb3NpdGlvbjpyZWxhdGl2ZTtcblx0ei1pbmRleDogNDtcblx0ZGlzcGxheTpmbGV4O1xuXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmZvb3Rlci10ZXh0IHtcblx0Zm9udC1zaXplOiAxLjJyZW07XG5cdGxldHRlci1zcGFjaW5nOiAxcHg7XG59XG5cbi5mb290ZXItdGV4dCBhe1xuXHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XG5cdGNvbG9yOiAjMWE0YTc1O1xufVxuXG4ud2F2ZXMge1xuXHRwb3NpdGlvbjphYnNvbHV0ZTtcblx0dG9wOjY1JTtcblx0cmlnaHQ6MDtcblx0d2lkdGg6MTAwdnc7XG59XG5cbi53YXZlc3ZnIHtcblx0d2lkdGg6MTAwdnc7XG59XG5cbi50dXRDb250YWluZXIge1xuXHRvdmVyZmxvdzogYXV0bztcblx0aGVpZ2h0OiA2MHZoO1xuXHR3aWR0aDogMjB2dztcblx0YmFja2dyb3VuZC1jb2xvcjogI2M5YzljOTtcblx0Ym9yZGVyOiA0cHggc29saWQgIzE2NDA2NTtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHR0b3A6IC04MCU7XG5cdGxlZnQ6IDQwJTtcblx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIDJzIGVhc2UtaW4tb3V0O1xuXHRkaXNwbGF5OiBmbGV4O1xuXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRwYWRkaW5nOiAxcmVtIDA7XG5cdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdGJvcmRlci1yYWRpdXM6IDFyZW07XG5cdHotaW5kZXg6IDUwO1xufVxuXG4udHV0Q29udGFpbmVyLnNob3cge1xuXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTUwJSk7XG59XG5cbi50dXRIZWFkZXIge1xuXHRmb250LWZhbWlseTogJ2lyb25tYW4nLCBzYW5zLXNlcmlmO1xuXHRmb250LXNpemU6IDNyZW07XG5cdGxldHRlci1zcGFjaW5nOiA0cHg7XG5cdHRleHQtYWxpZ246IGNlbnRlcjtcblx0LXdlYmtpdC10ZXh0LXN0cm9rZS1jb2xvcjogIzAwMjY0NzdhO1xuXHQtd2Via2l0LXRleHQtc3Ryb2tlLXdpZHRoOiAzcHg7XG5cdHdpZHRoOjEwMCU7XG5cdGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjMDAyNjQ3O1xufVxuXG4jY2xvc2VIb3dUbyB7XG5cdGhlaWdodDogMTZweDtcblx0YXNwZWN0LXJhdGlvOiAxIC8gMTtcblx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDAsIDAsIDApO1xuXHRib3JkZXI6IDJweCBzb2xpZCBibGFjaztcblx0cG9zaXRpb246YWJzb2x1dGU7XG5cdHRvcDogMSU7XG5cdHJpZ2h0OiAxJTtcblx0ZGlzcGxheTpmbGV4O1xuXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRmb250LXNpemU6IDEycHg7XG5cdGJvcmRlci1yYWRpdXM6IDUwJTtcbn1cblxuI2Nsb3NlSG93VG86aG92ZXIge1xuXHRjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5zZWN0aW9uRGl2IHtcblx0ZGlzcGxheTogZmxleDtcblx0d2lkdGg6MTAwJTtcblx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdHBhZGRpbmc6IDFyZW0gMDtcblx0Z2FwOiAuNXJlbTtcblx0Ym9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIGJsYWNrO1xufVxuXG4uc2VjdGlvblRpdGxlIHtcblx0Zm9udC1mYW1pbHk6ICdpcm9ubWFuJywgc2Fucy1zZXJpZjtcblx0Zm9udC1zaXplOiAycmVtO1xuXHRsZXR0ZXItc3BhY2luZzogM3B4O1xuXHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdC13ZWJraXQtdGV4dC1zdHJva2UtY29sb3I6ICMwMDI2NDc3YTtcblx0LXdlYmtpdC10ZXh0LXN0cm9rZS13aWR0aDogMnB4O1xuXHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1cblxuLnNlY3Rpb25UZXh0IHtcblx0Zm9udC1zaXplOiAxcmVtO1xuXHR3aWR0aDogOTAlO1xuXHRmb250LWZhbWlseTogJ2RpZGFjdC1nb3RoaWMnLCBzYW5zLXNlcmlmO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQ0E7Q0FDQyxzQkFBc0I7Q0FDdEIsNENBQTRDO0FBQzdDOztBQUVBO0NBQ0MsNEJBQTRCO0NBQzVCLDRDQUEyQztBQUM1QztBQUNBOzs7Ozs7Ozs7Ozs7O0NBYUMsU0FBUztDQUNULFVBQVU7Q0FDVixTQUFTO0NBQ1QsZUFBZTtDQUNmLGFBQWE7Q0FDYix3QkFBd0I7QUFDekI7QUFDQSxnREFBZ0Q7QUFDaEQ7O0NBRUMsY0FBYztBQUNmO0FBQ0E7Q0FDQyxjQUFjO0FBQ2Y7QUFDQTtDQUNDLGdCQUFnQjtBQUNqQjtBQUNBO0NBQ0MsWUFBWTtBQUNiO0FBQ0E7O0NBRUMsV0FBVztDQUNYLGFBQWE7QUFDZDtBQUNBO0NBQ0MseUJBQXlCO0NBQ3pCLGlCQUFpQjtBQUNsQjs7QUFFQTtDQUNDLGdFQUFnRTtJQUM3RCxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixZQUFZO0NBQ2YseUJBQXlCO0NBQ3pCLGFBQWE7Q0FDYiwwQkFBMEI7Q0FDMUIsZ0NBQWdDO0NBQ2hDLG9CQUFvQjtDQUNwQixpQkFBaUI7Q0FDakIsaUJBQWlCO0FBQ2xCOztBQUVBO0NBQ0MsYUFBYTtDQUNiLG1CQUFtQjtDQUNuQixXQUFXO0FBQ1o7O0FBRUE7Q0FDQyxZQUFZO0NBQ1osbUJBQW1CO0NBQ25CLHlCQUF5QjtDQUN6QixpQkFBaUI7Q0FDakIsU0FBUztDQUNULGtCQUFrQjtDQUNsQixVQUFVO0FBQ1g7O0FBRUE7Q0FDQyxVQUFVO0NBQ1Ysb0NBQW9DO0NBQ3BDLG1CQUFtQjtDQUNuQixpQkFBaUI7Q0FDakIsc0NBQXNDO0NBQ3RDLGtC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QW1CO0NBQ25CLGVBQWU7Q0FDZixzQkFBc0I7Q0FDdEIsbUJBQW1CO0NBQ25CLFdBQVc7QUFDWjs7QUFFQTtDQUNDLDJCQUEyQjtBQUM1Qjs7QUFFQTtDQUNDLGtDQUFrQztDQUNsQyxlQUFlO0NBQ2YsbUJBQW1CO0NBQ25CLGtCQUFrQjtDQUNsQixvQ0FBb0M7Q0FDcEMsOEJBQThCO0NBQzlCLFVBQVU7Q0FDVixnQ0FBZ0M7QUFDakM7O0FBRUE7Q0FDQyxZQUFZO0NBQ1osbUJBQW1CO0NBQ25CLG9DQUFvQztDQUNwQyx1QkFBdUI7Q0FDdkIsaUJBQWlCO0NBQ2pCLE9BQU87Q0FDUCxTQUFTO0NBQ1QsWUFBWTtDQUNaLHVCQUF1QjtDQUN2QixtQkFBbUI7Q0FDbkIsa0JBQWtCO0NBQ2xCLGVBQWU7Q0FDZixrQkFBa0I7QUFDbkI7O0FBRUE7Q0FDQyxlQUFlO0FBQ2hCOztBQUVBO0NBQ0MsYUFBYTtDQUNiLFVBQVU7Q0FDVixzQkFBc0I7Q0FDdEIsdUJBQXVCO0NBQ3ZCLG1CQUFtQjtDQUNuQixlQUFlO0NBQ2YsVUFBVTtDQUNWLDhCQUE4QjtBQUMvQjs7QUFFQTtDQUNDLGtDQUFrQztDQUNsQyxlQUFlO0NBQ2YsbUJBQW1CO0NBQ25CLGtCQUFrQjtDQUNsQixvQ0FBb0M7Q0FDcEMsOEJBQThCO0NBQzlCLDBCQUEwQjtBQUMzQjs7QUFFQTtDQUNDLGVBQWU7Q0FDZixVQUFVO0NBQ1Ysd0NBQXdDO0FBQ3pDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIlxcbkBmb250LWZhY2Uge1xcblxcdGZvbnQtZmFtaWx5OiAnaXJvbm1hbic7XFxuXFx0c3JjOiB1cmwoJy4vZm9udC9Jcm9uTWFuT2ZXYXIyTmN2LUU4NWwudHRmJyk7XFxufVxcblxcbkBmb250LWZhY2Uge1xcblxcdGZvbnQtZmFtaWx5OiAnZGlkYWN0LWdvdGhpYyc7XFxuXFx0c3JjOiB1cmwoJy4vZm9udC9EaWRhY3RHb3RoaWMtUmVndWxhci50dGYnKTtcXG59XFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRib3JkZXI6IDA7XFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcblxcdGZvbnQ6IGluaGVyaXQ7XFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxufVxcbm9sLCB1bCB7XFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXG59XFxuYmxvY2txdW90ZSwgcSB7XFxuXFx0cXVvdGVzOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0Y29udGVudDogbm9uZTtcXG59XFxudGFibGUge1xcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcblxcdGZvbnQtZmFtaWx5OiAnaXJvbm1hbicsIEdlb3JnaWEsICdUaW1lcyBOZXcgUm9tYW4nLCBUaW1lcywgc2VyaWY7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBoZWlnaHQ6MTAwdmg7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogI2JiYmJiYjtcXG5cXHRkaXNwbGF5OiBncmlkO1xcblxcdGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xcblxcdGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDhmciAuNWZyO1xcblxcdGdyaWQtY29sdW1uLWdhcDogMHB4O1xcblxcdGdyaWQtcm93LWdhcDogNXB4O1xcblxcdHBvc2l0aW9uOnJlbGF0aXZlO1xcbn1cXG5cXG4uaGVhZGVyIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0aGVpZ2h0OjEwMCU7XFxufVxcblxcbi5oZWFkaW5nLXRhYnMge1xcblxcdGRpc3BsYXk6ZmxleDtcXG5cXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcdGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuXFx0bWFyZ2luLWxlZnQ6IGF1dG87XFxuXFx0Z2FwOiAxMHB4O1xcblxcdG1hcmdpbi1yaWdodDogMTZweDtcXG5cXHRoZWlnaHQ6OTAlO1xcbn1cXG5cXG4uaGVhZGluZy10YWJzIGxpIHtcXG5cXHRoZWlnaHQ6NTAlO1xcblxcdGJhY2tncm91bmQtY29sb3I6IHJnYigxNDUsIDE3MywgMjExKTtcXG5cXHRib3JkZXItc3R5bGU6IHNvbGlkO1xcblxcdGJvcmRlci13aWR0aDogMnB4O1xcblxcdGJvcmRlci1jb2xvcjogcmdiYSgyMywgNjgsIDEzMywgMC4xNzgpO1xcblxcdGJvcmRlci1yYWRpdXM6IDRweDtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0Zm9udC1mYW1pbHk6ICdkaWRhY3QtZ290aGljJywgc2Fucy1zZXJpZjtcXG5cXHRwYWRkaW5nOiAwcHggMTJweDtcXG5cXHRjb2xvcjogd2hpdGVzbW9rZTtcXG5cXHRmb250LXdlaWdodDogNzAwO1xcblxcdHRyYW5zaXRpb246IGFsbCAxcyBlYXNlLWluO1xcbn1cXG5cXG4uaGVhZGluZy10YWJzIGxpOmhvdmVyIHtcXG5cXHRjdXJzb3I6IHBvaW50ZXI7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogIzFhNGE3NTtcXG59XFxuXFxuLm1haW4ge1xcblxcdGRpc3BsYXk6ZmxleDtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFx0Z2FwOiAydmg7XFxuXFx0aGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5idXR0b24ge1xcblxcdGZvbnQtZmFtaWx5OiAnZGlkYWN0LWdvdGhpYycsIHNhbnMtc2VyaWY7XFxufVxcblxcbi5pbml0aWFsRGl2IHtcXG5cXHRoZWlnaHQ6IDUwdmg7XFxuXFx0d2lkdGg6IDYwdnc7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuXFx0Ym9yZGVyLXJhZGl1czogMzNweDtcXG5cXHRnYXA6IDFyZW07XFxuXFx0Ym9yZGVyOiA4cHggc29saWQgIzAwMjU0NmE4O1xcblxcdGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxNDVkZWcsICMxNjNlNjIsICMxYTRhNzUpO1xcblxcdGJveC1zaGFkb3c6ICAxNnB4IDE2cHggMTlweCAjMTY0MDY1LFxcbiAgICAgICAgICAgICAtMTZweCAtMTZweCAxOXB4ICMxYTRhNzU7XFxufVxcblxcbiNlcnJvcixcXG4jaW5zdHJ1Y3Rpb25zIHtcXG5cXHRmb250LWZhbWlseTogJ2lyb25tYW4nLCBzYW5zLXNlcmlmO1xcblxcdGxldHRlci1zcGFjaW5nOiAycHg7XFxufVxcblxcbi50aXRsZSB7XFxuXFx0Zm9udC1mYW1pbHk6ICdpcm9ubWFuJywgc2Fucy1zZXJpZjtcXG5cXHRmb250LXNpemU6IDZyZW07XFxuXFx0bGV0dGVyLXNwYWNpbmc6IDEwcHg7XFxuXFx0LXdlYmtpdC10ZXh0LXN0cm9rZS1jb2xvcjogIzAwMjY0NztcXG5cXHQtd2Via2l0LXRleHQtc3Ryb2tlLXdpZHRoOiAycHg7XFxuXFx0YmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoI2VlZSwgIzhkOGQ4ZCk7XFxuXFx0LXdlYmtpdC1iYWNrZ3JvdW5kLWNsaXA6IHRleHQ7XFxuXFx0LXdlYmtpdC10ZXh0LWZpbGwtY29sb3I6IHRyYW5zcGFyZW50O1xcblxcdG9wYWNpdHk6IDA7XFxuXFx0dHJhbnNpdGlvbjogYWxsIDJzO1xcblxcdHBvc2l0aW9uOnJlbGF0aXZlO1xcblxcdHRvcDogLTI1JTtcXG59XFxuXFxuLnRpdGxlLnNob3cge1xcblxcdG9wYWNpdHk6MTtcXG5cXHR0b3A6MDtcXG59XFxuXFxuLmdhbWVBcmVhIHtcXG5cXHR3aWR0aDogOTB2dztcXG5cXHRoZWlnaHQ6IDkwJTtcXG5cXHRkaXNwbGF5OmZsZXg7XFxuXFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuXFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXHRib3JkZXI6MnB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4uYm9hcmRBcmVhIHtcXG4gICAgd2lkdGg6IGNsYW1wKDE1MHB4LCAzMCUsIDQwJSk7XFxuICAgIGFzcGVjdC1yYXRpbzogMSAvIDE7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAgYm9yZGVyOiAycHggc29saWQgIzAwMjY0NztcXG5cXHRiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy4vaW1nL3dhdGVyLmpwZycpO1xcblxcdGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxufVxcblxcbi5wbGF5ZXJBcmVhIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuXFx0aGVpZ2h0OjEwMCU7XFxuXFx0d2lkdGg6MTAwJTtcXG5cXHR0cmFuc2l0aW9uOiBhbGwgMS41cztcXG59XFxuXFxuLnBsYXllckFyZWE6Zmlyc3QtY2hpbGQge1xcblxcdGJvcmRlci1yaWdodDogc29saWQgMnB4IGJsYWNrO1xcbn1cXG5cXG4ucGxheWVyQXJlYS5lbmxhcmdle1xcblxcdHdpZHRoOjgwJTtcXG59XFxuXFxuLnBsYXllckFyZWEuc21hbGxlciB7XFxuXFx0d2lkdGg6MjAlO1xcbn1cXG5cXG4uYm9hcmRBcmVhOmhvdmVyIHtcXG5cXHRjdXJzb3I6IGNyb3NzaGFpcjtcXG59XFxuXFxuLmJvYXJkU3BhY2Uge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG5cXHR0cmFuc2l0aW9uOiBhbGwgLjVzO1xcbn1cXG5cXG4uY2FycmllciB7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xcbn1cXG5cXG4uZ2hvc3Qge1xcblxcdGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxufVxcblxcbiNlcnJvciB7XFxuXFx0Y29sb3I6cmVkO1xcblxcdGZvbnQtc2l6ZTogMnJlbTtcXG5cXHRoZWlnaHQ6IDJyZW07XFxufVxcblxcbiNpbnN0cnVjdGlvbnMge1xcblxcdGZvbnQtc2l6ZTogM3JlbTtcXG5cXHRmb250LXdlaWdodDogYm9sZDtcXG5cXHRjb2xvcjogIzAwMjY0NztcXG59XFxuXFxuLmhpZGUge1xcblxcdGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4uZ2FtZWJ0bntcXG5cXHRtaW4td2lkdGg6IDEzMHB4O1xcblxcdGhlaWdodDogMjAlO1xcblxcdHdpZHRoOiAyNSU7XFxuXFx0Zm9udC1zaXplOiAxLjRyZW07XFxuXFx0Y29sb3I6ICNmZmY7XFxuXFx0cGFkZGluZzogNXB4IDEwcHg7XFxuXFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XFxuXFx0Y3Vyc29yOiBwb2ludGVyO1xcblxcdHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG5cXHRvdXRsaW5lOiBub25lO1xcblxcdGJvcmRlci1yYWRpdXM6IDVweDtcXG5cXHRib3JkZXI6IDRweCBzb2xpZCAjYjRjYWZhMzE7XFxuXFx0YmFja2dyb3VuZDogIzFhNGE3NTtcXG4gIH1cXG4gIC5nYW1lYnRuOmhvdmVyIHtcXG5cXHRiYWNrZ3JvdW5kOiAjZmZmO1xcblxcdGNvbG9yOiAjMWE0YTc1O1xcblxcdGJvcmRlci1jb2xvcjogIzAwMjY0NztcXG4gIH1cXG5cXG4uZm9vdGVyIHtcXG5cXHRoZWlnaHQ6IDEwMCU7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogIzc3Nzc3NztcXG5cXHR3aWR0aDogMTAwdnc7XFxuXFx0cG9zaXRpb246cmVsYXRpdmU7XFxuXFx0ei1pbmRleDogNDtcXG5cXHRkaXNwbGF5OmZsZXg7XFxuXFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuXFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmZvb3Rlci10ZXh0IHtcXG5cXHRmb250LXNpemU6IDEuMnJlbTtcXG5cXHRsZXR0ZXItc3BhY2luZzogMXB4O1xcbn1cXG5cXG4uZm9vdGVyLXRleHQgYXtcXG5cXHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuXFx0Y29sb3I6ICMxYTRhNzU7XFxufVxcblxcbi53YXZlcyB7XFxuXFx0cG9zaXRpb246YWJzb2x1dGU7XFxuXFx0dG9wOjY1JTtcXG5cXHRyaWdodDowO1xcblxcdHdpZHRoOjEwMHZ3O1xcbn1cXG5cXG4ud2F2ZXN2ZyB7XFxuXFx0d2lkdGg6MTAwdnc7XFxufVxcblxcbi50dXRDb250YWluZXIge1xcblxcdG92ZXJmbG93OiBhdXRvO1xcblxcdGhlaWdodDogNjB2aDtcXG5cXHR3aWR0aDogMjB2dztcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiAjYzljOWM5O1xcblxcdGJvcmRlcjogNHB4IHNvbGlkICMxNjQwNjU7XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdHRvcDogLTgwJTtcXG5cXHRsZWZ0OiA0MCU7XFxuXFx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIDJzIGVhc2UtaW4tb3V0O1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG5cXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcdHBhZGRpbmc6IDFyZW0gMDtcXG5cXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xcblxcdGJvcmRlci1yYWRpdXM6IDFyZW07XFxuXFx0ei1pbmRleDogNTA7XFxufVxcblxcbi50dXRDb250YWluZXIuc2hvdyB7XFxuXFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVZKDE1MCUpO1xcbn1cXG5cXG4udHV0SGVhZGVyIHtcXG5cXHRmb250LWZhbWlseTogJ2lyb25tYW4nLCBzYW5zLXNlcmlmO1xcblxcdGZvbnQtc2l6ZTogM3JlbTtcXG5cXHRsZXR0ZXItc3BhY2luZzogNHB4O1xcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHQtd2Via2l0LXRleHQtc3Ryb2tlLWNvbG9yOiAjMDAyNjQ3N2E7XFxuXFx0LXdlYmtpdC10ZXh0LXN0cm9rZS13aWR0aDogM3B4O1xcblxcdHdpZHRoOjEwMCU7XFxuXFx0Ym9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICMwMDI2NDc7XFxufVxcblxcbiNjbG9zZUhvd1RvIHtcXG5cXHRoZWlnaHQ6IDE2cHg7XFxuXFx0YXNwZWN0LXJhdGlvOiAxIC8gMTtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMCwgMCwgMCk7XFxuXFx0Ym9yZGVyOiAycHggc29saWQgYmxhY2s7XFxuXFx0cG9zaXRpb246YWJzb2x1dGU7XFxuXFx0dG9wOiAxJTtcXG5cXHRyaWdodDogMSU7XFxuXFx0ZGlzcGxheTpmbGV4O1xcblxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdGZvbnQtc2l6ZTogMTJweDtcXG5cXHRib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcblxcbiNjbG9zZUhvd1RvOmhvdmVyIHtcXG5cXHRjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5zZWN0aW9uRGl2IHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdHdpZHRoOjEwMCU7XFxuXFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcdHBhZGRpbmc6IDFyZW0gMDtcXG5cXHRnYXA6IC41cmVtO1xcblxcdGJvcmRlci1ib3R0b206IDJweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLnNlY3Rpb25UaXRsZSB7XFxuXFx0Zm9udC1mYW1pbHk6ICdpcm9ubWFuJywgc2Fucy1zZXJpZjtcXG5cXHRmb250LXNpemU6IDJyZW07XFxuXFx0bGV0dGVyLXNwYWNpbmc6IDNweDtcXG5cXHR0ZXh0LWFsaWduOiBjZW50ZXI7XFxuXFx0LXdlYmtpdC10ZXh0LXN0cm9rZS1jb2xvcjogIzAwMjY0NzdhO1xcblxcdC13ZWJraXQtdGV4dC1zdHJva2Utd2lkdGg6IDJweDtcXG5cXHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuXFxuLnNlY3Rpb25UZXh0IHtcXG5cXHRmb250LXNpemU6IDFyZW07XFxuXFx0d2lkdGg6IDkwJTtcXG5cXHRmb250LWZhbWlseTogJ2RpZGFjdC1nb3RoaWMnLCBzYW5zLXNlcmlmO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImluZGV4XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCB7IGNyZWF0ZVBsYXllciB9IGZyb20gJy4vY29tcG9uZW50cy9nYW1lX29iamVjdHMnO1xuaW1wb3J0IHsgcGxhY2VTaGlwcyB9IGZyb20gJy4vY29tcG9uZW50cy9wbGFjZVNoaXBzJztcbmltcG9ydCB7IHBsYXllcklucHV0IH0gZnJvbSAnLi9jb21wb25lbnRzL3BsYXllcklucHV0JztcbmltcG9ydCB7IGRpc3BsYXlJbnN0cnVjdGlvbnMgfSBmcm9tICcuL2NvbXBvbmVudHMvZGlzcGxheUluc3RydWN0aW9ucyc7XG5pbXBvcnQgeyBidWlsZEhvd1RvIH0gZnJvbSAnLi9jb21wb25lbnRzL2hvd1RvUGxheSc7XG5pbXBvcnQgd2F2ZXMgZnJvbSAnLi9pbWcvd2F2ZS5zdmcnO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5cbmxldCBwbGF5ZXJzID0gW107XG5cbmZ1bmN0aW9uIHJlc3RhcnRHYW1lKCkge1xuICAgIHdoaWxlIChwbGF5ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcGxheWVycy5wb3AoKTtcbiAgICB9XG4gICAgbGV0IHJlc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdGFydCcpO1xuICAgIHJlc3RhcnRCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCByZXN0YXJ0R2FtZSk7XG4gICAgcmVzdGFydEJ0bi5yZW1vdmUoKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5pdGlhbERpdicpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYWNlU2hpcHMnKS5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIGluaXRpYWxpemVHYW1lKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZXJyb3InKS50ZXh0Q29udGVudCA9ICcnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnN0cnVjdGlvbnMnKS50ZXh0Q29udGVudCA9ICcnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lQXJlYScpLnJlbW92ZSgpO1xufVxuXG5mdW5jdGlvbiB0aW1lZChpbnRlcnZhbCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIGludGVydmFsKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc3dpdGNoU2l6ZShtb2RlLCBhY3QsIGluYWN0KSB7XG4gICAgaWYgKG1vZGUgPT09IDEpIHtcbiAgICAgICAgaW5hY3QuZ2FtZUJvYXJkLnBsYXlBcmVhLmNsYXNzTGlzdC5hZGQoJ2VubGFyZ2UnKTtcbiAgICAgICAgYWN0LmdhbWVCb2FyZC5wbGF5QXJlYS5jbGFzc0xpc3QuYWRkKCdzbWFsbGVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaW5hY3QuZ2FtZUJvYXJkLnBsYXlBcmVhLmNsYXNzTGlzdC5yZW1vdmUoJ2VubGFyZ2UnKTtcbiAgICAgICAgYWN0LmdhbWVCb2FyZC5wbGF5QXJlYS5jbGFzc0xpc3QucmVtb3ZlKCdzbWFsbGVyJyk7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBtYWluTG9vcCgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnRnYW1lJykucmVtb3ZlKCk7XG4gICAgbGV0IHR1cm4gPSAwO1xuICAgIGxldCBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXJzWzBdO1xuICAgIGxldCBpbmFjdGl2ZVBsYXllciA9IHBsYXllcnNbMV07XG4gICAgc3dpdGNoU2l6ZSgxLCBhY3RpdmVQbGF5ZXIsIGluYWN0aXZlUGxheWVyKTtcbiAgICB3aGlsZSAoIWFjdGl2ZVBsYXllci5nYW1lQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tYXdhaXQtaW4tbG9vcCAqL1xuICAgICAgICBkaXNwbGF5SW5zdHJ1Y3Rpb25zKGBQbGF5ZXIgJHtNYXRoLmFicyh0dXJuICUgMikgKyAxfSBpcyBhaW1pbmcuLi5gKTtcbiAgICAgICAgYXdhaXQgdGltZWQoYWN0aXZlUGxheWVyLnR5cGUgPT09ICdjcHUnID8gMjAwMCA6IDUwMCk7XG4gICAgICAgIGF3YWl0IHBsYXllcklucHV0KGFjdGl2ZVBsYXllciwgaW5hY3RpdmVQbGF5ZXIpO1xuICAgICAgICB0dXJuKys7XG4gICAgICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcnNbdHVybiAlIDJdO1xuICAgICAgICBpbmFjdGl2ZVBsYXllciA9IHBsYXllcnNbTWF0aC5hYnMoKHR1cm4gLSAxKSAlIDIpXTtcbiAgICB9XG4gICAgZGlzcGxheUluc3RydWN0aW9ucyhgUGxheWVyICR7TWF0aC5hYnMoKHR1cm4gLSAxKSAlIDIpICsgMX0gV2lucyFgKTtcbiAgICBsZXQgcmVzdGFydEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHJlc3RhcnRCdG4uaWQgPSAncmVzdGFydCc7XG4gICAgcmVzdGFydEJ0bi5jbGFzc0xpc3QuYWRkKCdnYW1lYnRuJyk7XG4gICAgcmVzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHJlc3RhcnRHYW1lKTtcbiAgICByZXN0YXJ0QnRuLnRleHRDb250ZW50ID0gXCJQbGF5IEFnYWluIVwiO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJykuYXBwZW5kQ2hpbGQocmVzdGFydEJ0bik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluaXRpYWxpemVHYW1lKCkge1xuICAgIGxldCByZW1idXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxhY2VTaGlwcycpO1xuICAgIHJlbWJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIGluaXRpYWxpemVHYW1lKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5pdGlhbERpdicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgbGV0IGdhbWVBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZ2FtZUFyZWEuY2xhc3NMaXN0LmFkZCgnZ2FtZUFyZWEnKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpLmFwcGVuZENoaWxkKGdhbWVBcmVhKTtcbiAgICBwbGF5ZXJzLnB1c2goY3JlYXRlUGxheWVyKCdodW0nKSk7XG4gICAgcGxheWVyc1swXS5nYW1lQm9hcmQuZGlzcGxheUJvYXJkKCk7XG4gICAgYXdhaXQgcGxhY2VTaGlwcyhwbGF5ZXJzKTtcbiAgICBwbGF5ZXJzLnB1c2goY3JlYXRlUGxheWVyKCdjcHUnKSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Vycm9yJykudGV4dENvbnRlbnQgPSAnJztcbiAgICBsZXQgc3RhcnRHYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgc3RhcnRHYW1lLmlkID0gJ3N0YXJ0Z2FtZSc7XG4gICAgc3RhcnRHYW1lLmNsYXNzTGlzdC5hZGQoJ2dhbWVidG4nKTtcbiAgICBzdGFydEdhbWUuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBtYWluTG9vcCk7XG4gICAgc3RhcnRHYW1lLnRleHRDb250ZW50ID0gXCJDbGljayBoZXJlIHRvIHN0YXJ0IVwiO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJykuYXBwZW5kQ2hpbGQoc3RhcnRHYW1lKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUdhbWVCdXR0b24oKSB7XG4gICAgLy8gbGV0IHdhdmVpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAvLyB3YXZlaW1nLnNyYyA9IHdhdmVzO1xuICAgIC8vIHdhdmVpbWcuY2xhc3NMaXN0LmFkZCgnd2F2ZXN2ZycpO1xuICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53YXZlcycpLmFwcGVuZENoaWxkKHdhdmVpbWcpO1xuICAgIGJ1aWxkSG93VG8oKTtcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2luaXRpYWxEaXYnKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpLmFwcGVuZENoaWxkKGRpdik7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCd0aXRsZScpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gXCJCYXR0bGVzaGlwXCI7XG4gICAgZGl2LmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGl0bGUuY2xhc3NMaXN0LmFkZCgnc2hvdycpOyB9LCAxMDApO1xuICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidXR0b24uaWQgPSAncGxhY2VTaGlwcyc7XG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2dhbWVidG4nKTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBpbml0aWFsaXplR2FtZSk7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJTdGFydCBQbGFjaW5nIHlvdXIgU2hpcHMhXCI7XG4gICAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbik7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZGlzcGxheUdhbWVCdXR0b24pO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc291cmNlJykuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCAoKSA9PiB7XG4gICAgd2luZG93Lm9wZW4oJ2h0dHBzOi8vZ2l0aHViLmNvbS9OTUdWb3gvQmF0dGxlc2hpcCcsICdfYmxhbmsnKTtcbn0pO1xuIl0sIm5hbWVzIjpbImRpc3BsYXlJbnN0cnVjdGlvbnMiLCJtc2ciLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0Q29udGVudCIsInNoaXBGYWN0b3J5IiwibGVuIiwibGVuZ3RoIiwiaGl0cyIsInNoaXAiLCJvcmllbnRhdGlvbiIsImlzU3VuayIsInN1bmsiLCJpc0hpdCIsImNoYW5nZU9yaWVudGF0aW9uIiwiZ2V0T3JpZW50YXRpb24iLCJnYW1lQm9hcmRGYWN0b3J5Iiwic2hpcHMiLCJzcGFjZXMiLCJBcnJheSIsIm1hcCIsInNwYWNlRWxlbWVudHMiLCJwbGF5QXJlYSIsImdhbWVCb2FyZCIsImRpc3BsYXlCb2FyZCIsInBsYXllckFyZWEiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiYm9hcmRBcmVhIiwieCIsInkiLCJuZXdTcGFjZSIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiZ2VuZXJhdGVTcGFjZXMiLCJvY2N1cGllZCIsImkiLCJwdXNoIiwiaXNWYWxpZFBsYWNlbWVudCIsInNoaXBPY2N1cGFuY3kiLCJ1bmRlZmluZWQiLCJwbGFjZVNoaXAiLCJjb29yZCIsIm5ld1NoaXAiLCJOdW1iZXIiLCJ0YXJnZXRTcGFjZSIsInJlbW92ZSIsImFsbFNoaXBzU3VuayIsImV2ZXJ5IiwiaXNBdHRhY2tPdXRPZkJvdW5kcyIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2tlZFNwYWNlIiwiaW5jbHVkZXMiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImNyZWF0ZVBsYXllciIsInR5cGUiLCJtb3ZlU3RhY2siLCJsYXN0TW92ZSIsImxlbmd0aHMiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJvIiwicmVzIiwiZm9yRWFjaCIsImVsZXJvdyIsImVsZSIsInBsYXllciIsInNob3dIb3dUbyIsImNvbnRhaW5lciIsImNsb3NlSG93VG8iLCJhZGREaXYiLCJzZWN0aW9uSGVhZGVyIiwidGV4dCIsIm5ld0RpdiIsInRpdGxlIiwic2VjdGlvblRleHQiLCJidWlsZEhvd1RvIiwidHV0b3JpYWxDb250YWluZXIiLCJjbG9zZWJ1dHRvbiIsImlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNoaXBOYW1lcyIsIm1vdXNlcG9zaXRpb24iLCJhbGxvd1NoaXBQbGFjZW1lbnQiLCJwbGF5ZXJzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJib2FyZENlbGxzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImdldEFmZmVjdGVkU3F1YXJlcyIsImNlbGxzIiwiY29vcmRzIiwieGkiLCJ5aSIsInRoaXNDZWxsIiwidXBkYXRlU2hpcERpc3BsYXkiLCJlbGVtZW50RnJvbVBvaW50IiwiY29udGFpbnMiLCJnZXRBdHRyaWJ1dGUiLCJjZWxsIiwicm90YXRlU2hpcCIsImV2ZW50Iiwia2V5Q29kZSIsImxpZ2h0U3F1YXJlIiwidGFyZ2V0IiwidW5saWdodFNxdWFyZSIsInJlcG9ydENlbGxDb29yZGluYXRlIiwic3BhY2UiLCJmcm9tIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIndpbmRvdyIsInBsYWNlU2hpcHMiLCJzaGlwTGVuZ3RocyIsImUiLCJjbGllbnRYIiwiY2xpZW50WSIsInBsYXllcklucHV0IiwiYWN0aXZlUGxheWVyIiwiaW5hY3RpdmUiLCJkaXNhYmxlQm9hcmRDb250cm9sIiwicmVnaXN0ZXJBdHRhY2siLCJwIiwicm93IiwiZW5hYmxlQm9hcmRDb250cm9sIiwicG9wdWxhdGVTdGFjayIsImhpdFR5cGUiLCJwcmV2IiwiY2xlYXJRdWV1ZUlmU2hpcFN1bmsiLCJwb3AiLCJnZXRDUFVDb29yZGluYXRlcyIsIm5leHRNb3ZlIiwid2F2ZXMiLCJyZXN0YXJ0R2FtZSIsInJlc3RhcnRCdG4iLCJkaXNwbGF5IiwiaW5pdGlhbGl6ZUdhbWUiLCJ0aW1lZCIsImludGVydmFsIiwic2V0VGltZW91dCIsInN3aXRjaFNpemUiLCJtb2RlIiwiYWN0IiwiaW5hY3QiLCJtYWluTG9vcCIsInR1cm4iLCJpbmFjdGl2ZVBsYXllciIsImFicyIsInJlbWJ1dHRvbiIsImdhbWVBcmVhIiwic3RhcnRHYW1lIiwiZGlzcGxheUdhbWVCdXR0b24iLCJkaXYiLCJidXR0b24iLCJvcGVuIl0sInNvdXJjZVJvb3QiOiIifQ==