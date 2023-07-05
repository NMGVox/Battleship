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
function shipFactory(len, name) {
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
  function noShipsLeft() {
    const allSunk = ships.every(ship => ship.isSunk === true);
    return allSunk;
  }
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
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `html, body, div, span, applet, object, iframe,
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
    display: flex;
    justify-content: center;
    align-items: center;
    height:100vh;
	flex-direction: column;
}

.initialDiv {
	height: 50vh;
	width: 60vw;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: black;
}

.boardArea {
    width: clamp(150px, 40%, 70%);
    aspect-ratio: 1 / 1;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    border: 2px solid black;
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

.gameArea {
	width: 90vw;
	height: 80vh;
	display:flex;
	justify-content: center;
	align-items: center;
	border:2px solid black;
}

.playerArea {
	display: flex;
	align-items: center;
	justify-content: center;
	height:100%;
	width:100%;
	border: 1px solid black;
	transition: all 1.5s;
}

.playerArea.enlarge{
	width:80%;
}

.playerArea.smaller {
	width:20%;
}

#error {
	color:red;
	font-size: 1.2rem;
	height: 1.2rem;
}

#instructions {
	font-size: 2rem;
	font-weight: bold;
}

.hide {
	background-color: transparent;
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;CAaC,SAAS;CACT,UAAU;CACV,SAAS;CACT,eAAe;CACf,aAAa;CACb,wBAAwB;AACzB;AACA,gDAAgD;AAChD;;CAEC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,gBAAgB;AACjB;AACA;CACC,YAAY;AACb;AACA;;CAEC,WAAW;CACX,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,iBAAiB;AAClB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,YAAY;CACf,sBAAsB;AACvB;;AAEA;CACC,YAAY;CACZ,WAAW;CACX,aAAa;CACb,mBAAmB;CACnB,uBAAuB;CACvB,uBAAuB;AACxB;;AAEA;IACI,6BAA6B;IAC7B,mBAAmB;IACnB,aAAa;IACb,sCAAsC;IACtC,mCAAmC;IACnC,uBAAuB;AAC3B;;AAEA;CACC,iBAAiB;AAClB;;AAEA;IACI,uBAAuB;CAC1B,mBAAmB;AACpB;;AAEA;CACC,2BAA2B;AAC5B;;AAEA;CACC,sBAAsB;AACvB;;AAEA;CACC,WAAW;CACX,YAAY;CACZ,YAAY;CACZ,uBAAuB;CACvB,mBAAmB;CACnB,sBAAsB;AACvB;;AAEA;CACC,aAAa;CACb,mBAAmB;CACnB,uBAAuB;CACvB,WAAW;CACX,UAAU;CACV,uBAAuB;CACvB,oBAAoB;AACrB;;AAEA;CACC,SAAS;AACV;;AAEA;CACC,SAAS;AACV;;AAEA;CACC,SAAS;CACT,iBAAiB;CACjB,cAAc;AACf;;AAEA;CACC,eAAe;CACf,iBAAiB;AAClB;;AAEA;CACC,6BAA6B;AAC9B","sourcesContent":["html, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\nbody {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height:100vh;\n\tflex-direction: column;\n}\n\n.initialDiv {\n\theight: 50vh;\n\twidth: 60vw;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\tbackground-color: black;\n}\n\n.boardArea {\n    width: clamp(150px, 40%, 70%);\n    aspect-ratio: 1 / 1;\n    display: grid;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(10, 1fr);\n    border: 2px solid black;\n}\n\n.boardArea:hover {\n\tcursor: crosshair;\n}\n\n.boardSpace {\n    border: 1px solid black;\n\ttransition: all .5s;\n}\n\n.carrier {\n\tbackground-color: lightblue;\n}\n\n.ghost {\n\tbackground-color: grey;\n}\n\n.gameArea {\n\twidth: 90vw;\n\theight: 80vh;\n\tdisplay:flex;\n\tjustify-content: center;\n\talign-items: center;\n\tborder:2px solid black;\n}\n\n.playerArea {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\theight:100%;\n\twidth:100%;\n\tborder: 1px solid black;\n\ttransition: all 1.5s;\n}\n\n.playerArea.enlarge{\n\twidth:80%;\n}\n\n.playerArea.smaller {\n\twidth:20%;\n}\n\n#error {\n\tcolor:red;\n\tfont-size: 1.2rem;\n\theight: 1.2rem;\n}\n\n#instructions {\n\tfont-size: 2rem;\n\tfont-weight: bold;\n}\n\n.hide {\n\tbackground-color: transparent;\n}"],"sourceRoot":""}]);
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
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.css */ "./src/style.css");





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
  // while (!activePlayer.gameBoard.allShipsSunk()) {
  //     /* eslint-disable no-await-in-loop */
  //     displayInstructions(`Player ${Math.abs(turn % 2) + 1} is aiming...`);
  //     await timed(activePlayer.type === 'cpu' ? 2000 : 500);
  //     await playerInput(activePlayer, inactivePlayer);
  //     turn++;
  //     activePlayer = players[turn % 2];
  //     inactivePlayer = players[Math.abs((turn - 1) % 2)];
  // }
  (0,_components_displayInstructions__WEBPACK_IMPORTED_MODULE_3__.displayInstructions)(`Player ${Math.abs((turn - 1) % 2) + 1} Wins!`);
  let restartBtn = document.createElement('button');
  restartBtn.id = 'restart';
  restartBtn.classList.add('genericBtn');
  restartBtn.addEventListener('pointerdown', restartGame);
  restartBtn.textContent = "Play Again!";
  document.querySelector('body').appendChild(restartBtn);
}
async function initializeGame() {
  let rembutton = document.querySelector('#placeShips');
  rembutton.removeEventListener('pointerdown', initializeGame);
  document.querySelector('.initialDiv').style.display = 'none';
  let gameArea = document.createElement('div');
  gameArea.classList.add('gameArea');
  document.querySelector('body').appendChild(gameArea);
  players.push((0,_components_game_objects__WEBPACK_IMPORTED_MODULE_0__.createPlayer)('hum'));
  players[0].gameBoard.displayBoard();
  await (0,_components_placeShips__WEBPACK_IMPORTED_MODULE_1__.placeShips)(players);
  players.push((0,_components_game_objects__WEBPACK_IMPORTED_MODULE_0__.createPlayer)('cpu'));
  document.querySelector('#error').textContent = '';
  let startGame = document.createElement('button');
  startGame.id = 'startgame';
  startGame.addEventListener('pointerdown', mainLoop);
  startGame.textContent = "Click here to start!";
  document.querySelector('body').appendChild(startGame);
}
function displayGameButton() {
  let div = document.createElement('div');
  div.classList.add('initialDiv');
  document.querySelector('body').appendChild(div);
  let button = document.createElement('button');
  button.id = 'placeShips';
  button.addEventListener('pointerdown', initializeGame);
  button.textContent = "Start Placing your Ships!";
  div.appendChild(button);
}
window.addEventListener('load', displayGameButton);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FBVyxHQUFHLEVBQUU7RUFDakQsSUFBSTBJLFNBQVMsR0FBRzVJLFFBQVEsQ0FBQzRCLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFDaERnSCxTQUFTLENBQUNILEVBQUUsR0FBRyxXQUFXO0VBQzFCRyxTQUFTLENBQUN2QyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUVnQyxRQUFRLENBQUM7RUFDbkRPLFNBQVMsQ0FBQzFJLFdBQVcsR0FBRyxzQkFBc0I7RUFDOUNGLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDbUMsV0FBVyxDQUFDd0csU0FBUyxDQUFDO0FBQ3pEO0FBRUEsU0FBU0MsaUJBQWlCQSxDQUFBLEVBQUc7RUFDekIsSUFBSUMsR0FBRyxHQUFHOUksUUFBUSxDQUFDNEIsYUFBYSxDQUFDLEtBQUssQ0FBQztFQUN2Q2tILEdBQUcsQ0FBQ2pILFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFlBQVksQ0FBQztFQUMvQjlCLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDbUMsV0FBVyxDQUFDMEcsR0FBRyxDQUFDO0VBQy9DLElBQUlDLE1BQU0sR0FBRy9JLFFBQVEsQ0FBQzRCLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFDN0NtSCxNQUFNLENBQUNOLEVBQUUsR0FBRyxZQUFZO0VBQ3hCTSxNQUFNLENBQUMxQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUV3QixjQUFjLENBQUM7RUFDdERrQixNQUFNLENBQUM3SSxXQUFXLEdBQUcsMkJBQTJCO0VBQ2hENEksR0FBRyxDQUFDMUcsV0FBVyxDQUFDMkcsTUFBTSxDQUFDO0FBQzNCO0FBRUEzQyxNQUFNLENBQUNDLGdCQUFnQixDQUFDLE1BQU0sRUFBRXdDLGlCQUFpQixDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvZGlzcGxheUluc3RydWN0aW9ucy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvZ2FtZV9vYmplY3RzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9sZW5ndGhzVG9OYW1lcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvcGxhY2VTaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvcGxheWVySW5wdXQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGRpc3BsYXlJbnN0cnVjdGlvbnMobXNnKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luc3RydWN0aW9ucycpLnRleHRDb250ZW50ID0gbXNnO1xufVxuXG5leHBvcnQgeyBkaXNwbGF5SW5zdHJ1Y3Rpb25zIH07XG4iLCJmdW5jdGlvbiBzaGlwRmFjdG9yeShsZW4sIG5hbWUpIHtcbiAgICBjb25zdCBsZW5ndGggPSBsZW47XG4gICAgY29uc3QgaGl0cyA9IDA7XG4gICAgbGV0IHNoaXA7XG4gICAgbGV0IG9yaWVudGF0aW9uID0gMDtcblxuICAgIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICAgICAgaWYgKHNoaXAuaGl0cyA9PT0gc2hpcC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNoaXAuc3VuayA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0hpdCgpIHtcbiAgICAgICAgc2hpcC5oaXRzKys7XG4gICAgICAgIGlzU3VuaygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoYW5nZU9yaWVudGF0aW9uKCkge1xuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09IDApIHtcbiAgICAgICAgICAgIG9yaWVudGF0aW9uID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9yaWVudGF0aW9uID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNoaXAgPSB7XG4gICAgICAgIGxlbmd0aCxcbiAgICAgICAgaGl0cyxcbiAgICAgICAgc3VuazogZmFsc2UsXG4gICAgICAgIGlzSGl0LFxuICAgICAgICBpc1N1bmssXG4gICAgICAgIGNoYW5nZU9yaWVudGF0aW9uLFxuICAgICAgICBnZXRPcmllbnRhdGlvbjogKCkgPT4gb3JpZW50YXRpb24sXG4gICAgfTtcblxuICAgIHJldHVybiBzaGlwO1xufVxuXG5mdW5jdGlvbiBnYW1lQm9hcmRGYWN0b3J5KCkge1xuICAgIGNvbnN0IHNoaXBzID0gW107XG4gICAgY29uc3Qgc3BhY2VzID0gWy4uLkFycmF5KDEwKV0ubWFwKCgpID0+IEFycmF5KDEwKSk7XG4gICAgY29uc3Qgc3BhY2VFbGVtZW50cyA9IFsuLi5BcnJheSgxMCldLm1hcCgoKSA9PiBBcnJheSgxMCkpO1xuICAgIGxldCBwbGF5QXJlYTtcbiAgICBsZXQgZ2FtZUJvYXJkO1xuXG4gICAgZnVuY3Rpb24gbm9TaGlwc0xlZnQoKSB7XG4gICAgICAgIGNvbnN0IGFsbFN1bmsgPSBzaGlwcy5ldmVyeShcbiAgICAgICAgICAgIChzaGlwKSA9PiAoc2hpcC5pc1N1bmsgPT09IHRydWUpLFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gYWxsU3VuaztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNwbGF5Qm9hcmQoKSB7XG4gICAgICAgIGxldCBwbGF5ZXJBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHBsYXllckFyZWEuY2xhc3NMaXN0LmFkZCgncGxheWVyQXJlYScpO1xuICAgICAgICBnYW1lQm9hcmQucGxheUFyZWEgPSBwbGF5ZXJBcmVhO1xuICAgICAgICBsZXQgYm9hcmRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJvYXJkQXJlYS5jbGFzc0xpc3QuYWRkKCdib2FyZEFyZWEnKTtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5KyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3U3BhY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBuZXdTcGFjZS5jbGFzc0xpc3QuYWRkKCdib2FyZFNwYWNlJyk7XG4gICAgICAgICAgICAgICAgbmV3U3BhY2Uuc2V0QXR0cmlidXRlKCdkYXRhLXJvdycsIHgpO1xuICAgICAgICAgICAgICAgIG5ld1NwYWNlLnNldEF0dHJpYnV0ZSgnZGF0YS1jb2wnLCB5KTtcbiAgICAgICAgICAgICAgICBib2FyZEFyZWEuYXBwZW5kQ2hpbGQobmV3U3BhY2UpO1xuICAgICAgICAgICAgICAgIHNwYWNlRWxlbWVudHNbeF1beV0gPSBuZXdTcGFjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwbGF5ZXJBcmVhLmFwcGVuZENoaWxkKGJvYXJkQXJlYSk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lQXJlYScpLmFwcGVuZENoaWxkKHBsYXllckFyZWEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlU3BhY2VzKG9yaWVudGF0aW9uLCBsZW4sIHgsIHkpIHtcbiAgICAgICAgbGV0IG9jY3VwaWVkID0gW107XG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIG9jY3VwaWVkLnB1c2goW3gsIHkgKyBpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgb2NjdXBpZWQucHVzaChbeCArIGksIHldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2NjdXBpZWQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNWYWxpZFBsYWNlbWVudChzaGlwT2NjdXBhbmN5KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcE9jY3VwYW5jeS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHggPSBzaGlwT2NjdXBhbmN5W2ldWzBdO1xuICAgICAgICAgICAgbGV0IHkgPSBzaGlwT2NjdXBhbmN5W2ldWzFdO1xuICAgICAgICAgICAgaWYgKCEoKHggPCAxMCAmJiB4ID49IDApICYmICh5IDwgMTAgJiYgeSA+PSAwKSkpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZXJyb3InKS50ZXh0Q29udGVudCA9IGBDYW4ndCBwbGFjZSBoZXJlIWA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGdhbWVCb2FyZC5zcGFjZXNbeF1beV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlcnJvcicpLnRleHRDb250ZW50ID0gYENhbid0IHBsYWNlIGhlcmUhYDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VTaGlwKGxlbiwgY29vcmQsIG9yaWVudGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IG5ld1NoaXAgPSBzaGlwRmFjdG9yeShsZW4pO1xuICAgICAgICBjb25zdCBzaGlwT2NjdXBhbmN5ID0gZ2VuZXJhdGVTcGFjZXMob3JpZW50YXRpb24sIGxlbiwgTnVtYmVyKGNvb3JkWzBdKSwgTnVtYmVyKGNvb3JkWzFdKSk7XG4gICAgICAgIGlmICghaXNWYWxpZFBsYWNlbWVudChzaGlwT2NjdXBhbmN5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB4ID0gc2hpcE9jY3VwYW5jeVtpXVswXTtcbiAgICAgICAgICAgIGxldCB5ID0gc2hpcE9jY3VwYW5jeVtpXVsxXTtcbiAgICAgICAgICAgIGdhbWVCb2FyZC5zcGFjZXNbeF1beV0gPSBuZXdTaGlwO1xuICAgICAgICAgICAgbGV0IHRhcmdldFNwYWNlID0gc3BhY2VFbGVtZW50c1t4XVt5XTtcbiAgICAgICAgICAgIHRhcmdldFNwYWNlLmNsYXNzTGlzdC5yZW1vdmUoJ2dob3N0Jyk7XG4gICAgICAgICAgICB0YXJnZXRTcGFjZS5jbGFzc0xpc3QuYWRkKCdjYXJyaWVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgZ2FtZUJvYXJkLnNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFsbFNoaXBzU3VuaygpIHtcbiAgICAgICAgcmV0dXJuIGdhbWVCb2FyZC5zaGlwcy5ldmVyeShcbiAgICAgICAgICAgIChzaGlwKSA9PiBzaGlwLnN1bmsgPT09IHRydWUsXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNBdHRhY2tPdXRPZkJvdW5kcyh4LCB5KSB7XG4gICAgICAgIGlmICghKCh4IDwgMTAgJiYgeCA+PSAwKSAmJiAoeSA8IDEwICYmIHkgPj0gMCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhjb29yZCkge1xuICAgICAgICBjb25zdCB4ID0gY29vcmRbMF07XG4gICAgICAgIGNvbnN0IHkgPSBjb29yZFsxXTtcblxuICAgICAgICBpZiAoaXNBdHRhY2tPdXRPZkJvdW5kcyh4LCB5KSkge1xuICAgICAgICAgICAgcmV0dXJuIFtmYWxzZSwgbnVsbF07XG4gICAgICAgIH1cbiAgICAgICAgZ2FtZUJvYXJkLnNwYWNlRWxlbWVudHNbeF1beV0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgICAgIGNvbnN0IGF0dGFja2VkU3BhY2UgPSBnYW1lQm9hcmQuc3BhY2VzW3hdW3ldO1xuICAgICAgICBpZiAoYXR0YWNrZWRTcGFjZSA9PT0gJ3gnKSB7XG4gICAgICAgICAgICByZXR1cm4gW2ZhbHNlLCBudWxsXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2FtZUJvYXJkLnNoaXBzLmluY2x1ZGVzKGF0dGFja2VkU3BhY2UpKSB7XG4gICAgICAgICAgICBhdHRhY2tlZFNwYWNlLmlzSGl0KCk7XG4gICAgICAgICAgICBnYW1lQm9hcmQuc3BhY2VFbGVtZW50c1t4XVt5XS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmx1ZSc7XG4gICAgICAgICAgICByZXR1cm4gW3RydWUsICdzaGlwJ107XG4gICAgICAgIH0gaWYgKGdhbWVCb2FyZC5zcGFjZXNbeF1beV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZ2FtZUJvYXJkLnNwYWNlc1t4XVt5XSA9ICd4JztcbiAgICAgICAgICAgIGdhbWVCb2FyZC5zcGFjZUVsZW1lbnRzW3hdW3ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuICAgICAgICAgICAgcmV0dXJuIFt0cnVlLCAnZW1wdHknXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2ZhbHNlLCBudWxsXTtcbiAgICB9XG5cbiAgICBnYW1lQm9hcmQgPSB7XG4gICAgICAgIHNoaXBzLFxuICAgICAgICBzcGFjZXMsXG4gICAgICAgIHBsYWNlU2hpcCxcbiAgICAgICAgcmVjZWl2ZUF0dGFjayxcbiAgICAgICAgYWxsU2hpcHNTdW5rLFxuICAgICAgICBkaXNwbGF5Qm9hcmQsXG4gICAgICAgIGdlbmVyYXRlU3BhY2VzLFxuICAgICAgICBzcGFjZUVsZW1lbnRzLFxuICAgICAgICBwbGF5QXJlYSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIGdhbWVCb2FyZDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUGxheWVyKHR5cGUpIHtcbiAgICBjb25zdCBnYW1lQm9hcmQgPSBnYW1lQm9hcmRGYWN0b3J5KCk7XG4gICAgY29uc3QgbW92ZVN0YWNrID0gW107XG4gICAgbGV0IGxhc3RNb3ZlO1xuXG4gICAgaWYgKHR5cGUgPT09ICdjcHUnKSB7XG4gICAgICAgIGdhbWVCb2FyZC5kaXNwbGF5Qm9hcmQoKTtcbiAgICAgICAgY29uc3QgbGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IG8gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGdhbWVCb2FyZC5wbGFjZVNoaXAobGVuZ3Roc1tpXSwgW3gsIHldLCBvKTtcbiAgICAgICAgICAgIGlmICghcmVzKSB7XG4gICAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGdhbWVCb2FyZC5zcGFjZUVsZW1lbnRzLmZvckVhY2goKGVsZXJvdykgPT4ge1xuICAgICAgICAgICAgZWxlcm93LmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcGxheWVyID0ge1xuICAgICAgICB0eXBlLFxuICAgICAgICBnYW1lQm9hcmQsXG4gICAgICAgIG1vdmVTdGFjayxcbiAgICAgICAgbGFzdE1vdmUsXG4gICAgfTtcbiAgICByZXR1cm4gcGxheWVyO1xufVxuXG5leHBvcnQgeyBjcmVhdGVQbGF5ZXIgfTtcbiIsImNvbnN0IHNoaXBOYW1lcyA9IFtcbiAgICAnY2FycmllcicsXG4gICAgJ2JhdHRsZXNoaXAnLFxuICAgICdzdWJtYXJpbmUnLFxuICAgICdjcnVpc2VyJyxcbiAgICAnZGVzdHJveWVyJyxcbl07XG5cbmV4cG9ydCB7IHNoaXBOYW1lcyB9O1xuIiwiaW1wb3J0IHsgc2hpcE5hbWVzIH0gZnJvbSAnLi9sZW5ndGhzVG9OYW1lcyc7XG5pbXBvcnQgeyBkaXNwbGF5SW5zdHJ1Y3Rpb25zIH0gZnJvbSAnLi9kaXNwbGF5SW5zdHJ1Y3Rpb25zJztcblxubGV0IG1vdXNlcG9zaXRpb247XG5cbmZ1bmN0aW9uIGFsbG93U2hpcFBsYWNlbWVudChsZW5ndGgsIHBsYXllcnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgY29uc3QgYm9hcmRDZWxscyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvYXJkU3BhY2UnKTtcbiAgICAgICAgbGV0IG9yaWVudGF0aW9uID0gMDtcbiAgICAgICAgY29uc3QgZ2V0QWZmZWN0ZWRTcXVhcmVzID0gKHgsIHkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGxzID0gW107XG4gICAgICAgICAgICBsZXQgY29vcmRzID0gcGxheWVyc1swXS5nYW1lQm9hcmQuZ2VuZXJhdGVTcGFjZXMob3JpZW50YXRpb24sIGxlbmd0aCwgeCwgeSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCB4aSA9IGNvb3Jkc1tpXVswXTtcbiAgICAgICAgICAgICAgICBsZXQgeWkgPSBjb29yZHNbaV1bMV07XG4gICAgICAgICAgICAgICAgbGV0IHRoaXNDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PVwiJHt4aX1cIl1bZGF0YS1jb2w9XCIke3lpfVwiXWApO1xuICAgICAgICAgICAgICAgIGNlbGxzLnB1c2godGhpc0NlbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNlbGxzO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZVNoaXBEaXNwbGF5ID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRoaXNDZWxsID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChtb3VzZXBvc2l0aW9uWzBdLCBtb3VzZXBvc2l0aW9uWzFdKTtcbiAgICAgICAgICAgIGlmICghdGhpc0NlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdib2FyZFNwYWNlJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgeCA9IE51bWJlcih0aGlzQ2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93JykpO1xuICAgICAgICAgICAgbGV0IHkgPSBOdW1iZXIodGhpc0NlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbCcpKTtcbiAgICAgICAgICAgIGxldCBjZWxscyA9IGdldEFmZmVjdGVkU3F1YXJlcyh4LCB5KTtcbiAgICAgICAgICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbCAhPT0gbnVsbCAmJiBjZWxsLmNsYXNzTGlzdC5jb250YWlucygnZ2hvc3QnKSkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2dob3N0Jyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjZWxsICE9PSBudWxsICYmICFjZWxsLmNsYXNzTGlzdC5jb250YWlucygnZ2hvc3QnKSkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2dob3N0Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgcm90YXRlU2hpcCA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgIT09IDMyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXBkYXRlU2hpcERpc3BsYXkoKTtcbiAgICAgICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gMSkge1xuICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7IG9yaWVudGF0aW9uID0gMTsgfVxuICAgICAgICAgICAgdXBkYXRlU2hpcERpc3BsYXkoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGxpZ2h0U3F1YXJlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBsZXQgeCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93Jyk7XG4gICAgICAgICAgICBsZXQgeSA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sJyk7XG4gICAgICAgICAgICBjb25zdCBjZWxscyA9IGdldEFmZmVjdGVkU3F1YXJlcyhOdW1iZXIoeCksIE51bWJlcih5KSk7XG4gICAgICAgICAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwgIT09IG51bGwpIHsgY2VsbC5jbGFzc0xpc3QuYWRkKCdnaG9zdCcpOyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdW5saWdodFNxdWFyZSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IHggPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpO1xuICAgICAgICAgICAgbGV0IHkgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbCcpO1xuICAgICAgICAgICAgY29uc3QgY2VsbHMgPSBnZXRBZmZlY3RlZFNxdWFyZXMoTnVtYmVyKHgpLCBOdW1iZXIoeSkpO1xuICAgICAgICAgICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjZWxsICE9PSBudWxsKSB7IGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZ2hvc3QnKTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcmVwb3J0Q2VsbENvb3JkaW5hdGUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGxldCBzcGFjZSA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIGxldCBjb29yZHMgPSBbXTtcbiAgICAgICAgICAgIGNvb3Jkcy5wdXNoKHNwYWNlLmdldEF0dHJpYnV0ZSgnZGF0YS1yb3cnKSk7XG4gICAgICAgICAgICBjb29yZHMucHVzaChzcGFjZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sJykpO1xuICAgICAgICAgICAgbGV0IHJlcyA9IHBsYXllcnNbMF0uZ2FtZUJvYXJkLnBsYWNlU2hpcChsZW5ndGgsIGNvb3Jkcywgb3JpZW50YXRpb24pO1xuICAgICAgICAgICAgaWYgKCFyZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQXJyYXkuZnJvbShib2FyZENlbGxzKS5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICAgICAgY2VsbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHJlcG9ydENlbGxDb29yZGluYXRlKTtcbiAgICAgICAgICAgICAgICBjZWxsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBsaWdodFNxdWFyZSk7XG4gICAgICAgICAgICAgICAgY2VsbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdW5saWdodFNxdWFyZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcm90YXRlU2hpcCk7XG4gICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9O1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcm90YXRlU2hpcCk7XG5cbiAgICAgICAgQXJyYXkuZnJvbShib2FyZENlbGxzKS5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVwb3J0Q2VsbENvb3JkaW5hdGUpO1xuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgbGlnaHRTcXVhcmUpO1xuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdW5saWdodFNxdWFyZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwbGFjZVNoaXBzKHBsYXllcnMpIHtcbiAgICBsZXQgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Rocy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1hd2FpdC1pbi1sb29wICovXG4gICAgICAgIGRpc3BsYXlJbnN0cnVjdGlvbnMoYFBsYWNlIHlvdXIgJHtzaGlwTmFtZXNbaV19IWApO1xuICAgICAgICBhd2FpdCBhbGxvd1NoaXBQbGFjZW1lbnQoc2hpcExlbmd0aHNbaV0sIHBsYXllcnMpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZXJyb3InKS50ZXh0Q29udGVudCA9IGBgO1xuICAgIH1cbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWF3YWl0LWluLWxvb3AgKi9cbiAgICBkaXNwbGF5SW5zdHJ1Y3Rpb25zKCdQcmVzcyB0aGUgYnV0dG9uIHRvIHN0YXJ0IScpO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcbiAgICBtb3VzZXBvc2l0aW9uID0gW2UuY2xpZW50WCwgZS5jbGllbnRZXTtcbn0pO1xuXG5leHBvcnQgeyBwbGFjZVNoaXBzIH07XG4iLCJmdW5jdGlvbiBwbGF5ZXJJbnB1dChhY3RpdmVQbGF5ZXIsIGluYWN0aXZlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGxldCBkaXNhYmxlQm9hcmRDb250cm9sID0gKCkgPT4ge307XG5cbiAgICAgICAgY29uc3QgcmVnaXN0ZXJBdHRhY2sgPSAoZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGNlbGwgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIGxldCB4ID0gTnVtYmVyKGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpKTtcbiAgICAgICAgICAgIGxldCB5ID0gTnVtYmVyKGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbCcpKTtcbiAgICAgICAgICAgIGxldCByZXMgPSBpbmFjdGl2ZS5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhbeCwgeV0pO1xuICAgICAgICAgICAgaWYgKCFyZXNbMF0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaXNhYmxlQm9hcmRDb250cm9sKGluYWN0aXZlKTtcbiAgICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgZGlzYWJsZUJvYXJkQ29udHJvbCA9IChwKSA9PiB7XG4gICAgICAgICAgICBwLmdhbWVCb2FyZC5zcGFjZUVsZW1lbnRzLmZvckVhY2goKHJvdykgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvd1tpXS5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHJlZ2lzdGVyQXR0YWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBlbmFibGVCb2FyZENvbnRyb2wgPSAocCkgPT4ge1xuICAgICAgICAgICAgcC5nYW1lQm9hcmQuc3BhY2VFbGVtZW50cy5mb3JFYWNoKChyb3cpID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICByb3dbaV0uYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCByZWdpc3RlckF0dGFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcG9wdWxhdGVTdGFjayA9ICh4LCB5LCBoaXRUeXBlLCBwKSA9PiB7XG4gICAgICAgICAgICBpZiAoaGl0VHlwZSA9PT0gJ3NoaXAnICYmIHAubW92ZVN0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIHVwLCBkb3duLCBsZWZ0LCByaWdodFxuICAgICAgICAgICAgICAgIHAubW92ZVN0YWNrLnB1c2goJ2VuZCcpO1xuICAgICAgICAgICAgICAgIHAubW92ZVN0YWNrLnB1c2goW3ggLSAxLCB5XSk7XG4gICAgICAgICAgICAgICAgcC5tb3ZlU3RhY2sucHVzaChbeCArIDEsIHldKTtcbiAgICAgICAgICAgICAgICBwLm1vdmVTdGFjay5wdXNoKFt4LCB5IC0gMV0pO1xuICAgICAgICAgICAgICAgIHAubW92ZVN0YWNrLnB1c2goW3gsIHkgKyAxXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhpdFR5cGUgPT09ICdzaGlwJyAmJiBwLm1vdmVTdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByZXYgPSBwLmxhc3RNb3ZlO1xuICAgICAgICAgICAgICAgIGlmIChwcmV2WzBdID4geCkge1xuICAgICAgICAgICAgICAgICAgICBwLm1vdmVTdGFjay5wdXNoKFt4IC0gMSwgeV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJldlswXSA8IHgpIHtcbiAgICAgICAgICAgICAgICAgICAgcC5tb3ZlU3RhY2sucHVzaChbeCArIDEsIHldKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByZXZbMV0gPiB5KSB7XG4gICAgICAgICAgICAgICAgICAgIHAubW92ZVN0YWNrLnB1c2goW3gsIHkgLSAxXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcmV2WzFdIDwgeSkge1xuICAgICAgICAgICAgICAgICAgICBwLm1vdmVTdGFjay5wdXNoKFt4LCB5ICsgMV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjbGVhclF1ZXVlSWZTaGlwU3VuayA9ICh4LCB5KSA9PiB7XG4gICAgICAgICAgICBsZXQgc3BhY2UgPSBpbmFjdGl2ZS5nYW1lQm9hcmQuc3BhY2VzW3hdW3ldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAoc3BhY2UpID09PSAnb2JqZWN0JyAmJiBzcGFjZS5zdW5rKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGFjdGl2ZVBsYXllci5tb3ZlU3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVQbGF5ZXIubW92ZVN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBnZXRDUFVDb29yZGluYXRlcyA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCB4O1xuICAgICAgICAgICAgbGV0IHk7XG4gICAgICAgICAgICBpZiAoYWN0aXZlUGxheWVyLm1vdmVTdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRNb3ZlID0gYWN0aXZlUGxheWVyLm1vdmVTdGFjay5wb3AoKTtcbiAgICAgICAgICAgICAgICBbeCwgeV0gPSBuZXh0TW92ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFt4LCB5XTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYWN0aXZlUGxheWVyLnR5cGUgPT09ICdjcHUnKSB7XG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIGxldCBbeCwgeV0gPSBnZXRDUFVDb29yZGluYXRlcygpO1xuICAgICAgICAgICAgICAgIGxldCByZXMgPSBpbmFjdGl2ZS5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhbeCwgeV0pO1xuICAgICAgICAgICAgICAgIGlmIChyZXNbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcG9wdWxhdGVTdGFjayh4LCB5LCByZXNbMV0sIGFjdGl2ZVBsYXllcik7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVBsYXllci5sYXN0TW92ZSA9IFt4LCB5XTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJRdWV1ZUlmU2hpcFN1bmsoeCwgeSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRpc2FibGVCb2FyZENvbnRyb2woaW5hY3RpdmUpO1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbmFibGVCb2FyZENvbnRyb2woaW5hY3RpdmUpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgeyBwbGF5ZXJJbnB1dCB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYGh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXG5iLCB1LCBpLCBjZW50ZXIsXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XG5cdG1hcmdpbjogMDtcblx0cGFkZGluZzogMDtcblx0Ym9yZGVyOiAwO1xuXHRmb250LXNpemU6IDEwMCU7XG5cdGZvbnQ6IGluaGVyaXQ7XG5cdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcbn1cbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcblx0ZGlzcGxheTogYmxvY2s7XG59XG5ib2R5IHtcblx0bGluZS1oZWlnaHQ6IDE7XG59XG5vbCwgdWwge1xuXHRsaXN0LXN0eWxlOiBub25lO1xufVxuYmxvY2txdW90ZSwgcSB7XG5cdHF1b3Rlczogbm9uZTtcbn1cbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xuXHRjb250ZW50OiAnJztcblx0Y29udGVudDogbm9uZTtcbn1cbnRhYmxlIHtcblx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcblx0Ym9yZGVyLXNwYWNpbmc6IDA7XG59XG5cbmJvZHkge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBoZWlnaHQ6MTAwdmg7XG5cdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5pbml0aWFsRGl2IHtcblx0aGVpZ2h0OiA1MHZoO1xuXHR3aWR0aDogNjB2dztcblx0ZGlzcGxheTogZmxleDtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cdGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xufVxuXG4uYm9hcmRBcmVhIHtcbiAgICB3aWR0aDogY2xhbXAoMTUwcHgsIDQwJSwgNzAlKTtcbiAgICBhc3BlY3QtcmF0aW86IDEgLyAxO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XG4gICAgYm9yZGVyOiAycHggc29saWQgYmxhY2s7XG59XG5cbi5ib2FyZEFyZWE6aG92ZXIge1xuXHRjdXJzb3I6IGNyb3NzaGFpcjtcbn1cblxuLmJvYXJkU3BhY2Uge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuXHR0cmFuc2l0aW9uOiBhbGwgLjVzO1xufVxuXG4uY2FycmllciB7XG5cdGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcbn1cblxuLmdob3N0IHtcblx0YmFja2dyb3VuZC1jb2xvcjogZ3JleTtcbn1cblxuLmdhbWVBcmVhIHtcblx0d2lkdGg6IDkwdnc7XG5cdGhlaWdodDogODB2aDtcblx0ZGlzcGxheTpmbGV4O1xuXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0Ym9yZGVyOjJweCBzb2xpZCBibGFjaztcbn1cblxuLnBsYXllckFyZWEge1xuXHRkaXNwbGF5OiBmbGV4O1xuXHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0aGVpZ2h0OjEwMCU7XG5cdHdpZHRoOjEwMCU7XG5cdGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuXHR0cmFuc2l0aW9uOiBhbGwgMS41cztcbn1cblxuLnBsYXllckFyZWEuZW5sYXJnZXtcblx0d2lkdGg6ODAlO1xufVxuXG4ucGxheWVyQXJlYS5zbWFsbGVyIHtcblx0d2lkdGg6MjAlO1xufVxuXG4jZXJyb3Ige1xuXHRjb2xvcjpyZWQ7XG5cdGZvbnQtc2l6ZTogMS4ycmVtO1xuXHRoZWlnaHQ6IDEuMnJlbTtcbn1cblxuI2luc3RydWN0aW9ucyB7XG5cdGZvbnQtc2l6ZTogMnJlbTtcblx0Zm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5oaWRlIHtcblx0YmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Ozs7Ozs7Ozs7O0NBYUMsU0FBUztDQUNULFVBQVU7Q0FDVixTQUFTO0NBQ1QsZUFBZTtDQUNmLGFBQWE7Q0FDYix3QkFBd0I7QUFDekI7QUFDQSxnREFBZ0Q7QUFDaEQ7O0NBRUMsY0FBYztBQUNmO0FBQ0E7Q0FDQyxjQUFjO0FBQ2Y7QUFDQTtDQUNDLGdCQUFnQjtBQUNqQjtBQUNBO0NBQ0MsWUFBWTtBQUNiO0FBQ0E7O0NBRUMsV0FBVztDQUNYLGFBQWE7QUFDZDtBQUNBO0NBQ0MseUJBQXlCO0NBQ3pCLGlCQUFpQjtBQUNsQjs7QUFFQTtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLFlBQVk7Q0FDZixzQkFBc0I7QUFDdkI7O0FBRUE7Q0FDQyxZQUFZO0NBQ1osV0FBVztDQUNYLGFBQWE7Q0FDYixtQkFBbUI7Q0FDbkIsdUJBQXVCO0NBQ3ZCLHVCQUF1QjtBQUN4Qjs7QUFFQTtJQUNJLDZCQUE2QjtJQUM3QixtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLHNDQUFzQztJQUN0QyxtQ0FBbUM7SUFDbkMsdUJBQXVCO0FBQzNCOztBQUVBO0NBQ0MsaUJBQWlCO0FBQ2xCOztBQUVBO0lBQ0ksdUJBQXVCO0NBQzFCLG1CQUFtQjtBQUNwQjs7QUFFQTtDQUNDLDJCQUEyQjtBQUM1Qjs7QUFFQTtDQUNDLHNCQUFzQjtBQUN2Qjs7QUFFQTtDQUNDLFdBQVc7Q0FDWCxZQUFZO0NBQ1osWUFBWTtDQUNaLHVCQUF1QjtDQUN2QixtQkFBbUI7Q0FDbkIsc0JBQXNCO0FBQ3ZCOztBQUVBO0NBQ0MsYUFBYTtDQUNiLG1CQUFtQjtDQUNuQix1QkFBdUI7Q0FDdkIsV0FBVztDQUNYLFVBQVU7Q0FDVix1QkFBdUI7Q0FDdkIsb0JBQW9CO0FBQ3JCOztBQUVBO0NBQ0MsU0FBUztBQUNWOztBQUVBO0NBQ0MsU0FBUztBQUNWOztBQUVBO0NBQ0MsU0FBUztDQUNULGlCQUFpQjtDQUNqQixjQUFjO0FBQ2Y7O0FBRUE7Q0FDQyxlQUFlO0NBQ2YsaUJBQWlCO0FBQ2xCOztBQUVBO0NBQ0MsNkJBQTZCO0FBQzlCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcblxcdHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGhlaWdodDoxMDB2aDtcXG5cXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4uaW5pdGlhbERpdiB7XFxuXFx0aGVpZ2h0OiA1MHZoO1xcblxcdHdpZHRoOiA2MHZ3O1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG59XFxuXFxuLmJvYXJkQXJlYSB7XFxuICAgIHdpZHRoOiBjbGFtcCgxNTBweCwgNDAlLCA3MCUpO1xcbiAgICBhc3BlY3QtcmF0aW86IDEgLyAxO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4uYm9hcmRBcmVhOmhvdmVyIHtcXG5cXHRjdXJzb3I6IGNyb3NzaGFpcjtcXG59XFxuXFxuLmJvYXJkU3BhY2Uge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG5cXHR0cmFuc2l0aW9uOiBhbGwgLjVzO1xcbn1cXG5cXG4uY2FycmllciB7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xcbn1cXG5cXG4uZ2hvc3Qge1xcblxcdGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxufVxcblxcbi5nYW1lQXJlYSB7XFxuXFx0d2lkdGg6IDkwdnc7XFxuXFx0aGVpZ2h0OiA4MHZoO1xcblxcdGRpc3BsYXk6ZmxleDtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcdGJvcmRlcjoycHggc29saWQgYmxhY2s7XFxufVxcblxcbi5wbGF5ZXJBcmVhIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuXFx0aGVpZ2h0OjEwMCU7XFxuXFx0d2lkdGg6MTAwJTtcXG5cXHRib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG5cXHR0cmFuc2l0aW9uOiBhbGwgMS41cztcXG59XFxuXFxuLnBsYXllckFyZWEuZW5sYXJnZXtcXG5cXHR3aWR0aDo4MCU7XFxufVxcblxcbi5wbGF5ZXJBcmVhLnNtYWxsZXIge1xcblxcdHdpZHRoOjIwJTtcXG59XFxuXFxuI2Vycm9yIHtcXG5cXHRjb2xvcjpyZWQ7XFxuXFx0Zm9udC1zaXplOiAxLjJyZW07XFxuXFx0aGVpZ2h0OiAxLjJyZW07XFxufVxcblxcbiNpbnN0cnVjdGlvbnMge1xcblxcdGZvbnQtc2l6ZTogMnJlbTtcXG5cXHRmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuLmhpZGUge1xcblxcdGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IHsgY3JlYXRlUGxheWVyIH0gZnJvbSAnLi9jb21wb25lbnRzL2dhbWVfb2JqZWN0cyc7XG5pbXBvcnQgeyBwbGFjZVNoaXBzIH0gZnJvbSAnLi9jb21wb25lbnRzL3BsYWNlU2hpcHMnO1xuaW1wb3J0IHsgcGxheWVySW5wdXQgfSBmcm9tICcuL2NvbXBvbmVudHMvcGxheWVySW5wdXQnO1xuaW1wb3J0IHsgZGlzcGxheUluc3RydWN0aW9ucyB9IGZyb20gJy4vY29tcG9uZW50cy9kaXNwbGF5SW5zdHJ1Y3Rpb25zJztcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuXG5sZXQgcGxheWVycyA9IFtdO1xuXG5mdW5jdGlvbiByZXN0YXJ0R2FtZSgpIHtcbiAgICB3aGlsZSAocGxheWVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHBsYXllcnMucG9wKCk7XG4gICAgfVxuICAgIGxldCByZXN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3RhcnQnKTtcbiAgICByZXN0YXJ0QnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgcmVzdGFydEdhbWUpO1xuICAgIHJlc3RhcnRCdG4ucmVtb3ZlKCk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluaXRpYWxEaXYnKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGFjZVNoaXBzJykuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBpbml0aWFsaXplR2FtZSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Vycm9yJykudGV4dENvbnRlbnQgPSAnJztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5zdHJ1Y3Rpb25zJykudGV4dENvbnRlbnQgPSAnJztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZUFyZWEnKS5yZW1vdmUoKTtcbn1cblxuZnVuY3Rpb24gdGltZWQoaW50ZXJ2YWwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChyZXNvbHZlLCBpbnRlcnZhbCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHN3aXRjaFNpemUobW9kZSwgYWN0LCBpbmFjdCkge1xuICAgIGlmIChtb2RlID09PSAxKSB7XG4gICAgICAgIGluYWN0LmdhbWVCb2FyZC5wbGF5QXJlYS5jbGFzc0xpc3QuYWRkKCdlbmxhcmdlJyk7XG4gICAgICAgIGFjdC5nYW1lQm9hcmQucGxheUFyZWEuY2xhc3NMaXN0LmFkZCgnc21hbGxlcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGluYWN0LmdhbWVCb2FyZC5wbGF5QXJlYS5jbGFzc0xpc3QucmVtb3ZlKCdlbmxhcmdlJyk7XG4gICAgICAgIGFjdC5nYW1lQm9hcmQucGxheUFyZWEuY2xhc3NMaXN0LnJlbW92ZSgnc21hbGxlcicpO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gbWFpbkxvb3AoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0Z2FtZScpLnJlbW92ZSgpO1xuICAgIGxldCB0dXJuID0gMDtcbiAgICBsZXQgYWN0aXZlUGxheWVyID0gcGxheWVyc1swXTtcbiAgICBsZXQgaW5hY3RpdmVQbGF5ZXIgPSBwbGF5ZXJzWzFdO1xuICAgIHN3aXRjaFNpemUoMSwgYWN0aXZlUGxheWVyLCBpbmFjdGl2ZVBsYXllcik7XG4gICAgLy8gd2hpbGUgKCFhY3RpdmVQbGF5ZXIuZ2FtZUJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgLy8gICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWF3YWl0LWluLWxvb3AgKi9cbiAgICAvLyAgICAgZGlzcGxheUluc3RydWN0aW9ucyhgUGxheWVyICR7TWF0aC5hYnModHVybiAlIDIpICsgMX0gaXMgYWltaW5nLi4uYCk7XG4gICAgLy8gICAgIGF3YWl0IHRpbWVkKGFjdGl2ZVBsYXllci50eXBlID09PSAnY3B1JyA/IDIwMDAgOiA1MDApO1xuICAgIC8vICAgICBhd2FpdCBwbGF5ZXJJbnB1dChhY3RpdmVQbGF5ZXIsIGluYWN0aXZlUGxheWVyKTtcbiAgICAvLyAgICAgdHVybisrO1xuICAgIC8vICAgICBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXJzW3R1cm4gJSAyXTtcbiAgICAvLyAgICAgaW5hY3RpdmVQbGF5ZXIgPSBwbGF5ZXJzW01hdGguYWJzKCh0dXJuIC0gMSkgJSAyKV07XG4gICAgLy8gfVxuICAgIGRpc3BsYXlJbnN0cnVjdGlvbnMoYFBsYXllciAke01hdGguYWJzKCh0dXJuIC0gMSkgJSAyKSArIDF9IFdpbnMhYCk7XG4gICAgbGV0IHJlc3RhcnRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICByZXN0YXJ0QnRuLmlkID0gJ3Jlc3RhcnQnO1xuICAgIHJlc3RhcnRCdG4uY2xhc3NMaXN0LmFkZCgnZ2VuZXJpY0J0bicpO1xuICAgIHJlc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCByZXN0YXJ0R2FtZSk7XG4gICAgcmVzdGFydEJ0bi50ZXh0Q29udGVudCA9IFwiUGxheSBBZ2FpbiFcIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQocmVzdGFydEJ0bik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluaXRpYWxpemVHYW1lKCkge1xuICAgIGxldCByZW1idXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxhY2VTaGlwcycpO1xuICAgIHJlbWJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIGluaXRpYWxpemVHYW1lKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5pdGlhbERpdicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgbGV0IGdhbWVBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZ2FtZUFyZWEuY2xhc3NMaXN0LmFkZCgnZ2FtZUFyZWEnKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQoZ2FtZUFyZWEpO1xuICAgIHBsYXllcnMucHVzaChjcmVhdGVQbGF5ZXIoJ2h1bScpKTtcbiAgICBwbGF5ZXJzWzBdLmdhbWVCb2FyZC5kaXNwbGF5Qm9hcmQoKTtcbiAgICBhd2FpdCBwbGFjZVNoaXBzKHBsYXllcnMpO1xuICAgIHBsYXllcnMucHVzaChjcmVhdGVQbGF5ZXIoJ2NwdScpKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZXJyb3InKS50ZXh0Q29udGVudCA9ICcnO1xuICAgIGxldCBzdGFydEdhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBzdGFydEdhbWUuaWQgPSAnc3RhcnRnYW1lJztcbiAgICBzdGFydEdhbWUuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBtYWluTG9vcCk7XG4gICAgc3RhcnRHYW1lLnRleHRDb250ZW50ID0gXCJDbGljayBoZXJlIHRvIHN0YXJ0IVwiO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChzdGFydEdhbWUpO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5R2FtZUJ1dHRvbigpIHtcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2luaXRpYWxEaXYnKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnV0dG9uLmlkID0gJ3BsYWNlU2hpcHMnO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIGluaXRpYWxpemVHYW1lKTtcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSBcIlN0YXJ0IFBsYWNpbmcgeW91ciBTaGlwcyFcIjtcbiAgICBkaXYuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBkaXNwbGF5R2FtZUJ1dHRvbik7XG4iXSwibmFtZXMiOlsiZGlzcGxheUluc3RydWN0aW9ucyIsIm1zZyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRleHRDb250ZW50Iiwic2hpcEZhY3RvcnkiLCJsZW4iLCJuYW1lIiwibGVuZ3RoIiwiaGl0cyIsInNoaXAiLCJvcmllbnRhdGlvbiIsImlzU3VuayIsInN1bmsiLCJpc0hpdCIsImNoYW5nZU9yaWVudGF0aW9uIiwiZ2V0T3JpZW50YXRpb24iLCJnYW1lQm9hcmRGYWN0b3J5Iiwic2hpcHMiLCJzcGFjZXMiLCJBcnJheSIsIm1hcCIsInNwYWNlRWxlbWVudHMiLCJwbGF5QXJlYSIsImdhbWVCb2FyZCIsIm5vU2hpcHNMZWZ0IiwiYWxsU3VuayIsImV2ZXJ5IiwiZGlzcGxheUJvYXJkIiwicGxheWVyQXJlYSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJib2FyZEFyZWEiLCJ4IiwieSIsIm5ld1NwYWNlIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJnZW5lcmF0ZVNwYWNlcyIsIm9jY3VwaWVkIiwiaSIsInB1c2giLCJpc1ZhbGlkUGxhY2VtZW50Iiwic2hpcE9jY3VwYW5jeSIsInVuZGVmaW5lZCIsInBsYWNlU2hpcCIsImNvb3JkIiwibmV3U2hpcCIsIk51bWJlciIsInRhcmdldFNwYWNlIiwicmVtb3ZlIiwiYWxsU2hpcHNTdW5rIiwiaXNBdHRhY2tPdXRPZkJvdW5kcyIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2tlZFNwYWNlIiwiaW5jbHVkZXMiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImNyZWF0ZVBsYXllciIsInR5cGUiLCJtb3ZlU3RhY2siLCJsYXN0TW92ZSIsImxlbmd0aHMiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJvIiwicmVzIiwiZm9yRWFjaCIsImVsZXJvdyIsImVsZSIsInBsYXllciIsInNoaXBOYW1lcyIsIm1vdXNlcG9zaXRpb24iLCJhbGxvd1NoaXBQbGFjZW1lbnQiLCJwbGF5ZXJzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJib2FyZENlbGxzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImdldEFmZmVjdGVkU3F1YXJlcyIsImNlbGxzIiwiY29vcmRzIiwieGkiLCJ5aSIsInRoaXNDZWxsIiwidXBkYXRlU2hpcERpc3BsYXkiLCJlbGVtZW50RnJvbVBvaW50IiwiY29udGFpbnMiLCJnZXRBdHRyaWJ1dGUiLCJjZWxsIiwicm90YXRlU2hpcCIsImV2ZW50Iiwia2V5Q29kZSIsImxpZ2h0U3F1YXJlIiwidGFyZ2V0IiwidW5saWdodFNxdWFyZSIsInJlcG9ydENlbGxDb29yZGluYXRlIiwic3BhY2UiLCJmcm9tIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJwbGFjZVNoaXBzIiwic2hpcExlbmd0aHMiLCJlIiwiY2xpZW50WCIsImNsaWVudFkiLCJwbGF5ZXJJbnB1dCIsImFjdGl2ZVBsYXllciIsImluYWN0aXZlIiwiZGlzYWJsZUJvYXJkQ29udHJvbCIsInJlZ2lzdGVyQXR0YWNrIiwicCIsInJvdyIsImVuYWJsZUJvYXJkQ29udHJvbCIsInBvcHVsYXRlU3RhY2siLCJoaXRUeXBlIiwicHJldiIsImNsZWFyUXVldWVJZlNoaXBTdW5rIiwicG9wIiwiZ2V0Q1BVQ29vcmRpbmF0ZXMiLCJuZXh0TW92ZSIsInJlc3RhcnRHYW1lIiwicmVzdGFydEJ0biIsImRpc3BsYXkiLCJpbml0aWFsaXplR2FtZSIsInRpbWVkIiwiaW50ZXJ2YWwiLCJzZXRUaW1lb3V0Iiwic3dpdGNoU2l6ZSIsIm1vZGUiLCJhY3QiLCJpbmFjdCIsIm1haW5Mb29wIiwidHVybiIsImluYWN0aXZlUGxheWVyIiwiYWJzIiwiaWQiLCJyZW1idXR0b24iLCJnYW1lQXJlYSIsInN0YXJ0R2FtZSIsImRpc3BsYXlHYW1lQnV0dG9uIiwiZGl2IiwiYnV0dG9uIl0sInNvdXJjZVJvb3QiOiIifQ==