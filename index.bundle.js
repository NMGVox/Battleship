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
	transition: top 2s ease-in-out;
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
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["\n@font-face {\n\tfont-family: 'ironman';\n\tsrc: url('./font/IronManOfWar2Ncv-E85l.ttf');\n}\n\n@font-face {\n\tfont-family: 'didact-gothic';\n\tsrc: url('./font/DidactGothic-Regular.ttf');\n}\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\nbody {\n\tfont-family: 'ironman', Georgia, 'Times New Roman', Times, serif;\n    display: grid;\n    justify-content: center;\n    align-items: center;\n    height:100vh;\n\tbackground-color: #bbbbbb;\n\tdisplay: grid;\n\tgrid-template-columns: 1fr;\n\tgrid-template-rows: 1fr 8fr .5fr;\n\tgrid-column-gap: 0px;\n\tgrid-row-gap: 5px;\n\tposition:relative;\n}\n\n.header {\n\tdisplay: flex;\n\talign-items: center;\n\theight:100%;\n}\n\n.heading-tabs {\n\tdisplay:flex;\n\talign-items: center;\n\tjustify-content: flex-end;\n\tmargin-left: auto;\n\tgap: 10px;\n\tmargin-right: 16px;\n\theight:90%;\n}\n\n.heading-tabs li {\n\theight:50%;\n\tbackground-color: rgb(145, 173, 211);\n\tborder-style: solid;\n\tborder-width: 2px;\n\tborder-color: rgba(23, 68, 133, 0.178);\n\tborder-radius: 4px;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tfont-family: 'didact-gothic', sans-serif;\n\tpadding: 0px 12px;\n\tcolor: whitesmoke;\n\tfont-weight: 700;\n\ttransition: all 1s ease-in;\n}\n\n.heading-tabs li:hover {\n\tcursor: pointer;\n\tbackground-color: #1a4a75;\n}\n\n.main {\n\tdisplay:flex;\n\tjustify-content: center;\n\talign-items: center;\n\tflex-direction: column;\n\tgap: 2vh;\n\theight: 100%;\n}\n\nbutton {\n\tfont-family: 'didact-gothic', sans-serif;\n}\n\n.initialDiv {\n\theight: 50vh;\n\twidth: 60vw;\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n\tjustify-content: center;\n\tborder-radius: 33px;\n\tgap: 1rem;\n\tborder: 8px solid #002546a8;\n\tbackground: linear-gradient(145deg, #163e62, #1a4a75);\n\tbox-shadow:  16px 16px 19px #164065,\n             -16px -16px 19px #1a4a75;\n}\n\n#error,\n#instructions {\n\tfont-family: 'ironman', sans-serif;\n\tletter-spacing: 2px;\n}\n\n.title {\n\tfont-family: 'ironman', sans-serif;\n\tfont-size: 6rem;\n\tletter-spacing: 10px;\n\t-webkit-text-stroke-color: #002647;\n\t-webkit-text-stroke-width: 2px;\n\tbackground: -webkit-linear-gradient(#eee, #8d8d8d);\n\t-webkit-background-clip: text;\n\t-webkit-text-fill-color: transparent;\n\topacity: 0;\n\ttransition: all 2s;\n\tposition:relative;\n\ttop: -25%;\n}\n\n.title.show {\n\topacity:1;\n\ttop:0;\n}\n\n.gameArea {\n\twidth: 90vw;\n\theight: 90%;\n\tdisplay:flex;\n\tjustify-content: center;\n\talign-items: center;\n\tborder:2px solid black;\n}\n\n.boardArea {\n    width: clamp(150px, 30%, 40%);\n    aspect-ratio: 1 / 1;\n    display: grid;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(10, 1fr);\n    border: 2px solid #002647;\n\tbackground-image: url('./img/water.jpg');\n\tbackground-size: cover;\n}\n\n.playerArea {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\theight:100%;\n\twidth:100%;\n\ttransition: all 1.5s;\n}\n\n.playerArea:first-child {\n\tborder-right: solid 2px black;\n}\n\n.playerArea.enlarge{\n\twidth:80%;\n}\n\n.playerArea.smaller {\n\twidth:20%;\n}\n\n.boardArea:hover {\n\tcursor: crosshair;\n}\n\n.boardSpace {\n    border: 1px solid black;\n\ttransition: all .5s;\n}\n\n.carrier {\n\tbackground-color: lightblue;\n}\n\n.ghost {\n\tbackground-color: grey;\n}\n\n#error {\n\tcolor:red;\n\tfont-size: 2rem;\n\theight: 2rem;\n}\n\n#instructions {\n\tfont-size: 3rem;\n\tfont-weight: bold;\n\tcolor: #002647;\n}\n\n.hide {\n\tbackground-color: transparent;\n}\n\n.gamebtn{\n\tmin-width: 130px;\n\theight: 20%;\n\twidth: 25%;\n\tfont-size: 1.4rem;\n\tcolor: #fff;\n\tpadding: 5px 10px;\n\tfont-weight: bold;\n\tcursor: pointer;\n\ttransition: all 0.3s ease;\n\tposition: relative;\n\tdisplay: inline-block;\n\toutline: none;\n\tborder-radius: 5px;\n\tborder: 4px solid #b4cafa31;\n\tbackground: #1a4a75;\n  }\n  .gamebtn:hover {\n\tbackground: #fff;\n\tcolor: #1a4a75;\n\tborder-color: #002647;\n  }\n\n.footer {\n\theight: 100%;\n\tbackground-color: #777777;\n\twidth: 100vw;\n\tposition:relative;\n\tz-index: 4;\n\tdisplay:flex;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n.footer-text {\n\tfont-size: 1.2rem;\n\tletter-spacing: 1px;\n}\n\n.footer-text a{\n\ttext-decoration: none;\n\tcolor: #1a4a75;\n}\n\n.waves {\n\tposition:absolute;\n\ttop:65%;\n\tright:0;\n\twidth:100vw;\n}\n\n.wavesvg {\n\twidth:100vw;\n}\n\n.tutContainer {\n\toverflow: auto;\n\theight: 60vh;\n\twidth: 20vw;\n\tbackground-color: #c9c9c9;\n\tborder: 4px solid #164065;\n\tposition: absolute;\n\ttop: -80%;\n\tleft: 40%;\n\ttransition: top 2s ease-in-out;\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n\tpadding: 1rem 0;\n\tbox-sizing: border-box;\n\tborder-radius: 1rem;\n}\n\n.tutContainer.show {\n\ttop: 20%;\n}\n\n.tutHeader {\n\tfont-family: 'ironman', sans-serif;\n\tfont-size: 3rem;\n\tletter-spacing: 4px;\n\ttext-align: center;\n\t-webkit-text-stroke-color: #0026477a;\n\t-webkit-text-stroke-width: 3px;\n\twidth:100%;\n\tborder-bottom: 2px solid #002647;\n}\n\n#closeHowTo {\n\theight: 16px;\n\taspect-ratio: 1 / 1;\n\tbackground-color: rgba(255, 0, 0, 0);\n\tborder: 2px solid black;\n\tposition:absolute;\n\ttop: 1%;\n\tright: 1%;\n\tdisplay:flex;\n\tjustify-content: center;\n\talign-items: center;\n\ttext-align: center;\n\tfont-size: 12px;\n\tborder-radius: 50%;\n}\n\n#closeHowTo:hover {\n\tcursor: pointer;\n}\n\n.sectionDiv {\n\tdisplay: flex;\n\twidth:100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n\tpadding: 1rem 0;\n\tgap: .5rem;\n\tborder-bottom: 2px solid black;\n}\n\n.sectionTitle {\n\tfont-family: 'ironman', sans-serif;\n\tfont-size: 2rem;\n\tletter-spacing: 3px;\n\ttext-align: center;\n\t-webkit-text-stroke-color: #0026477a;\n\t-webkit-text-stroke-width: 2px;\n\ttext-decoration: underline;\n}\n\n.sectionText {\n\tfont-size: 1rem;\n\twidth: 90%;\n\tfont-family: 'didact-gothic', sans-serif;\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsbUNBQW1DO0FBQzVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sNEVBQTRFLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsTUFBTSxpQkFBaUIsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksTUFBTSxZQUFZLE9BQU8sVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxLQUFLLE1BQU0sVUFBVSxVQUFVLEtBQUssS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsV0FBVyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLE1BQU0sT0FBTyxPQUFPLE1BQU0sWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxh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QVcsR0FBRywyQkFBMkI7RUFDaERzSixHQUFHLENBQUN4SCxXQUFXLENBQUN5SCxNQUFNLENBQUM7QUFDM0I7QUFFQTFDLE1BQU0sQ0FBQzlCLGdCQUFnQixDQUFDLE1BQU0sRUFBRXNFLGlCQUFpQixDQUFDO0FBRWxEdkosUUFBUSxDQUFDQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUNnRixnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsTUFBTTtFQUNwRThCLE1BQU0sQ0FBQzJDLElBQUksQ0FBQyxzQ0FBc0MsRUFBRSxRQUFRLENBQUM7QUFDakUsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvZGlzcGxheUluc3RydWN0aW9ucy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvZ2FtZV9vYmplY3RzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9ob3dUb1BsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL2xlbmd0aHNUb05hbWVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9wbGFjZVNoaXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9wbGF5ZXJJbnB1dC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBkaXNwbGF5SW5zdHJ1Y3Rpb25zKG1zZykge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnN0cnVjdGlvbnMnKS50ZXh0Q29udGVudCA9IG1zZztcbn1cblxuZXhwb3J0IHsgZGlzcGxheUluc3RydWN0aW9ucyB9O1xuIiwiZnVuY3Rpb24gc2hpcEZhY3RvcnkobGVuKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gbGVuO1xuICAgIGNvbnN0IGhpdHMgPSAwO1xuICAgIGxldCBzaGlwO1xuICAgIGxldCBvcmllbnRhdGlvbiA9IDA7XG5cbiAgICBmdW5jdGlvbiBpc1N1bmsoKSB7XG4gICAgICAgIGlmIChzaGlwLmhpdHMgPT09IHNoaXAubGVuZ3RoKSB7XG4gICAgICAgICAgICBzaGlwLnN1bmsgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNIaXQoKSB7XG4gICAgICAgIHNoaXAuaGl0cysrO1xuICAgICAgICBpc1N1bmsoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGFuZ2VPcmllbnRhdGlvbigpIHtcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAwKSB7XG4gICAgICAgICAgICBvcmllbnRhdGlvbiA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcmllbnRhdGlvbiA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaGlwID0ge1xuICAgICAgICBsZW5ndGgsXG4gICAgICAgIGhpdHMsXG4gICAgICAgIHN1bms6IGZhbHNlLFxuICAgICAgICBpc0hpdCxcbiAgICAgICAgaXNTdW5rLFxuICAgICAgICBjaGFuZ2VPcmllbnRhdGlvbixcbiAgICAgICAgZ2V0T3JpZW50YXRpb246ICgpID0+IG9yaWVudGF0aW9uLFxuICAgIH07XG5cbiAgICByZXR1cm4gc2hpcDtcbn1cblxuZnVuY3Rpb24gZ2FtZUJvYXJkRmFjdG9yeSgpIHtcbiAgICBjb25zdCBzaGlwcyA9IFtdO1xuICAgIGNvbnN0IHNwYWNlcyA9IFsuLi5BcnJheSgxMCldLm1hcCgoKSA9PiBBcnJheSgxMCkpO1xuICAgIGNvbnN0IHNwYWNlRWxlbWVudHMgPSBbLi4uQXJyYXkoMTApXS5tYXAoKCkgPT4gQXJyYXkoMTApKTtcbiAgICBsZXQgcGxheUFyZWE7XG4gICAgbGV0IGdhbWVCb2FyZDtcblxuICAgIGZ1bmN0aW9uIGRpc3BsYXlCb2FyZCgpIHtcbiAgICAgICAgbGV0IHBsYXllckFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcGxheWVyQXJlYS5jbGFzc0xpc3QuYWRkKCdwbGF5ZXJBcmVhJyk7XG4gICAgICAgIGdhbWVCb2FyZC5wbGF5QXJlYSA9IHBsYXllckFyZWE7XG4gICAgICAgIGxldCBib2FyZEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYm9hcmRBcmVhLmNsYXNzTGlzdC5hZGQoJ2JvYXJkQXJlYScpO1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwOyB4KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgMTA7IHkrKykge1xuICAgICAgICAgICAgICAgIGxldCBuZXdTcGFjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIG5ld1NwYWNlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkU3BhY2UnKTtcbiAgICAgICAgICAgICAgICBuZXdTcGFjZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcm93JywgeCk7XG4gICAgICAgICAgICAgICAgbmV3U3BhY2Uuc2V0QXR0cmlidXRlKCdkYXRhLWNvbCcsIHkpO1xuICAgICAgICAgICAgICAgIGJvYXJkQXJlYS5hcHBlbmRDaGlsZChuZXdTcGFjZSk7XG4gICAgICAgICAgICAgICAgc3BhY2VFbGVtZW50c1t4XVt5XSA9IG5ld1NwYWNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHBsYXllckFyZWEuYXBwZW5kQ2hpbGQoYm9hcmRBcmVhKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVBcmVhJykuYXBwZW5kQ2hpbGQocGxheWVyQXJlYSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVTcGFjZXMob3JpZW50YXRpb24sIGxlbiwgeCwgeSkge1xuICAgICAgICBsZXQgb2NjdXBpZWQgPSBbXTtcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAwKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgb2NjdXBpZWQucHVzaChbeCwgeSArIGldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvY2N1cGllZC5wdXNoKFt4ICsgaSwgeV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvY2N1cGllZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1ZhbGlkUGxhY2VtZW50KHNoaXBPY2N1cGFuY3kpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwT2NjdXBhbmN5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgeCA9IHNoaXBPY2N1cGFuY3lbaV1bMF07XG4gICAgICAgICAgICBsZXQgeSA9IHNoaXBPY2N1cGFuY3lbaV1bMV07XG4gICAgICAgICAgICBpZiAoISgoeCA8IDEwICYmIHggPj0gMCkgJiYgKHkgPCAxMCAmJiB5ID49IDApKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlcnJvcicpLnRleHRDb250ZW50ID0gYENhbid0IHBsYWNlIGhlcmUhYDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZ2FtZUJvYXJkLnNwYWNlc1t4XVt5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Vycm9yJykudGV4dENvbnRlbnQgPSBgQ2FuJ3QgcGxhY2UgaGVyZSFgO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZVNoaXAobGVuLCBjb29yZCwgb3JpZW50YXRpb24pIHtcbiAgICAgICAgY29uc3QgbmV3U2hpcCA9IHNoaXBGYWN0b3J5KGxlbik7XG4gICAgICAgIGNvbnN0IHNoaXBPY2N1cGFuY3kgPSBnZW5lcmF0ZVNwYWNlcyhvcmllbnRhdGlvbiwgbGVuLCBOdW1iZXIoY29vcmRbMF0pLCBOdW1iZXIoY29vcmRbMV0pKTtcbiAgICAgICAgaWYgKCFpc1ZhbGlkUGxhY2VtZW50KHNoaXBPY2N1cGFuY3kpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbGV0IHggPSBzaGlwT2NjdXBhbmN5W2ldWzBdO1xuICAgICAgICAgICAgbGV0IHkgPSBzaGlwT2NjdXBhbmN5W2ldWzFdO1xuICAgICAgICAgICAgZ2FtZUJvYXJkLnNwYWNlc1t4XVt5XSA9IG5ld1NoaXA7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0U3BhY2UgPSBzcGFjZUVsZW1lbnRzW3hdW3ldO1xuICAgICAgICAgICAgdGFyZ2V0U3BhY2UuY2xhc3NMaXN0LnJlbW92ZSgnZ2hvc3QnKTtcbiAgICAgICAgICAgIHRhcmdldFNwYWNlLmNsYXNzTGlzdC5hZGQoJ2NhcnJpZXInKTtcbiAgICAgICAgfVxuICAgICAgICBnYW1lQm9hcmQuc2hpcHMucHVzaChuZXdTaGlwKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWxsU2hpcHNTdW5rKCkge1xuICAgICAgICByZXR1cm4gZ2FtZUJvYXJkLnNoaXBzLmV2ZXJ5KFxuICAgICAgICAgICAgKHNoaXApID0+IHNoaXAuc3VuayA9PT0gdHJ1ZSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0F0dGFja091dE9mQm91bmRzKHgsIHkpIHtcbiAgICAgICAgaWYgKCEoKHggPCAxMCAmJiB4ID49IDApICYmICh5IDwgMTAgJiYgeSA+PSAwKSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKGNvb3JkKSB7XG4gICAgICAgIGNvbnN0IHggPSBjb29yZFswXTtcbiAgICAgICAgY29uc3QgeSA9IGNvb3JkWzFdO1xuXG4gICAgICAgIGlmIChpc0F0dGFja091dE9mQm91bmRzKHgsIHkpKSB7XG4gICAgICAgICAgICByZXR1cm4gW2ZhbHNlLCBudWxsXTtcbiAgICAgICAgfVxuICAgICAgICBnYW1lQm9hcmQuc3BhY2VFbGVtZW50c1t4XVt5XS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG5cbiAgICAgICAgY29uc3QgYXR0YWNrZWRTcGFjZSA9IGdhbWVCb2FyZC5zcGFjZXNbeF1beV07XG4gICAgICAgIGlmIChhdHRhY2tlZFNwYWNlID09PSAneCcpIHtcbiAgICAgICAgICAgIHJldHVybiBbZmFsc2UsIG51bGxdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnYW1lQm9hcmQuc2hpcHMuaW5jbHVkZXMoYXR0YWNrZWRTcGFjZSkpIHtcbiAgICAgICAgICAgIGF0dGFja2VkU3BhY2UuaXNIaXQoKTtcbiAgICAgICAgICAgIGdhbWVCb2FyZC5zcGFjZUVsZW1lbnRzW3hdW3ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjMGI5YzJhJztcbiAgICAgICAgICAgIHJldHVybiBbdHJ1ZSwgJ3NoaXAnXTtcbiAgICAgICAgfSBpZiAoZ2FtZUJvYXJkLnNwYWNlc1t4XVt5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBnYW1lQm9hcmQuc3BhY2VzW3hdW3ldID0gJ3gnO1xuICAgICAgICAgICAgZ2FtZUJvYXJkLnNwYWNlRWxlbWVudHNbeF1beV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNiMzA3MDcnO1xuICAgICAgICAgICAgcmV0dXJuIFt0cnVlLCAnZW1wdHknXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2ZhbHNlLCBudWxsXTtcbiAgICB9XG5cbiAgICBnYW1lQm9hcmQgPSB7XG4gICAgICAgIHNoaXBzLFxuICAgICAgICBzcGFjZXMsXG4gICAgICAgIHBsYWNlU2hpcCxcbiAgICAgICAgcmVjZWl2ZUF0dGFjayxcbiAgICAgICAgYWxsU2hpcHNTdW5rLFxuICAgICAgICBkaXNwbGF5Qm9hcmQsXG4gICAgICAgIGdlbmVyYXRlU3BhY2VzLFxuICAgICAgICBzcGFjZUVsZW1lbnRzLFxuICAgICAgICBwbGF5QXJlYSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIGdhbWVCb2FyZDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUGxheWVyKHR5cGUpIHtcbiAgICBjb25zdCBnYW1lQm9hcmQgPSBnYW1lQm9hcmRGYWN0b3J5KCk7XG4gICAgY29uc3QgbW92ZVN0YWNrID0gW107XG4gICAgbGV0IGxhc3RNb3ZlO1xuXG4gICAgaWYgKHR5cGUgPT09ICdjcHUnKSB7XG4gICAgICAgIGdhbWVCb2FyZC5kaXNwbGF5Qm9hcmQoKTtcbiAgICAgICAgY29uc3QgbGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IG8gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGdhbWVCb2FyZC5wbGFjZVNoaXAobGVuZ3Roc1tpXSwgW3gsIHldLCBvKTtcbiAgICAgICAgICAgIGlmICghcmVzKSB7XG4gICAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGdhbWVCb2FyZC5zcGFjZUVsZW1lbnRzLmZvckVhY2goKGVsZXJvdykgPT4ge1xuICAgICAgICAgICAgZWxlcm93LmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcGxheWVyID0ge1xuICAgICAgICB0eXBlLFxuICAgICAgICBnYW1lQm9hcmQsXG4gICAgICAgIG1vdmVTdGFjayxcbiAgICAgICAgbGFzdE1vdmUsXG4gICAgfTtcbiAgICByZXR1cm4gcGxheWVyO1xufVxuXG5leHBvcnQgeyBjcmVhdGVQbGF5ZXIgfTtcbiIsImZ1bmN0aW9uIHNob3dIb3dUbygpIHtcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR1dENvbnRhaW5lcicpO1xuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlSG93VG8oKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50dXRDb250YWluZXInKTtcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xufVxuXG5mdW5jdGlvbiBhZGREaXYoc2VjdGlvbkhlYWRlciwgdGV4dCkge1xuICAgIGxldCBuZXdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGxldCBzZWN0aW9uVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IHNlY3Rpb25IZWFkZXI7XG4gICAgc2VjdGlvblRleHQudGV4dENvbnRlbnQgPSB0ZXh0O1xuXG4gICAgbmV3RGl2LmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb25EaXYnKTtcbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uVGl0bGUnKTtcbiAgICBzZWN0aW9uVGV4dC5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uVGV4dCcpO1xuXG4gICAgbmV3RGl2LmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICBuZXdEaXYuYXBwZW5kQ2hpbGQoc2VjdGlvblRleHQpO1xuXG4gICAgcmV0dXJuIG5ld0Rpdjtcbn1cblxuZnVuY3Rpb24gYnVpbGRIb3dUbygpIHtcbiAgICBsZXQgdHV0b3JpYWxDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgY2xvc2VidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjbG9zZWJ1dHRvbi5pZCA9ICdjbG9zZUhvd1RvJztcbiAgICBjbG9zZWJ1dHRvbi50ZXh0Q29udGVudCA9ICfinJUnO1xuICAgIGNsb3NlYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgY2xvc2VIb3dUbyk7XG4gICAgdHV0b3JpYWxDb250YWluZXIuYXBwZW5kQ2hpbGQoY2xvc2VidXR0b24pO1xuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgdHV0b3JpYWxDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInR1dENvbnRhaW5lclwiKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiSG93IHRvIFBsYXkhXCI7XG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgndHV0SGVhZGVyJyk7XG4gICAgdHV0b3JpYWxDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuXG4gICAgdHV0b3JpYWxDb250YWluZXIuYXBwZW5kQ2hpbGQoYWRkRGl2KCdQbGFjaW5nIFNoaXBzJywgYFNoaXBzIGNhbiBiZSBwbGFjZWQgb24gdGhlIGJvYXJkIGJ5IGxlZnQgY2xpY2tpbmcgYSBjZWxsLiBcbiAgICBZb3UgbWF5IHJvdGF0ZSB5b3VyIGN1cnJlbnQgc2hpcCBieSBwcmVzc2luZyBzcGFjZWJhci4gWW91IGhhdmUgNSBzaGlwcyB0byBwbGFjZSBvbiB0aGUgYm9hcmQuIEEgY2FycmllciAoNSBzcGFjZXMpLCBcbiAgICBhIGJhdHRsZXNoaXAgKDQgc3BhY2VzKSwgYSBzdWJtYXJpbmUgKDMgc3BhY2VzKSwgYSBjcnVpc2VyLCBhbmQgYSBkZXN0cm95ZXIgKDIgc3BhY2VzKS4gT25jZSBhbGwgc2hpcHMgYXJlIHBsYWNlZCwgeW91IG1heVxuICAgIGJlZ2luLmApKTtcblxuICAgIHR1dG9yaWFsQ29udGFpbmVyLmFwcGVuZENoaWxkKGFkZERpdignUGxheWluZycsIGBDbGljayBhIGNlbGwgb24gdGhlIG9wcG9uZW50cyBib2FyZCB0byBsYXVuY2ggYW4gYXR0YWNrLiBJZiB5b3UgaGl0IGEgIHNoaXAsIHRoZSBjZWxsIHdpbGxcbiAgICB0dXJuIChibHVlKS4gSWYgeW91IG1pc3MsIHRoZSBjZWxsIHdpbGwgdHVybiByZWQuIFNpbmsgYWxsIG9mIHRoZSBvcHBvbmVudCdzIHNoaXBzIHRvIHdpbiB0aGUgZ2FtZSFgKSk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQodHV0b3JpYWxDb250YWluZXIpO1xufVxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaG93VG8nKS5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHNob3dIb3dUbyk7XG5cbmV4cG9ydCB7IGJ1aWxkSG93VG8gfTtcbiIsImNvbnN0IHNoaXBOYW1lcyA9IFtcbiAgICAnY2FycmllcicsXG4gICAgJ2JhdHRsZXNoaXAnLFxuICAgICdzdWJtYXJpbmUnLFxuICAgICdjcnVpc2VyJyxcbiAgICAnZGVzdHJveWVyJyxcbl07XG5cbmV4cG9ydCB7IHNoaXBOYW1lcyB9O1xuIiwiaW1wb3J0IHsgc2hpcE5hbWVzIH0gZnJvbSAnLi9sZW5ndGhzVG9OYW1lcyc7XG5pbXBvcnQgeyBkaXNwbGF5SW5zdHJ1Y3Rpb25zIH0gZnJvbSAnLi9kaXNwbGF5SW5zdHJ1Y3Rpb25zJztcblxubGV0IG1vdXNlcG9zaXRpb247XG5cbmZ1bmN0aW9uIGFsbG93U2hpcFBsYWNlbWVudChsZW5ndGgsIHBsYXllcnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgY29uc3QgYm9hcmRDZWxscyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvYXJkU3BhY2UnKTtcbiAgICAgICAgbGV0IG9yaWVudGF0aW9uID0gMDtcbiAgICAgICAgY29uc3QgZ2V0QWZmZWN0ZWRTcXVhcmVzID0gKHgsIHkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGxzID0gW107XG4gICAgICAgICAgICBsZXQgY29vcmRzID0gcGxheWVyc1swXS5nYW1lQm9hcmQuZ2VuZXJhdGVTcGFjZXMob3JpZW50YXRpb24sIGxlbmd0aCwgeCwgeSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCB4aSA9IGNvb3Jkc1tpXVswXTtcbiAgICAgICAgICAgICAgICBsZXQgeWkgPSBjb29yZHNbaV1bMV07XG4gICAgICAgICAgICAgICAgbGV0IHRoaXNDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PVwiJHt4aX1cIl1bZGF0YS1jb2w9XCIke3lpfVwiXWApO1xuICAgICAgICAgICAgICAgIGNlbGxzLnB1c2godGhpc0NlbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNlbGxzO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZVNoaXBEaXNwbGF5ID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRoaXNDZWxsID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChtb3VzZXBvc2l0aW9uWzBdLCBtb3VzZXBvc2l0aW9uWzFdKTtcbiAgICAgICAgICAgIGlmICghdGhpc0NlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdib2FyZFNwYWNlJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgeCA9IE51bWJlcih0aGlzQ2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93JykpO1xuICAgICAgICAgICAgbGV0IHkgPSBOdW1iZXIodGhpc0NlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbCcpKTtcbiAgICAgICAgICAgIGxldCBjZWxscyA9IGdldEFmZmVjdGVkU3F1YXJlcyh4LCB5KTtcbiAgICAgICAgICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbCAhPT0gbnVsbCAmJiBjZWxsLmNsYXNzTGlzdC5jb250YWlucygnZ2hvc3QnKSkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2dob3N0Jyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjZWxsICE9PSBudWxsICYmICFjZWxsLmNsYXNzTGlzdC5jb250YWlucygnZ2hvc3QnKSkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2dob3N0Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgcm90YXRlU2hpcCA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgIT09IDMyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXBkYXRlU2hpcERpc3BsYXkoKTtcbiAgICAgICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gMSkge1xuICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7IG9yaWVudGF0aW9uID0gMTsgfVxuICAgICAgICAgICAgdXBkYXRlU2hpcERpc3BsYXkoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGxpZ2h0U3F1YXJlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBsZXQgeCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93Jyk7XG4gICAgICAgICAgICBsZXQgeSA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sJyk7XG4gICAgICAgICAgICBjb25zdCBjZWxscyA9IGdldEFmZmVjdGVkU3F1YXJlcyhOdW1iZXIoeCksIE51bWJlcih5KSk7XG4gICAgICAgICAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwgIT09IG51bGwpIHsgY2VsbC5jbGFzc0xpc3QuYWRkKCdnaG9zdCcpOyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdW5saWdodFNxdWFyZSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IHggPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpO1xuICAgICAgICAgICAgbGV0IHkgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbCcpO1xuICAgICAgICAgICAgY29uc3QgY2VsbHMgPSBnZXRBZmZlY3RlZFNxdWFyZXMoTnVtYmVyKHgpLCBOdW1iZXIoeSkpO1xuICAgICAgICAgICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjZWxsICE9PSBudWxsKSB7IGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZ2hvc3QnKTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcmVwb3J0Q2VsbENvb3JkaW5hdGUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGxldCBzcGFjZSA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIGxldCBjb29yZHMgPSBbXTtcbiAgICAgICAgICAgIGNvb3Jkcy5wdXNoKHNwYWNlLmdldEF0dHJpYnV0ZSgnZGF0YS1yb3cnKSk7XG4gICAgICAgICAgICBjb29yZHMucHVzaChzcGFjZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sJykpO1xuICAgICAgICAgICAgbGV0IHJlcyA9IHBsYXllcnNbMF0uZ2FtZUJvYXJkLnBsYWNlU2hpcChsZW5ndGgsIGNvb3Jkcywgb3JpZW50YXRpb24pO1xuICAgICAgICAgICAgaWYgKCFyZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQXJyYXkuZnJvbShib2FyZENlbGxzKS5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICAgICAgY2VsbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHJlcG9ydENlbGxDb29yZGluYXRlKTtcbiAgICAgICAgICAgICAgICBjZWxsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBsaWdodFNxdWFyZSk7XG4gICAgICAgICAgICAgICAgY2VsbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdW5saWdodFNxdWFyZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcm90YXRlU2hpcCk7XG4gICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9O1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcm90YXRlU2hpcCk7XG5cbiAgICAgICAgQXJyYXkuZnJvbShib2FyZENlbGxzKS5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVwb3J0Q2VsbENvb3JkaW5hdGUpO1xuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgbGlnaHRTcXVhcmUpO1xuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdW5saWdodFNxdWFyZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwbGFjZVNoaXBzKHBsYXllcnMpIHtcbiAgICBsZXQgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Rocy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1hd2FpdC1pbi1sb29wICovXG4gICAgICAgIGRpc3BsYXlJbnN0cnVjdGlvbnMoYFBsYWNlIHlvdXIgJHtzaGlwTmFtZXNbaV19IWApO1xuICAgICAgICBhd2FpdCBhbGxvd1NoaXBQbGFjZW1lbnQoc2hpcExlbmd0aHNbaV0sIHBsYXllcnMpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZXJyb3InKS50ZXh0Q29udGVudCA9IGBgO1xuICAgIH1cbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWF3YWl0LWluLWxvb3AgKi9cbiAgICBkaXNwbGF5SW5zdHJ1Y3Rpb25zKCdQcmVzcyB0aGUgYnV0dG9uIHRvIHN0YXJ0IScpO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcbiAgICBtb3VzZXBvc2l0aW9uID0gW2UuY2xpZW50WCwgZS5jbGllbnRZXTtcbn0pO1xuXG5leHBvcnQgeyBwbGFjZVNoaXBzIH07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zdGFudC1jb25kaXRpb24gKi9cbmZ1bmN0aW9uIHBsYXllcklucHV0KGFjdGl2ZVBsYXllciwgaW5hY3RpdmUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgbGV0IGRpc2FibGVCb2FyZENvbnRyb2wgPSAoKSA9PiB7fTtcblxuICAgICAgICBjb25zdCByZWdpc3RlckF0dGFjayA9IChlKSA9PiB7XG4gICAgICAgICAgICBsZXQgY2VsbCA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgbGV0IHggPSBOdW1iZXIoY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93JykpO1xuICAgICAgICAgICAgbGV0IHkgPSBOdW1iZXIoY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sJykpO1xuICAgICAgICAgICAgbGV0IHJlcyA9IGluYWN0aXZlLmdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKFt4LCB5XSk7XG4gICAgICAgICAgICBpZiAoIXJlc1swXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRpc2FibGVCb2FyZENvbnRyb2woaW5hY3RpdmUpO1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfTtcblxuICAgICAgICBkaXNhYmxlQm9hcmRDb250cm9sID0gKHApID0+IHtcbiAgICAgICAgICAgIHAuZ2FtZUJvYXJkLnNwYWNlRWxlbWVudHMuZm9yRWFjaCgocm93KSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3cubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcm93W2ldLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgcmVnaXN0ZXJBdHRhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGVuYWJsZUJvYXJkQ29udHJvbCA9IChwKSA9PiB7XG4gICAgICAgICAgICBwLmdhbWVCb2FyZC5zcGFjZUVsZW1lbnRzLmZvckVhY2goKHJvdykgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvd1tpXS5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHJlZ2lzdGVyQXR0YWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBwb3B1bGF0ZVN0YWNrID0gKHgsIHksIGhpdFR5cGUsIHApID0+IHtcbiAgICAgICAgICAgIGlmIChoaXRUeXBlID09PSAnc2hpcCcgJiYgcC5tb3ZlU3RhY2subGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gdXAsIGRvd24sIGxlZnQsIHJpZ2h0XG4gICAgICAgICAgICAgICAgcC5tb3ZlU3RhY2sucHVzaCgnZW5kJyk7XG4gICAgICAgICAgICAgICAgcC5tb3ZlU3RhY2sucHVzaChbeCAtIDEsIHldKTtcbiAgICAgICAgICAgICAgICBwLm1vdmVTdGFjay5wdXNoKFt4ICsgMSwgeV0pO1xuICAgICAgICAgICAgICAgIHAubW92ZVN0YWNrLnB1c2goW3gsIHkgLSAxXSk7XG4gICAgICAgICAgICAgICAgcC5tb3ZlU3RhY2sucHVzaChbeCwgeSArIDFdKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaGl0VHlwZSA9PT0gJ3NoaXAnICYmIHAubW92ZVN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJldiA9IHAubGFzdE1vdmU7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZbMF0gPiB4KSB7XG4gICAgICAgICAgICAgICAgICAgIHAubW92ZVN0YWNrLnB1c2goW3ggLSAxLCB5XSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcmV2WzBdIDwgeCkge1xuICAgICAgICAgICAgICAgICAgICBwLm1vdmVTdGFjay5wdXNoKFt4ICsgMSwgeV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJldlsxXSA+IHkpIHtcbiAgICAgICAgICAgICAgICAgICAgcC5tb3ZlU3RhY2sucHVzaChbeCwgeSAtIDFdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByZXZbMV0gPCB5KSB7XG4gICAgICAgICAgICAgICAgICAgIHAubW92ZVN0YWNrLnB1c2goW3gsIHkgKyAxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGNsZWFyUXVldWVJZlNoaXBTdW5rID0gKHgsIHkpID0+IHtcbiAgICAgICAgICAgIGxldCBzcGFjZSA9IGluYWN0aXZlLmdhbWVCb2FyZC5zcGFjZXNbeF1beV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIChzcGFjZSkgPT09ICdvYmplY3QnICYmIHNwYWNlLnN1bmspIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoYWN0aXZlUGxheWVyLm1vdmVTdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVBsYXllci5tb3ZlU3RhY2sucG9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGdldENQVUNvb3JkaW5hdGVzID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHg7XG4gICAgICAgICAgICBsZXQgeTtcbiAgICAgICAgICAgIGlmIChhY3RpdmVQbGF5ZXIubW92ZVN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dE1vdmUgPSBhY3RpdmVQbGF5ZXIubW92ZVN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgIFt4LCB5XSA9IG5leHRNb3ZlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW3gsIHldO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhY3RpdmVQbGF5ZXIudHlwZSA9PT0gJ2NwdScpIHtcbiAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgbGV0IFt4LCB5XSA9IGdldENQVUNvb3JkaW5hdGVzKCk7XG4gICAgICAgICAgICAgICAgbGV0IHJlcyA9IGluYWN0aXZlLmdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKFt4LCB5XSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc1swXSkge1xuICAgICAgICAgICAgICAgICAgICBwb3B1bGF0ZVN0YWNrKHgsIHksIHJlc1sxXSwgYWN0aXZlUGxheWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlUGxheWVyLmxhc3RNb3ZlID0gW3gsIHldO1xuICAgICAgICAgICAgICAgICAgICBjbGVhclF1ZXVlSWZTaGlwU3Vuayh4LCB5KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGlzYWJsZUJvYXJkQ29udHJvbChpbmFjdGl2ZSk7XG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVuYWJsZUJvYXJkQ29udHJvbChpbmFjdGl2ZSk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCB7IHBsYXllcklucHV0IH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9mb250L0lyb25NYW5PZldhcjJOY3YtRTg1bC50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL2ZvbnQvRGlkYWN0R290aGljLVJlZ3VsYXIudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18gPSBuZXcgVVJMKFwiLi9pbWcvd2F0ZXIuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYFxuQGZvbnQtZmFjZSB7XG5cdGZvbnQtZmFtaWx5OiAnaXJvbm1hbic7XG5cdHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xufVxuXG5AZm9udC1mYWNlIHtcblx0Zm9udC1mYW1pbHk6ICdkaWRhY3QtZ290aGljJztcblx0c3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19ffSk7XG59XG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxuYiwgdSwgaSwgY2VudGVyLFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xuXHRtYXJnaW46IDA7XG5cdHBhZGRpbmc6IDA7XG5cdGJvcmRlcjogMDtcblx0Zm9udC1zaXplOiAxMDAlO1xuXHRmb250OiBpbmhlcml0O1xuXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XG59XG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XG5cdGRpc3BsYXk6IGJsb2NrO1xufVxuYm9keSB7XG5cdGxpbmUtaGVpZ2h0OiAxO1xufVxub2wsIHVsIHtcblx0bGlzdC1zdHlsZTogbm9uZTtcbn1cbmJsb2NrcXVvdGUsIHEge1xuXHRxdW90ZXM6IG5vbmU7XG59XG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcbnE6YmVmb3JlLCBxOmFmdGVyIHtcblx0Y29udGVudDogJyc7XG5cdGNvbnRlbnQ6IG5vbmU7XG59XG50YWJsZSB7XG5cdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG5cdGJvcmRlci1zcGFjaW5nOiAwO1xufVxuXG5ib2R5IHtcblx0Zm9udC1mYW1pbHk6ICdpcm9ubWFuJywgR2VvcmdpYSwgJ1RpbWVzIE5ldyBSb21hbicsIFRpbWVzLCBzZXJpZjtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgaGVpZ2h0OjEwMHZoO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjYmJiYmJiO1xuXHRkaXNwbGF5OiBncmlkO1xuXHRncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcblx0Z3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgOGZyIC41ZnI7XG5cdGdyaWQtY29sdW1uLWdhcDogMHB4O1xuXHRncmlkLXJvdy1nYXA6IDVweDtcblx0cG9zaXRpb246cmVsYXRpdmU7XG59XG5cbi5oZWFkZXIge1xuXHRkaXNwbGF5OiBmbGV4O1xuXHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRoZWlnaHQ6MTAwJTtcbn1cblxuLmhlYWRpbmctdGFicyB7XG5cdGRpc3BsYXk6ZmxleDtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0anVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcblx0bWFyZ2luLWxlZnQ6IGF1dG87XG5cdGdhcDogMTBweDtcblx0bWFyZ2luLXJpZ2h0OiAxNnB4O1xuXHRoZWlnaHQ6OTAlO1xufVxuXG4uaGVhZGluZy10YWJzIGxpIHtcblx0aGVpZ2h0OjUwJTtcblx0YmFja2dyb3VuZC1jb2xvcjogcmdiKDE0NSwgMTczLCAyMTEpO1xuXHRib3JkZXItc3R5bGU6IHNvbGlkO1xuXHRib3JkZXItd2lkdGg6IDJweDtcblx0Ym9yZGVyLWNvbG9yOiByZ2JhKDIzLCA2OCwgMTMzLCAwLjE3OCk7XG5cdGJvcmRlci1yYWRpdXM6IDRweDtcblx0ZGlzcGxheTogZmxleDtcblx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdGZvbnQtZmFtaWx5OiAnZGlkYWN0LWdvdGhpYycsIHNhbnMtc2VyaWY7XG5cdHBhZGRpbmc6IDBweCAxMnB4O1xuXHRjb2xvcjogd2hpdGVzbW9rZTtcblx0Zm9udC13ZWlnaHQ6IDcwMDtcblx0dHJhbnNpdGlvbjogYWxsIDFzIGVhc2UtaW47XG59XG5cbi5oZWFkaW5nLXRhYnMgbGk6aG92ZXIge1xuXHRjdXJzb3I6IHBvaW50ZXI7XG5cdGJhY2tncm91bmQtY29sb3I6ICMxYTRhNzU7XG59XG5cbi5tYWluIHtcblx0ZGlzcGxheTpmbGV4O1xuXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblx0Z2FwOiAydmg7XG5cdGhlaWdodDogMTAwJTtcbn1cblxuYnV0dG9uIHtcblx0Zm9udC1mYW1pbHk6ICdkaWRhY3QtZ290aGljJywgc2Fucy1zZXJpZjtcbn1cblxuLmluaXRpYWxEaXYge1xuXHRoZWlnaHQ6IDUwdmg7XG5cdHdpZHRoOiA2MHZ3O1xuXHRkaXNwbGF5OiBmbGV4O1xuXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0Ym9yZGVyLXJhZGl1czogMzNweDtcblx0Z2FwOiAxcmVtO1xuXHRib3JkZXI6IDhweCBzb2xpZCAjMDAyNTQ2YTg7XG5cdGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxNDVkZWcsICMxNjNlNjIsICMxYTRhNzUpO1xuXHRib3gtc2hhZG93OiAgMTZweCAxNnB4IDE5cHggIzE2NDA2NSxcbiAgICAgICAgICAgICAtMTZweCAtMTZweCAxOXB4ICMxYTRhNzU7XG59XG5cbiNlcnJvcixcbiNpbnN0cnVjdGlvbnMge1xuXHRmb250LWZhbWlseTogJ2lyb25tYW4nLCBzYW5zLXNlcmlmO1xuXHRsZXR0ZXItc3BhY2luZzogMnB4O1xufVxuXG4udGl0bGUge1xuXHRmb250LWZhbWlseTogJ2lyb25tYW4nLCBzYW5zLXNlcmlmO1xuXHRmb250LXNpemU6IDZyZW07XG5cdGxldHRlci1zcGFjaW5nOiAxMHB4O1xuXHQtd2Via2l0LXRleHQtc3Ryb2tlLWNvbG9yOiAjMDAyNjQ3O1xuXHQtd2Via2l0LXRleHQtc3Ryb2tlLXdpZHRoOiAycHg7XG5cdGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KCNlZWUsICM4ZDhkOGQpO1xuXHQtd2Via2l0LWJhY2tncm91bmQtY2xpcDogdGV4dDtcblx0LXdlYmtpdC10ZXh0LWZpbGwtY29sb3I6IHRyYW5zcGFyZW50O1xuXHRvcGFjaXR5OiAwO1xuXHR0cmFuc2l0aW9uOiBhbGwgMnM7XG5cdHBvc2l0aW9uOnJlbGF0aXZlO1xuXHR0b3A6IC0yNSU7XG59XG5cbi50aXRsZS5zaG93IHtcblx0b3BhY2l0eToxO1xuXHR0b3A6MDtcbn1cblxuLmdhbWVBcmVhIHtcblx0d2lkdGg6IDkwdnc7XG5cdGhlaWdodDogOTAlO1xuXHRkaXNwbGF5OmZsZXg7XG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRib3JkZXI6MnB4IHNvbGlkIGJsYWNrO1xufVxuXG4uYm9hcmRBcmVhIHtcbiAgICB3aWR0aDogY2xhbXAoMTUwcHgsIDMwJSwgNDAlKTtcbiAgICBhc3BlY3QtcmF0aW86IDEgLyAxO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XG4gICAgYm9yZGVyOiAycHggc29saWQgIzAwMjY0Nztcblx0YmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fX30pO1xuXHRiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xufVxuXG4ucGxheWVyQXJlYSB7XG5cdGRpc3BsYXk6IGZsZXg7XG5cdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRoZWlnaHQ6MTAwJTtcblx0d2lkdGg6MTAwJTtcblx0dHJhbnNpdGlvbjogYWxsIDEuNXM7XG59XG5cbi5wbGF5ZXJBcmVhOmZpcnN0LWNoaWxkIHtcblx0Ym9yZGVyLXJpZ2h0OiBzb2xpZCAycHggYmxhY2s7XG59XG5cbi5wbGF5ZXJBcmVhLmVubGFyZ2V7XG5cdHdpZHRoOjgwJTtcbn1cblxuLnBsYXllckFyZWEuc21hbGxlciB7XG5cdHdpZHRoOjIwJTtcbn1cblxuLmJvYXJkQXJlYTpob3ZlciB7XG5cdGN1cnNvcjogY3Jvc3NoYWlyO1xufVxuXG4uYm9hcmRTcGFjZSB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG5cdHRyYW5zaXRpb246IGFsbCAuNXM7XG59XG5cbi5jYXJyaWVyIHtcblx0YmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xufVxuXG4uZ2hvc3Qge1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xufVxuXG4jZXJyb3Ige1xuXHRjb2xvcjpyZWQ7XG5cdGZvbnQtc2l6ZTogMnJlbTtcblx0aGVpZ2h0OiAycmVtO1xufVxuXG4jaW5zdHJ1Y3Rpb25zIHtcblx0Zm9udC1zaXplOiAzcmVtO1xuXHRmb250LXdlaWdodDogYm9sZDtcblx0Y29sb3I6ICMwMDI2NDc7XG59XG5cbi5oaWRlIHtcblx0YmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbi5nYW1lYnRue1xuXHRtaW4td2lkdGg6IDEzMHB4O1xuXHRoZWlnaHQ6IDIwJTtcblx0d2lkdGg6IDI1JTtcblx0Zm9udC1zaXplOiAxLjRyZW07XG5cdGNvbG9yOiAjZmZmO1xuXHRwYWRkaW5nOiA1cHggMTBweDtcblx0Zm9udC13ZWlnaHQ6IGJvbGQ7XG5cdGN1cnNvcjogcG9pbnRlcjtcblx0dHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG5cdG91dGxpbmU6IG5vbmU7XG5cdGJvcmRlci1yYWRpdXM6IDVweDtcblx0Ym9yZGVyOiA0cHggc29saWQgI2I0Y2FmYTMxO1xuXHRiYWNrZ3JvdW5kOiAjMWE0YTc1O1xuICB9XG4gIC5nYW1lYnRuOmhvdmVyIHtcblx0YmFja2dyb3VuZDogI2ZmZjtcblx0Y29sb3I6ICMxYTRhNzU7XG5cdGJvcmRlci1jb2xvcjogIzAwMjY0NztcbiAgfVxuXG4uZm9vdGVyIHtcblx0aGVpZ2h0OiAxMDAlO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjNzc3Nzc3O1xuXHR3aWR0aDogMTAwdnc7XG5cdHBvc2l0aW9uOnJlbGF0aXZlO1xuXHR6LWluZGV4OiA0O1xuXHRkaXNwbGF5OmZsZXg7XG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uZm9vdGVyLXRleHQge1xuXHRmb250LXNpemU6IDEuMnJlbTtcblx0bGV0dGVyLXNwYWNpbmc6IDFweDtcbn1cblxuLmZvb3Rlci10ZXh0IGF7XG5cdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0Y29sb3I6ICMxYTRhNzU7XG59XG5cbi53YXZlcyB7XG5cdHBvc2l0aW9uOmFic29sdXRlO1xuXHR0b3A6NjUlO1xuXHRyaWdodDowO1xuXHR3aWR0aDoxMDB2dztcbn1cblxuLndhdmVzdmcge1xuXHR3aWR0aDoxMDB2dztcbn1cblxuLnR1dENvbnRhaW5lciB7XG5cdG92ZXJmbG93OiBhdXRvO1xuXHRoZWlnaHQ6IDYwdmg7XG5cdHdpZHRoOiAyMHZ3O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjYzljOWM5O1xuXHRib3JkZXI6IDRweCBzb2xpZCAjMTY0MDY1O1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHRvcDogLTgwJTtcblx0bGVmdDogNDAlO1xuXHR0cmFuc2l0aW9uOiB0b3AgMnMgZWFzZS1pbi1vdXQ7XG5cdGRpc3BsYXk6IGZsZXg7XG5cdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdHBhZGRpbmc6IDFyZW0gMDtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0Ym9yZGVyLXJhZGl1czogMXJlbTtcbn1cblxuLnR1dENvbnRhaW5lci5zaG93IHtcblx0dG9wOiAyMCU7XG59XG5cbi50dXRIZWFkZXIge1xuXHRmb250LWZhbWlseTogJ2lyb25tYW4nLCBzYW5zLXNlcmlmO1xuXHRmb250LXNpemU6IDNyZW07XG5cdGxldHRlci1zcGFjaW5nOiA0cHg7XG5cdHRleHQtYWxpZ246IGNlbnRlcjtcblx0LXdlYmtpdC10ZXh0LXN0cm9rZS1jb2xvcjogIzAwMjY0NzdhO1xuXHQtd2Via2l0LXRleHQtc3Ryb2tlLXdpZHRoOiAzcHg7XG5cdHdpZHRoOjEwMCU7XG5cdGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjMDAyNjQ3O1xufVxuXG4jY2xvc2VIb3dUbyB7XG5cdGhlaWdodDogMTZweDtcblx0YXNwZWN0LXJhdGlvOiAxIC8gMTtcblx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDAsIDAsIDApO1xuXHRib3JkZXI6IDJweCBzb2xpZCBibGFjaztcblx0cG9zaXRpb246YWJzb2x1dGU7XG5cdHRvcDogMSU7XG5cdHJpZ2h0OiAxJTtcblx0ZGlzcGxheTpmbGV4O1xuXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRmb250LXNpemU6IDEycHg7XG5cdGJvcmRlci1yYWRpdXM6IDUwJTtcbn1cblxuI2Nsb3NlSG93VG86aG92ZXIge1xuXHRjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5zZWN0aW9uRGl2IHtcblx0ZGlzcGxheTogZmxleDtcblx0d2lkdGg6MTAwJTtcblx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdHBhZGRpbmc6IDFyZW0gMDtcblx0Z2FwOiAuNXJlbTtcblx0Ym9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIGJsYWNrO1xufVxuXG4uc2VjdGlvblRpdGxlIHtcblx0Zm9udC1mYW1pbHk6ICdpcm9ubWFuJywgc2Fucy1zZXJpZjtcblx0Zm9udC1zaXplOiAycmVtO1xuXHRsZXR0ZXItc3BhY2luZzogM3B4O1xuXHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdC13ZWJraXQtdGV4dC1zdHJva2UtY29sb3I6ICMwMDI2NDc3YTtcblx0LXdlYmtpdC10ZXh0LXN0cm9rZS13aWR0aDogMnB4O1xuXHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1cblxuLnNlY3Rpb25UZXh0IHtcblx0Zm9udC1zaXplOiAxcmVtO1xuXHR3aWR0aDogOTAlO1xuXHRmb250LWZhbWlseTogJ2RpZGFjdC1nb3RoaWMnLCBzYW5zLXNlcmlmO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQ0E7Q0FDQyxzQkFBc0I7Q0FDdEIsNENBQTRDO0FBQzdDOztBQUVBO0NBQ0MsNEJBQTRCO0NBQzVCLDRDQUEyQztBQUM1QztBQUNBOzs7Ozs7Ozs7Ozs7O0NBYUMsU0FBUztDQUNULFVBQVU7Q0FDVixTQUFTO0NBQ1QsZUFBZTtDQUNmLGFBQWE7Q0FDYix3QkFBd0I7QUFDekI7QUFDQSxnREFBZ0Q7QUFDaEQ7O0NBRUMsY0FBYztBQUNmO0FBQ0E7Q0FDQyxjQUFjO0FBQ2Y7QUFDQTtDQUNDLGdCQUFnQjtBQUNqQjtBQUNBO0NBQ0MsWUFBWTtBQUNiO0FBQ0E7O0NBRUMsV0FBVztDQUNYLGFBQWE7QUFDZDtBQUNBO0NBQ0MseUJBQXlCO0NBQ3pCLGlCQUFpQjtBQUNsQjs7QUFFQTtDQUNDLGdFQUFnRTtJQUM3RCxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixZQUFZO0NBQ2YseUJBQXlCO0NBQ3pCLGFBQWE7Q0FDYiwwQkFBMEI7Q0FDMUIsZ0NBQWdDO0NBQ2hDLG9CQUFvQjtDQUNwQixpQkFBaUI7Q0FDakIsaUJBQWlCO0FBQ2xCOztBQUVBO0NBQ0MsYUFBYTtDQUNiLG1CQUFtQjtDQUNuQixXQUFXO0FBQ1o7O0FBRUE7Q0FDQyxZQUFZO0NBQ1osbUJBQW1CO0NBQ25CLHlCQUF5QjtDQUN6QixpQkFBaUI7Q0FDakIsU0FBUztDQUNULGtCQUFrQjtDQUNsQixVQUFVO0FBQ1g7O0FBRUE7Q0FDQyxVQUFVO0NBQ1Ysb0NBQW9DO0NBQ3BDLG1CQUFtQjtDQUNuQixpQkFBaUI7Q0FDakIsc0NBQXNDO0NBQ3RDLGtCQUFrQjtDQUNsQixhQUFhO0NBQ2IsdUJBQXVCO0NBQ3ZCLG1CQUFtQjtDQUNuQix3Q0FBd0M7Q0FDeEMs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UTtBQUNUOztBQUVBO0NBQ0Msa0NBQWtDO0NBQ2xDLGVBQWU7Q0FDZixtQkFBbUI7Q0FDbkIsa0JBQWtCO0NBQ2xCLG9DQUFvQztDQUNwQyw4QkFBOEI7Q0FDOUIsVUFBVTtDQUNWLGdDQUFnQztBQUNqQzs7QUFFQTtDQUNDLFlBQVk7Q0FDWixtQkFBbUI7Q0FDbkIsb0NBQW9DO0NBQ3BDLHVCQUF1QjtDQUN2QixpQkFBaUI7Q0FDakIsT0FBTztDQUNQLFNBQVM7Q0FDVCxZQUFZO0NBQ1osdUJBQXVCO0NBQ3ZCLG1CQUFtQjtDQUNuQixrQkFBa0I7Q0FDbEIsZUFBZTtDQUNmLGtCQUFrQjtBQUNuQjs7QUFFQTtDQUNDLGVBQWU7QUFDaEI7O0FBRUE7Q0FDQyxhQUFhO0NBQ2IsVUFBVTtDQUNWLHNCQUFzQjtDQUN0Qix1QkFBdUI7Q0FDdkIsbUJBQW1CO0NBQ25CLGVBQWU7Q0FDZixVQUFVO0NBQ1YsOEJBQThCO0FBQy9COztBQUVBO0NBQ0Msa0NBQWtDO0NBQ2xDLGVBQWU7Q0FDZixtQkFBbUI7Q0FDbkIsa0JBQWtCO0NBQ2xCLG9DQUFvQztDQUNwQyw4QkFBOEI7Q0FDOUIsMEJBQTBCO0FBQzNCOztBQUVBO0NBQ0MsZUFBZTtDQUNmLFVBQVU7Q0FDVix3Q0FBd0M7QUFDekNcIixcInNvdXJjZXNDb250ZW50XCI6W1wiXFxuQGZvbnQtZmFjZSB7XFxuXFx0Zm9udC1mYW1pbHk6ICdpcm9ubWFuJztcXG5cXHRzcmM6IHVybCgnLi9mb250L0lyb25NYW5PZldhcjJOY3YtRTg1bC50dGYnKTtcXG59XFxuXFxuQGZvbnQtZmFjZSB7XFxuXFx0Zm9udC1mYW1pbHk6ICdkaWRhY3QtZ290aGljJztcXG5cXHRzcmM6IHVybCgnLi9mb250L0RpZGFjdEdvdGhpYy1SZWd1bGFyLnR0ZicpO1xcbn1cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxuXFx0Zm9udDogaW5oZXJpdDtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5ib2R5IHtcXG5cXHRsaW5lLWhlaWdodDogMTtcXG59XFxub2wsIHVsIHtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLCBxIHtcXG5cXHRxdW90ZXM6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXG59XFxuXFxuYm9keSB7XFxuXFx0Zm9udC1mYW1pbHk6ICdpcm9ubWFuJywgR2VvcmdpYSwgJ1RpbWVzIE5ldyBSb21hbicsIFRpbWVzLCBzZXJpZjtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGhlaWdodDoxMDB2aDtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiAjYmJiYmJiO1xcblxcdGRpc3BsYXk6IGdyaWQ7XFxuXFx0Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxuXFx0Z3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgOGZyIC41ZnI7XFxuXFx0Z3JpZC1jb2x1bW4tZ2FwOiAwcHg7XFxuXFx0Z3JpZC1yb3ctZ2FwOiA1cHg7XFxuXFx0cG9zaXRpb246cmVsYXRpdmU7XFxufVxcblxcbi5oZWFkZXIge1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXHRoZWlnaHQ6MTAwJTtcXG59XFxuXFxuLmhlYWRpbmctdGFicyB7XFxuXFx0ZGlzcGxheTpmbGV4O1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0anVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG5cXHRtYXJnaW4tbGVmdDogYXV0bztcXG5cXHRnYXA6IDEwcHg7XFxuXFx0bWFyZ2luLXJpZ2h0OiAxNnB4O1xcblxcdGhlaWdodDo5MCU7XFxufVxcblxcbi5oZWFkaW5nLXRhYnMgbGkge1xcblxcdGhlaWdodDo1MCU7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogcmdiKDE0NSwgMTczLCAyMTEpO1xcblxcdGJvcmRlci1zdHlsZTogc29saWQ7XFxuXFx0Ym9yZGVyLXdpZHRoOiAycHg7XFxuXFx0Ym9yZGVyLWNvbG9yOiByZ2JhKDIzLCA2OCwgMTMzLCAwLjE3OCk7XFxuXFx0Ym9yZGVyLXJhZGl1czogNHB4O1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuXFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXHRmb250LWZhbWlseTogJ2RpZGFjdC1nb3RoaWMnLCBzYW5zLXNlcmlmO1xcblxcdHBhZGRpbmc6IDBweCAxMnB4O1xcblxcdGNvbG9yOiB3aGl0ZXNtb2tlO1xcblxcdGZvbnQtd2VpZ2h0OiA3MDA7XFxuXFx0dHJhbnNpdGlvbjogYWxsIDFzIGVhc2UtaW47XFxufVxcblxcbi5oZWFkaW5nLXRhYnMgbGk6aG92ZXIge1xcblxcdGN1cnNvcjogcG9pbnRlcjtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiAjMWE0YTc1O1xcbn1cXG5cXG4ubWFpbiB7XFxuXFx0ZGlzcGxheTpmbGV4O1xcblxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG5cXHRnYXA6IDJ2aDtcXG5cXHRoZWlnaHQ6IDEwMCU7XFxufVxcblxcbmJ1dHRvbiB7XFxuXFx0Zm9udC1mYW1pbHk6ICdkaWRhY3QtZ290aGljJywgc2Fucy1zZXJpZjtcXG59XFxuXFxuLmluaXRpYWxEaXYge1xcblxcdGhlaWdodDogNTB2aDtcXG5cXHR3aWR0aDogNjB2dztcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHRib3JkZXItcmFkaXVzOiAzM3B4O1xcblxcdGdhcDogMXJlbTtcXG5cXHRib3JkZXI6IDhweCBzb2xpZCAjMDAyNTQ2YTg7XFxuXFx0YmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE0NWRlZywgIzE2M2U2MiwgIzFhNGE3NSk7XFxuXFx0Ym94LXNoYWRvdzogIDE2cHggMTZweCAxOXB4ICMxNjQwNjUsXFxuICAgICAgICAgICAgIC0xNnB4IC0xNnB4IDE5cHggIzFhNGE3NTtcXG59XFxuXFxuI2Vycm9yLFxcbiNpbnN0cnVjdGlvbnMge1xcblxcdGZvbnQtZmFtaWx5OiAnaXJvbm1hbicsIHNhbnMtc2VyaWY7XFxuXFx0bGV0dGVyLXNwYWNpbmc6IDJweDtcXG59XFxuXFxuLnRpdGxlIHtcXG5cXHRmb250LWZhbWlseTogJ2lyb25tYW4nLCBzYW5zLXNlcmlmO1xcblxcdGZvbnQtc2l6ZTogNnJlbTtcXG5cXHRsZXR0ZXItc3BhY2luZzogMTBweDtcXG5cXHQtd2Via2l0LXRleHQtc3Ryb2tlLWNvbG9yOiAjMDAyNjQ3O1xcblxcdC13ZWJraXQtdGV4dC1zdHJva2Utd2lkdGg6IDJweDtcXG5cXHRiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCgjZWVlLCAjOGQ4ZDhkKTtcXG5cXHQtd2Via2l0LWJhY2tncm91bmQtY2xpcDogdGV4dDtcXG5cXHQtd2Via2l0LXRleHQtZmlsbC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuXFx0b3BhY2l0eTogMDtcXG5cXHR0cmFuc2l0aW9uOiBhbGwgMnM7XFxuXFx0cG9zaXRpb246cmVsYXRpdmU7XFxuXFx0dG9wOiAtMjUlO1xcbn1cXG5cXG4udGl0bGUuc2hvdyB7XFxuXFx0b3BhY2l0eToxO1xcblxcdHRvcDowO1xcbn1cXG5cXG4uZ2FtZUFyZWEge1xcblxcdHdpZHRoOiA5MHZ3O1xcblxcdGhlaWdodDogOTAlO1xcblxcdGRpc3BsYXk6ZmxleDtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcdGJvcmRlcjoycHggc29saWQgYmxhY2s7XFxufVxcblxcbi5ib2FyZEFyZWEge1xcbiAgICB3aWR0aDogY2xhbXAoMTUwcHgsIDMwJSwgNDAlKTtcXG4gICAgYXNwZWN0LXJhdGlvOiAxIC8gMTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjMDAyNjQ3O1xcblxcdGJhY2tncm91bmQtaW1hZ2U6IHVybCgnLi9pbWcvd2F0ZXIuanBnJyk7XFxuXFx0YmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG59XFxuXFxuLnBsYXllckFyZWEge1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHRoZWlnaHQ6MTAwJTtcXG5cXHR3aWR0aDoxMDAlO1xcblxcdHRyYW5zaXRpb246IGFsbCAxLjVzO1xcbn1cXG5cXG4ucGxheWVyQXJlYTpmaXJzdC1jaGlsZCB7XFxuXFx0Ym9yZGVyLXJpZ2h0OiBzb2xpZCAycHggYmxhY2s7XFxufVxcblxcbi5wbGF5ZXJBcmVhLmVubGFyZ2V7XFxuXFx0d2lkdGg6ODAlO1xcbn1cXG5cXG4ucGxheWVyQXJlYS5zbWFsbGVyIHtcXG5cXHR3aWR0aDoyMCU7XFxufVxcblxcbi5ib2FyZEFyZWE6aG92ZXIge1xcblxcdGN1cnNvcjogY3Jvc3NoYWlyO1xcbn1cXG5cXG4uYm9hcmRTcGFjZSB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcblxcdHRyYW5zaXRpb246IGFsbCAuNXM7XFxufVxcblxcbi5jYXJyaWVyIHtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XFxufVxcblxcbi5naG9zdCB7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG59XFxuXFxuI2Vycm9yIHtcXG5cXHRjb2xvcjpyZWQ7XFxuXFx0Zm9udC1zaXplOiAycmVtO1xcblxcdGhlaWdodDogMnJlbTtcXG59XFxuXFxuI2luc3RydWN0aW9ucyB7XFxuXFx0Zm9udC1zaXplOiAzcmVtO1xcblxcdGZvbnQtd2VpZ2h0OiBib2xkO1xcblxcdGNvbG9yOiAjMDAyNjQ3O1xcbn1cXG5cXG4uaGlkZSB7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcblxcbi5nYW1lYnRue1xcblxcdG1pbi13aWR0aDogMTMwcHg7XFxuXFx0aGVpZ2h0OiAyMCU7XFxuXFx0d2lkdGg6IDI1JTtcXG5cXHRmb250LXNpemU6IDEuNHJlbTtcXG5cXHRjb2xvcjogI2ZmZjtcXG5cXHRwYWRkaW5nOiA1cHggMTBweDtcXG5cXHRmb250LXdlaWdodDogYm9sZDtcXG5cXHRjdXJzb3I6IHBvaW50ZXI7XFxuXFx0dHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xcblxcdG91dGxpbmU6IG5vbmU7XFxuXFx0Ym9yZGVyLXJhZGl1czogNXB4O1xcblxcdGJvcmRlcjogNHB4IHNvbGlkICNiNGNhZmEzMTtcXG5cXHRiYWNrZ3JvdW5kOiAjMWE0YTc1O1xcbiAgfVxcbiAgLmdhbWVidG46aG92ZXIge1xcblxcdGJhY2tncm91bmQ6ICNmZmY7XFxuXFx0Y29sb3I6ICMxYTRhNzU7XFxuXFx0Ym9yZGVyLWNvbG9yOiAjMDAyNjQ3O1xcbiAgfVxcblxcbi5mb290ZXIge1xcblxcdGhlaWdodDogMTAwJTtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiAjNzc3Nzc3O1xcblxcdHdpZHRoOiAxMDB2dztcXG5cXHRwb3NpdGlvbjpyZWxhdGl2ZTtcXG5cXHR6LWluZGV4OiA0O1xcblxcdGRpc3BsYXk6ZmxleDtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHRhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uZm9vdGVyLXRleHQge1xcblxcdGZvbnQtc2l6ZTogMS4ycmVtO1xcblxcdGxldHRlci1zcGFjaW5nOiAxcHg7XFxufVxcblxcbi5mb290ZXItdGV4dCBhe1xcblxcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG5cXHRjb2xvcjogIzFhNGE3NTtcXG59XFxuXFxuLndhdmVzIHtcXG5cXHRwb3NpdGlvbjphYnNvbHV0ZTtcXG5cXHR0b3A6NjUlO1xcblxcdHJpZ2h0OjA7XFxuXFx0d2lkdGg6MTAwdnc7XFxufVxcblxcbi53YXZlc3ZnIHtcXG5cXHR3aWR0aDoxMDB2dztcXG59XFxuXFxuLnR1dENvbnRhaW5lciB7XFxuXFx0b3ZlcmZsb3c6IGF1dG87XFxuXFx0aGVpZ2h0OiA2MHZoO1xcblxcdHdpZHRoOiAyMHZ3O1xcblxcdGJhY2tncm91bmQtY29sb3I6ICNjOWM5Yzk7XFxuXFx0Ym9yZGVyOiA0cHggc29saWQgIzE2NDA2NTtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0dG9wOiAtODAlO1xcblxcdGxlZnQ6IDQwJTtcXG5cXHR0cmFuc2l0aW9uOiB0b3AgMnMgZWFzZS1pbi1vdXQ7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0cGFkZGluZzogMXJlbSAwO1xcblxcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuXFx0Ym9yZGVyLXJhZGl1czogMXJlbTtcXG59XFxuXFxuLnR1dENvbnRhaW5lci5zaG93IHtcXG5cXHR0b3A6IDIwJTtcXG59XFxuXFxuLnR1dEhlYWRlciB7XFxuXFx0Zm9udC1mYW1pbHk6ICdpcm9ubWFuJywgc2Fucy1zZXJpZjtcXG5cXHRmb250LXNpemU6IDNyZW07XFxuXFx0bGV0dGVyLXNwYWNpbmc6IDRweDtcXG5cXHR0ZXh0LWFsaWduOiBjZW50ZXI7XFxuXFx0LXdlYmtpdC10ZXh0LXN0cm9rZS1jb2xvcjogIzAwMjY0NzdhO1xcblxcdC13ZWJraXQtdGV4dC1zdHJva2Utd2lkdGg6IDNweDtcXG5cXHR3aWR0aDoxMDAlO1xcblxcdGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjMDAyNjQ3O1xcbn1cXG5cXG4jY2xvc2VIb3dUbyB7XFxuXFx0aGVpZ2h0OiAxNnB4O1xcblxcdGFzcGVjdC1yYXRpbzogMSAvIDE7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDAsIDAsIDApO1xcblxcdGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xcblxcdHBvc2l0aW9uOmFic29sdXRlO1xcblxcdHRvcDogMSU7XFxuXFx0cmlnaHQ6IDElO1xcblxcdGRpc3BsYXk6ZmxleDtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHRmb250LXNpemU6IDEycHg7XFxuXFx0Ym9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG5cXG4jY2xvc2VIb3dUbzpob3ZlciB7XFxuXFx0Y3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uc2VjdGlvbkRpdiB7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHR3aWR0aDoxMDAlO1xcblxcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuXFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXHRwYWRkaW5nOiAxcmVtIDA7XFxuXFx0Z2FwOiAuNXJlbTtcXG5cXHRib3JkZXItYm90dG9tOiAycHggc29saWQgYmxhY2s7XFxufVxcblxcbi5zZWN0aW9uVGl0bGUge1xcblxcdGZvbnQtZmFtaWx5OiAnaXJvbm1hbicsIHNhbnMtc2VyaWY7XFxuXFx0Zm9udC1zaXplOiAycmVtO1xcblxcdGxldHRlci1zcGFjaW5nOiAzcHg7XFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdC13ZWJraXQtdGV4dC1zdHJva2UtY29sb3I6ICMwMDI2NDc3YTtcXG5cXHQtd2Via2l0LXRleHQtc3Ryb2tlLXdpZHRoOiAycHg7XFxuXFx0dGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxufVxcblxcbi5zZWN0aW9uVGV4dCB7XFxuXFx0Zm9udC1zaXplOiAxcmVtO1xcblxcdHdpZHRoOiA5MCU7XFxuXFx0Zm9udC1mYW1pbHk6ICdkaWRhY3QtZ290aGljJywgc2Fucy1zZXJpZjtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJpbmRleFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgeyBjcmVhdGVQbGF5ZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvZ2FtZV9vYmplY3RzJztcbmltcG9ydCB7IHBsYWNlU2hpcHMgfSBmcm9tICcuL2NvbXBvbmVudHMvcGxhY2VTaGlwcyc7XG5pbXBvcnQgeyBwbGF5ZXJJbnB1dCB9IGZyb20gJy4vY29tcG9uZW50cy9wbGF5ZXJJbnB1dCc7XG5pbXBvcnQgeyBkaXNwbGF5SW5zdHJ1Y3Rpb25zIH0gZnJvbSAnLi9jb21wb25lbnRzL2Rpc3BsYXlJbnN0cnVjdGlvbnMnO1xuaW1wb3J0IHsgYnVpbGRIb3dUbyB9IGZyb20gJy4vY29tcG9uZW50cy9ob3dUb1BsYXknO1xuaW1wb3J0IHdhdmVzIGZyb20gJy4vaW1nL3dhdmUuc3ZnJztcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuXG5sZXQgcGxheWVycyA9IFtdO1xuXG5mdW5jdGlvbiByZXN0YXJ0R2FtZSgpIHtcbiAgICB3aGlsZSAocGxheWVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHBsYXllcnMucG9wKCk7XG4gICAgfVxuICAgIGxldCByZXN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3RhcnQnKTtcbiAgICByZXN0YXJ0QnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgcmVzdGFydEdhbWUpO1xuICAgIHJlc3RhcnRCdG4ucmVtb3ZlKCk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluaXRpYWxEaXYnKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGFjZVNoaXBzJykuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBpbml0aWFsaXplR2FtZSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Vycm9yJykudGV4dENvbnRlbnQgPSAnJztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5zdHJ1Y3Rpb25zJykudGV4dENvbnRlbnQgPSAnJztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZUFyZWEnKS5yZW1vdmUoKTtcbn1cblxuZnVuY3Rpb24gdGltZWQoaW50ZXJ2YWwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChyZXNvbHZlLCBpbnRlcnZhbCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHN3aXRjaFNpemUobW9kZSwgYWN0LCBpbmFjdCkge1xuICAgIGlmIChtb2RlID09PSAxKSB7XG4gICAgICAgIGluYWN0LmdhbWVCb2FyZC5wbGF5QXJlYS5jbGFzc0xpc3QuYWRkKCdlbmxhcmdlJyk7XG4gICAgICAgIGFjdC5nYW1lQm9hcmQucGxheUFyZWEuY2xhc3NMaXN0LmFkZCgnc21hbGxlcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGluYWN0LmdhbWVCb2FyZC5wbGF5QXJlYS5jbGFzc0xpc3QucmVtb3ZlKCdlbmxhcmdlJyk7XG4gICAgICAgIGFjdC5nYW1lQm9hcmQucGxheUFyZWEuY2xhc3NMaXN0LnJlbW92ZSgnc21hbGxlcicpO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gbWFpbkxvb3AoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0Z2FtZScpLnJlbW92ZSgpO1xuICAgIGxldCB0dXJuID0gMDtcbiAgICBsZXQgYWN0aXZlUGxheWVyID0gcGxheWVyc1swXTtcbiAgICBsZXQgaW5hY3RpdmVQbGF5ZXIgPSBwbGF5ZXJzWzFdO1xuICAgIHN3aXRjaFNpemUoMSwgYWN0aXZlUGxheWVyLCBpbmFjdGl2ZVBsYXllcik7XG4gICAgd2hpbGUgKCFhY3RpdmVQbGF5ZXIuZ2FtZUJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWF3YWl0LWluLWxvb3AgKi9cbiAgICAgICAgZGlzcGxheUluc3RydWN0aW9ucyhgUGxheWVyICR7TWF0aC5hYnModHVybiAlIDIpICsgMX0gaXMgYWltaW5nLi4uYCk7XG4gICAgICAgIGF3YWl0IHRpbWVkKGFjdGl2ZVBsYXllci50eXBlID09PSAnY3B1JyA/IDIwMDAgOiA1MDApO1xuICAgICAgICBhd2FpdCBwbGF5ZXJJbnB1dChhY3RpdmVQbGF5ZXIsIGluYWN0aXZlUGxheWVyKTtcbiAgICAgICAgdHVybisrO1xuICAgICAgICBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXJzW3R1cm4gJSAyXTtcbiAgICAgICAgaW5hY3RpdmVQbGF5ZXIgPSBwbGF5ZXJzW01hdGguYWJzKCh0dXJuIC0gMSkgJSAyKV07XG4gICAgfVxuICAgIGRpc3BsYXlJbnN0cnVjdGlvbnMoYFBsYXllciAke01hdGguYWJzKCh0dXJuIC0gMSkgJSAyKSArIDF9IFdpbnMhYCk7XG4gICAgbGV0IHJlc3RhcnRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICByZXN0YXJ0QnRuLmlkID0gJ3Jlc3RhcnQnO1xuICAgIHJlc3RhcnRCdG4uY2xhc3NMaXN0LmFkZCgnZ2FtZWJ0bicpO1xuICAgIHJlc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCByZXN0YXJ0R2FtZSk7XG4gICAgcmVzdGFydEJ0bi50ZXh0Q29udGVudCA9IFwiUGxheSBBZ2FpbiFcIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpLmFwcGVuZENoaWxkKHJlc3RhcnRCdG4pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBpbml0aWFsaXplR2FtZSgpIHtcbiAgICBsZXQgcmVtYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYWNlU2hpcHMnKTtcbiAgICByZW1idXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBpbml0aWFsaXplR2FtZSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluaXRpYWxEaXYnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGxldCBnYW1lQXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGdhbWVBcmVhLmNsYXNzTGlzdC5hZGQoJ2dhbWVBcmVhJyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4nKS5hcHBlbmRDaGlsZChnYW1lQXJlYSk7XG4gICAgcGxheWVycy5wdXNoKGNyZWF0ZVBsYXllcignaHVtJykpO1xuICAgIHBsYXllcnNbMF0uZ2FtZUJvYXJkLmRpc3BsYXlCb2FyZCgpO1xuICAgIGF3YWl0IHBsYWNlU2hpcHMocGxheWVycyk7XG4gICAgcGxheWVycy5wdXNoKGNyZWF0ZVBsYXllcignY3B1JykpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlcnJvcicpLnRleHRDb250ZW50ID0gJyc7XG4gICAgbGV0IHN0YXJ0R2FtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHN0YXJ0R2FtZS5pZCA9ICdzdGFydGdhbWUnO1xuICAgIHN0YXJ0R2FtZS5jbGFzc0xpc3QuYWRkKCdnYW1lYnRuJyk7XG4gICAgc3RhcnRHYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgbWFpbkxvb3ApO1xuICAgIHN0YXJ0R2FtZS50ZXh0Q29udGVudCA9IFwiQ2xpY2sgaGVyZSB0byBzdGFydCFcIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpLmFwcGVuZENoaWxkKHN0YXJ0R2FtZSk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlHYW1lQnV0dG9uKCkge1xuICAgIC8vIGxldCB3YXZlaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgLy8gd2F2ZWltZy5zcmMgPSB3YXZlcztcbiAgICAvLyB3YXZlaW1nLmNsYXNzTGlzdC5hZGQoJ3dhdmVzdmcnKTtcbiAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2F2ZXMnKS5hcHBlbmRDaGlsZCh3YXZlaW1nKTtcbiAgICBidWlsZEhvd1RvKCk7XG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdpbml0aWFsRGl2Jyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4nKS5hcHBlbmRDaGlsZChkaXYpO1xuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgndGl0bGUnKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiQmF0dGxlc2hpcFwiO1xuICAgIGRpdi5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7IHRpdGxlLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTsgfSwgMTAwKTtcbiAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnV0dG9uLmlkID0gJ3BsYWNlU2hpcHMnO1xuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdnYW1lYnRuJyk7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgaW5pdGlhbGl6ZUdhbWUpO1xuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IFwiU3RhcnQgUGxhY2luZyB5b3VyIFNoaXBzIVwiO1xuICAgIGRpdi5hcHBlbmRDaGlsZChidXR0b24pO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGRpc3BsYXlHYW1lQnV0dG9uKTtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NvdXJjZScpLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgKCkgPT4ge1xuICAgIHdpbmRvdy5vcGVuKCdodHRwczovL2dpdGh1Yi5jb20vTk1HVm94L0JhdHRsZXNoaXAnLCAnX2JsYW5rJyk7XG59KTtcbiJdLCJuYW1lcyI6WyJkaXNwbGF5SW5zdHJ1Y3Rpb25zIiwibXNnIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGV4dENvbnRlbnQiLCJzaGlwRmFjdG9yeSIsImxlbiIsImxlbmd0aCIsImhpdHMiLCJzaGlwIiwib3JpZW50YXRpb24iLCJpc1N1bmsiLCJzdW5rIiwiaXNIaXQiLCJjaGFuZ2VPcmllbnRhdGlvbiIsImdldE9yaWVudGF0aW9uIiwiZ2FtZUJvYXJkRmFjdG9yeSIsInNoaXBzIiwic3BhY2VzIiwiQXJyYXkiLCJtYXAiLCJzcGFjZUVsZW1lbnRzIiwicGxheUFyZWEiLCJnYW1lQm9hcmQiLCJkaXNwbGF5Qm9hcmQiLCJwbGF5ZXJBcmVhIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImJvYXJkQXJlYSIsIngiLCJ5IiwibmV3U3BhY2UiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImdlbmVyYXRlU3BhY2VzIiwib2NjdXBpZWQiLCJpIiwicHVzaCIsImlzVmFsaWRQbGFjZW1lbnQiLCJzaGlwT2NjdXBhbmN5IiwidW5kZWZpbmVkIiwicGxhY2VTaGlwIiwiY29vcmQiLCJuZXdTaGlwIiwiTnVtYmVyIiwidGFyZ2V0U3BhY2UiLCJyZW1vdmUiLCJhbGxTaGlwc1N1bmsiLCJldmVyeSIsImlzQXR0YWNrT3V0T2ZCb3VuZHMiLCJyZWNlaXZlQXR0YWNrIiwiYXR0YWNrZWRTcGFjZSIsImluY2x1ZGVzIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjcmVhdGVQbGF5ZXIiLCJ0eXBlIiwibW92ZVN0YWNrIiwibGFzdE1vdmUiLCJsZW5ndGhzIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibyIsInJlcyIsImZvckVhY2giLCJlbGVyb3ciLCJlbGUiLCJwbGF5ZXIiLCJzaG93SG93VG8iLCJjb250YWluZXIiLCJjbG9zZUhvd1RvIiwiYWRkRGl2Iiwic2VjdGlvbkhlYWRlciIsInRleHQiLCJuZXdEaXYiLCJ0aXRsZSIsInNlY3Rpb25UZXh0IiwiYnVpbGRIb3dUbyIsInR1dG9yaWFsQ29udGFpbmVyIiwiY2xvc2VidXR0b24iLCJpZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzaGlwTmFtZXMiLCJtb3VzZXBvc2l0aW9uIiwiYWxsb3dTaGlwUGxhY2VtZW50IiwicGxheWVycyIsIlByb21pc2UiLCJyZXNvbHZlIiwiYm9hcmRDZWxscyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJnZXRBZmZlY3RlZFNxdWFyZXMiLCJjZWxscyIsImNvb3JkcyIsInhpIiwieWkiLCJ0aGlzQ2VsbCIsInVwZGF0ZVNoaXBEaXNwbGF5IiwiZWxlbWVudEZyb21Qb2ludCIsImNvbnRhaW5zIiwiZ2V0QXR0cmlidXRlIiwiY2VsbCIsInJvdGF0ZVNoaXAiLCJldmVudCIsImtleUNvZGUiLCJsaWdodFNxdWFyZSIsInRhcmdldCIsInVubGlnaHRTcXVhcmUiLCJyZXBvcnRDZWxsQ29vcmRpbmF0ZSIsInNwYWNlIiwiZnJvbSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ3aW5kb3ciLCJwbGFjZVNoaXBzIiwic2hpcExlbmd0aHMiLCJlIiwiY2xpZW50WCIsImNsaWVudFkiLCJwbGF5ZXJJbnB1dCIsImFjdGl2ZVBsYXllciIsImluYWN0aXZlIiwiZGlzYWJsZUJvYXJkQ29udHJvbCIsInJlZ2lzdGVyQXR0YWNrIiwicCIsInJvdyIsImVuYWJsZUJvYXJkQ29udHJvbCIsInBvcHVsYXRlU3RhY2siLCJoaXRUeXBlIiwicHJldiIsImNsZWFyUXVldWVJZlNoaXBTdW5rIiwicG9wIiwiZ2V0Q1BVQ29vcmRpbmF0ZXMiLCJuZXh0TW92ZSIsIndhdmVzIiwicmVzdGFydEdhbWUiLCJyZXN0YXJ0QnRuIiwiZGlzcGxheSIsImluaXRpYWxpemVHYW1lIiwidGltZWQiLCJpbnRlcnZhbCIsInNldFRpbWVvdXQiLCJzd2l0Y2hTaXplIiwibW9kZSIsImFjdCIsImluYWN0IiwibWFpbkxvb3AiLCJ0dXJuIiwiaW5hY3RpdmVQbGF5ZXIiLCJhYnMiLCJyZW1idXR0b24iLCJnYW1lQXJlYSIsInN0YXJ0R2FtZSIsImRpc3BsYXlHYW1lQnV0dG9uIiwiZGl2IiwiYnV0dG9uIiwib3BlbiJdLCJzb3VyY2VSb290IjoiIn0=