/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
  let gameBoard;
  function noShipsLeft() {
    const allSunk = ships.every(ship => ship.isSunk === true);
    return allSunk;
  }
  function displayBoard() {
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
    document.querySelector('body').appendChild(boardArea);
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
  function receiveAttack(coord) {
    const x = coord[0];
    const y = coord[1];
    const attackedSpace = gameBoard.spaces[x][y];
    if (attackedSpace === 'x') {
      return false;
    }
    if (gameBoard.ships.includes(attackedSpace)) {
      attackedSpace.isHit();
      gameBoard.spaces[x][y] = 'o';
      gameBoard.spaceElements[x][y].style.backgroundColor = 'blue';
      return true;
    }
    gameBoard.spaces[x][y] = 'x';
    gameBoard.spaceElements[x][y].style.backgroundColor = 'red';
    return true;
  }
  gameBoard = {
    ships,
    spaces,
    placeShip,
    receiveAttack,
    allShipsSunk,
    displayBoard,
    generateSpaces,
    spaceElements
  };
  return gameBoard;
}
function createPlayer(type) {
  const gameBoard = gameBoardFactory();
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
  }
  const player = {
    type,
    gameBoard
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
  let instructions = document.querySelector('#instructions');
  for (let i = 0; i < shipLengths.length; i++) {
    /* eslint-disable no-await-in-loop */
    instructions.textContent = `Place your ${_lengthsToNames__WEBPACK_IMPORTED_MODULE_0__.shipNames[i]}!`;
    await allowShipPlacement(shipLengths[i], players);
    document.querySelector('#error').textContent = ``;
  }
  /* eslint-enable no-await-in-loop */
  instructions.textContent = 'Press the button to start!';
}
window.addEventListener('mousemove', e => {
  mouseposition = [e.clientX, e.clientY];
});


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

.boardArea {
    height: 400px;
    aspect-ratio: 1 / 1;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    border: 2px solid black;
}

.boardSpace {
    border: 1px solid black;
}

.carrier {
	background-color: lightblue;
}

.ghost {
	background-color: grey;
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;CAaC,SAAS;CACT,UAAU;CACV,SAAS;CACT,eAAe;CACf,aAAa;CACb,wBAAwB;AACzB;AACA,gDAAgD;AAChD;;CAEC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,gBAAgB;AACjB;AACA;CACC,YAAY;AACb;AACA;;CAEC,WAAW;CACX,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,iBAAiB;AAClB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,YAAY;CACf,sBAAsB;AACvB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,aAAa;IACb,sCAAsC;IACtC,mCAAmC;IACnC,uBAAuB;AAC3B;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;CACC,2BAA2B;AAC5B;;AAEA;CACC,sBAAsB;AACvB","sourcesContent":["html, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\nbody {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height:100vh;\n\tflex-direction: column;\n}\n\n.boardArea {\n    height: 400px;\n    aspect-ratio: 1 / 1;\n    display: grid;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(10, 1fr);\n    border: 2px solid black;\n}\n\n.boardSpace {\n    border: 1px solid black;\n}\n\n.carrier {\n\tbackground-color: lightblue;\n}\n\n.ghost {\n\tbackground-color: grey;\n}"],"sourceRoot":""}]);
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
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.css */ "./src/style.css");



let players = [];
//  let activePlayer = null;

function playerInput(inactive) {
  return new Promise(resolve => {
    let disableBoardControl = () => {};
    const registerAttack = e => {
      let cell = e.target;
      let x = Number(cell.getAttribute('data-row'));
      let y = Number(cell.getAttribute('data-col'));
      let res = inactive.gameBoard.receiveAttack([x, y]);
      if (!res) {
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
    console.log(inactive);
    enableBoardControl(inactive);
  });
}
async function mainLoop() {
  document.querySelector('#startgame').remove();
  let turn = 0;
  let activePlayer = players[0];
  let inactivePlayer = players[1];
  while (!activePlayer.gameBoard.allShipsSunk()) {
    /* eslint-disable no-await-in-loop */
    await playerInput(inactivePlayer);
    turn++;
    activePlayer = players[turn % 2];
    inactivePlayer = players[Math.abs((turn - 1) % 2)];
  }
  document.querySelector('#instructions').textContent = `Player ${Math.abs((turn - 1) % 2) + 1} Wins!`;
}
async function initializeGame() {
  players.push((0,_components_game_objects__WEBPACK_IMPORTED_MODULE_0__.createPlayer)('hum'));
  players[0].gameBoard.displayBoard();
  await (0,_components_placeShips__WEBPACK_IMPORTED_MODULE_1__.placeShips)(players);
  players.push((0,_components_game_objects__WEBPACK_IMPORTED_MODULE_0__.createPlayer)('cpu'));
  let startGame = document.createElement('button');
  startGame.id = 'startgame';
  startGame.addEventListener('pointerdown', mainLoop);
  startGame.textContent = "Click here to start!";
  document.querySelector('body').appendChild(startGame);
}
window.addEventListener('load', initializeGame);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLENBQUNILElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBRSxRQUFPO0FBQ3hHO0FBRUEsZUFBZUksY0FBY0EsQ0FBQSxFQUFHO0VBQzVCakQsT0FBTyxDQUFDN0IsSUFBSSxDQUFDaUIsc0VBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUNqQ1ksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDaEQsU0FBUyxDQUFDSSxZQUFZLENBQUMsQ0FBQztFQUNuQyxNQUFNeUUsa0VBQVUsQ0FBQzdCLE9BQU8sQ0FBQztFQUN6QkEsT0FBTyxDQUFDN0IsSUFBSSxDQUFDaUIsc0VBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUNqQyxJQUFJOEQsU0FBUyxHQUFHNUYsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0VBQ2hEMkYsU0FBUyxDQUFDQyxFQUFFLEdBQUcsV0FBVztFQUMxQkQsU0FBUyxDQUFDdEIsZ0JBQWdCLENBQUMsYUFBYSxFQUFFZ0IsUUFBUSxDQUFDO0VBQ25ETSxTQUFTLENBQUM1RSxXQUFXLEdBQUcsc0JBQXNCO0VBQzlDaEIsUUFBUSxDQUFDUyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUNELFdBQVcsQ0FBQ29GLFNBQVMsQ0FBQztBQUN6RDtBQUVBdkIsTUFBTSxDQUFDQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUVxQixjQUFjLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9nYW1lX29iamVjdHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL2xlbmd0aHNUb05hbWVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9wbGFjZVNoaXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBzaGlwRmFjdG9yeShsZW4pIHtcbiAgICBjb25zdCBsZW5ndGggPSBsZW47XG4gICAgY29uc3QgaGl0cyA9IDA7XG4gICAgbGV0IHNoaXA7XG4gICAgbGV0IG9yaWVudGF0aW9uID0gMDtcblxuICAgIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICAgICAgaWYgKHNoaXAuaGl0cyA9PT0gc2hpcC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNoaXAuc3VuayA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0hpdCgpIHtcbiAgICAgICAgc2hpcC5oaXRzKys7XG4gICAgICAgIGlzU3VuaygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoYW5nZU9yaWVudGF0aW9uKCkge1xuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09IDApIHtcbiAgICAgICAgICAgIG9yaWVudGF0aW9uID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9yaWVudGF0aW9uID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNoaXAgPSB7XG4gICAgICAgIGxlbmd0aCxcbiAgICAgICAgaGl0cyxcbiAgICAgICAgc3VuazogZmFsc2UsXG4gICAgICAgIGlzSGl0LFxuICAgICAgICBpc1N1bmssXG4gICAgICAgIGNoYW5nZU9yaWVudGF0aW9uLFxuICAgICAgICBnZXRPcmllbnRhdGlvbjogKCkgPT4gb3JpZW50YXRpb24sXG4gICAgfTtcblxuICAgIHJldHVybiBzaGlwO1xufVxuXG5mdW5jdGlvbiBnYW1lQm9hcmRGYWN0b3J5KCkge1xuICAgIGNvbnN0IHNoaXBzID0gW107XG4gICAgY29uc3Qgc3BhY2VzID0gWy4uLkFycmF5KDEwKV0ubWFwKCgpID0+IEFycmF5KDEwKSk7XG4gICAgY29uc3Qgc3BhY2VFbGVtZW50cyA9IFsuLi5BcnJheSgxMCldLm1hcCgoKSA9PiBBcnJheSgxMCkpO1xuICAgIGxldCBnYW1lQm9hcmQ7XG5cbiAgICBmdW5jdGlvbiBub1NoaXBzTGVmdCgpIHtcbiAgICAgICAgY29uc3QgYWxsU3VuayA9IHNoaXBzLmV2ZXJ5KFxuICAgICAgICAgICAgKHNoaXApID0+IChzaGlwLmlzU3VuayA9PT0gdHJ1ZSksXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBhbGxTdW5rO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc3BsYXlCb2FyZCgpIHtcbiAgICAgICAgbGV0IGJvYXJkQXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBib2FyZEFyZWEuY2xhc3NMaXN0LmFkZCgnYm9hcmRBcmVhJyk7XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgMTA7IHgrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1NwYWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgbmV3U3BhY2UuY2xhc3NMaXN0LmFkZCgnYm9hcmRTcGFjZScpO1xuICAgICAgICAgICAgICAgIG5ld1NwYWNlLnNldEF0dHJpYnV0ZSgnZGF0YS1yb3cnLCB4KTtcbiAgICAgICAgICAgICAgICBuZXdTcGFjZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29sJywgeSk7XG4gICAgICAgICAgICAgICAgYm9hcmRBcmVhLmFwcGVuZENoaWxkKG5ld1NwYWNlKTtcbiAgICAgICAgICAgICAgICBzcGFjZUVsZW1lbnRzW3hdW3ldID0gbmV3U3BhY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKGJvYXJkQXJlYSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVTcGFjZXMob3JpZW50YXRpb24sIGxlbiwgeCwgeSkge1xuICAgICAgICBsZXQgb2NjdXBpZWQgPSBbXTtcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAwKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgb2NjdXBpZWQucHVzaChbeCwgeSArIGldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvY2N1cGllZC5wdXNoKFt4ICsgaSwgeV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvY2N1cGllZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1ZhbGlkUGxhY2VtZW50KHNoaXBPY2N1cGFuY3kpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwT2NjdXBhbmN5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgeCA9IHNoaXBPY2N1cGFuY3lbaV1bMF07XG4gICAgICAgICAgICBsZXQgeSA9IHNoaXBPY2N1cGFuY3lbaV1bMV07XG4gICAgICAgICAgICBpZiAoISgoeCA8IDEwICYmIHggPj0gMCkgJiYgKHkgPCAxMCAmJiB5ID49IDApKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlcnJvcicpLnRleHRDb250ZW50ID0gYENhbid0IHBsYWNlIGhlcmUhYDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZ2FtZUJvYXJkLnNwYWNlc1t4XVt5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Vycm9yJykudGV4dENvbnRlbnQgPSBgQ2FuJ3QgcGxhY2UgaGVyZSFgO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZVNoaXAobGVuLCBjb29yZCwgb3JpZW50YXRpb24pIHtcbiAgICAgICAgY29uc3QgbmV3U2hpcCA9IHNoaXBGYWN0b3J5KGxlbik7XG4gICAgICAgIGNvbnN0IHNoaXBPY2N1cGFuY3kgPSBnZW5lcmF0ZVNwYWNlcyhvcmllbnRhdGlvbiwgbGVuLCBOdW1iZXIoY29vcmRbMF0pLCBOdW1iZXIoY29vcmRbMV0pKTtcbiAgICAgICAgaWYgKCFpc1ZhbGlkUGxhY2VtZW50KHNoaXBPY2N1cGFuY3kpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbGV0IHggPSBzaGlwT2NjdXBhbmN5W2ldWzBdO1xuICAgICAgICAgICAgbGV0IHkgPSBzaGlwT2NjdXBhbmN5W2ldWzFdO1xuICAgICAgICAgICAgZ2FtZUJvYXJkLnNwYWNlc1t4XVt5XSA9IG5ld1NoaXA7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0U3BhY2UgPSBzcGFjZUVsZW1lbnRzW3hdW3ldO1xuICAgICAgICAgICAgdGFyZ2V0U3BhY2UuY2xhc3NMaXN0LnJlbW92ZSgnZ2hvc3QnKTtcbiAgICAgICAgICAgIHRhcmdldFNwYWNlLmNsYXNzTGlzdC5hZGQoJ2NhcnJpZXInKTtcbiAgICAgICAgfVxuICAgICAgICBnYW1lQm9hcmQuc2hpcHMucHVzaChuZXdTaGlwKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWxsU2hpcHNTdW5rKCkge1xuICAgICAgICByZXR1cm4gZ2FtZUJvYXJkLnNoaXBzLmV2ZXJ5KFxuICAgICAgICAgICAgKHNoaXApID0+IHNoaXAuc3VuayA9PT0gdHJ1ZSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKGNvb3JkKSB7XG4gICAgICAgIGNvbnN0IHggPSBjb29yZFswXTtcbiAgICAgICAgY29uc3QgeSA9IGNvb3JkWzFdO1xuICAgICAgICBjb25zdCBhdHRhY2tlZFNwYWNlID0gZ2FtZUJvYXJkLnNwYWNlc1t4XVt5XTtcblxuICAgICAgICBpZiAoYXR0YWNrZWRTcGFjZSA9PT0gJ3gnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdhbWVCb2FyZC5zaGlwcy5pbmNsdWRlcyhhdHRhY2tlZFNwYWNlKSkge1xuICAgICAgICAgICAgYXR0YWNrZWRTcGFjZS5pc0hpdCgpO1xuICAgICAgICAgICAgZ2FtZUJvYXJkLnNwYWNlc1t4XVt5XSA9ICdvJztcbiAgICAgICAgICAgIGdhbWVCb2FyZC5zcGFjZUVsZW1lbnRzW3hdW3ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdibHVlJztcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGdhbWVCb2FyZC5zcGFjZXNbeF1beV0gPSAneCc7XG4gICAgICAgIGdhbWVCb2FyZC5zcGFjZUVsZW1lbnRzW3hdW3ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBnYW1lQm9hcmQgPSB7XG4gICAgICAgIHNoaXBzLFxuICAgICAgICBzcGFjZXMsXG4gICAgICAgIHBsYWNlU2hpcCxcbiAgICAgICAgcmVjZWl2ZUF0dGFjayxcbiAgICAgICAgYWxsU2hpcHNTdW5rLFxuICAgICAgICBkaXNwbGF5Qm9hcmQsXG4gICAgICAgIGdlbmVyYXRlU3BhY2VzLFxuICAgICAgICBzcGFjZUVsZW1lbnRzLFxuICAgIH07XG5cbiAgICByZXR1cm4gZ2FtZUJvYXJkO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQbGF5ZXIodHlwZSkge1xuICAgIGNvbnN0IGdhbWVCb2FyZCA9IGdhbWVCb2FyZEZhY3RvcnkoKTtcblxuICAgIGlmICh0eXBlID09PSAnY3B1Jykge1xuICAgICAgICBnYW1lQm9hcmQuZGlzcGxheUJvYXJkKCk7XG4gICAgICAgIGNvbnN0IGxlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3Rocy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICBjb25zdCBvID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBnYW1lQm9hcmQucGxhY2VTaGlwKGxlbmd0aHNbaV0sIFt4LCB5XSwgbyk7XG4gICAgICAgICAgICBpZiAoIXJlcykge1xuICAgICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHBsYXllciA9IHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAgZ2FtZUJvYXJkLFxuICAgIH07XG4gICAgcmV0dXJuIHBsYXllcjtcbn1cblxuZXhwb3J0IHsgY3JlYXRlUGxheWVyIH07XG4iLCJjb25zdCBzaGlwTmFtZXMgPSBbXG4gICAgJ2NhcnJpZXInLFxuICAgICdiYXR0bGVzaGlwJyxcbiAgICAnc3VibWFyaW5lJyxcbiAgICAnY3J1aXNlcicsXG4gICAgJ2Rlc3Ryb3llcicsXG5dO1xuXG5leHBvcnQgeyBzaGlwTmFtZXMgfTtcbiIsImltcG9ydCB7IHNoaXBOYW1lcyB9IGZyb20gJy4vbGVuZ3Roc1RvTmFtZXMnO1xuXG5sZXQgbW91c2Vwb3NpdGlvbjtcblxuZnVuY3Rpb24gYWxsb3dTaGlwUGxhY2VtZW50KGxlbmd0aCwgcGxheWVycykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBjb25zdCBib2FyZENlbGxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hcmRTcGFjZScpO1xuICAgICAgICBsZXQgb3JpZW50YXRpb24gPSAwO1xuICAgICAgICBjb25zdCBnZXRBZmZlY3RlZFNxdWFyZXMgPSAoeCwgeSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbHMgPSBbXTtcbiAgICAgICAgICAgIGxldCBjb29yZHMgPSBwbGF5ZXJzWzBdLmdhbWVCb2FyZC5nZW5lcmF0ZVNwYWNlcyhvcmllbnRhdGlvbiwgbGVuZ3RoLCB4LCB5KTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHhpID0gY29vcmRzW2ldWzBdO1xuICAgICAgICAgICAgICAgIGxldCB5aSA9IGNvb3Jkc1tpXVsxXTtcbiAgICAgICAgICAgICAgICBsZXQgdGhpc0NlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9XCIke3hpfVwiXVtkYXRhLWNvbD1cIiR7eWl9XCJdYCk7XG4gICAgICAgICAgICAgICAgY2VsbHMucHVzaCh0aGlzQ2VsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY2VsbHM7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdXBkYXRlU2hpcERpc3BsYXkgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdGhpc0NlbGwgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KG1vdXNlcG9zaXRpb25bMF0sIG1vdXNlcG9zaXRpb25bMV0pO1xuICAgICAgICAgICAgaWYgKCF0aGlzQ2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2JvYXJkU3BhY2UnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB4ID0gTnVtYmVyKHRoaXNDZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1yb3cnKSk7XG4gICAgICAgICAgICBsZXQgeSA9IE51bWJlcih0aGlzQ2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sJykpO1xuICAgICAgICAgICAgbGV0IGNlbGxzID0gZ2V0QWZmZWN0ZWRTcXVhcmVzKHgsIHkpO1xuICAgICAgICAgICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjZWxsICE9PSBudWxsICYmIGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdnaG9zdCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZ2hvc3QnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNlbGwgIT09IG51bGwgJiYgIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdnaG9zdCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZ2hvc3QnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCByb3RhdGVTaGlwID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSAhPT0gMzIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1cGRhdGVTaGlwRGlzcGxheSgpO1xuICAgICAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAxKSB7XG4gICAgICAgICAgICAgICAgb3JpZW50YXRpb24gPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHsgb3JpZW50YXRpb24gPSAxOyB9XG4gICAgICAgICAgICB1cGRhdGVTaGlwRGlzcGxheSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgbGlnaHRTcXVhcmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGxldCB4ID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yb3cnKTtcbiAgICAgICAgICAgIGxldCB5ID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb2wnKTtcbiAgICAgICAgICAgIGNvbnN0IGNlbGxzID0gZ2V0QWZmZWN0ZWRTcXVhcmVzKE51bWJlcih4KSwgTnVtYmVyKHkpKTtcbiAgICAgICAgICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbCAhPT0gbnVsbCkgeyBjZWxsLmNsYXNzTGlzdC5hZGQoJ2dob3N0Jyk7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCB1bmxpZ2h0U3F1YXJlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBsZXQgeCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93Jyk7XG4gICAgICAgICAgICBsZXQgeSA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sJyk7XG4gICAgICAgICAgICBjb25zdCBjZWxscyA9IGdldEFmZmVjdGVkU3F1YXJlcyhOdW1iZXIoeCksIE51bWJlcih5KSk7XG4gICAgICAgICAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwgIT09IG51bGwpIHsgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdnaG9zdCcpOyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCByZXBvcnRDZWxsQ29vcmRpbmF0ZSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNwYWNlID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgbGV0IGNvb3JkcyA9IFtdO1xuICAgICAgICAgICAgY29vcmRzLnB1c2goc3BhY2UuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpKTtcbiAgICAgICAgICAgIGNvb3Jkcy5wdXNoKHNwYWNlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2wnKSk7XG4gICAgICAgICAgICBsZXQgcmVzID0gcGxheWVyc1swXS5nYW1lQm9hcmQucGxhY2VTaGlwKGxlbmd0aCwgY29vcmRzLCBvcmllbnRhdGlvbik7XG4gICAgICAgICAgICBpZiAoIXJlcykge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBBcnJheS5mcm9tKGJvYXJkQ2VsbHMpLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgICAgICBjZWxsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVwb3J0Q2VsbENvb3JkaW5hdGUpO1xuICAgICAgICAgICAgICAgIGNlbGwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGxpZ2h0U3F1YXJlKTtcbiAgICAgICAgICAgICAgICBjZWxsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB1bmxpZ2h0U3F1YXJlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCByb3RhdGVTaGlwKTtcbiAgICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCByb3RhdGVTaGlwKTtcblxuICAgICAgICBBcnJheS5mcm9tKGJvYXJkQ2VsbHMpLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZXBvcnRDZWxsQ29vcmRpbmF0ZSk7XG4gICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBsaWdodFNxdWFyZSk7XG4gICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB1bmxpZ2h0U3F1YXJlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHBsYWNlU2hpcHMocGxheWVycykge1xuICAgIGxldCBzaGlwTGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXTtcbiAgICBsZXQgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luc3RydWN0aW9ucycpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tYXdhaXQtaW4tbG9vcCAqL1xuICAgICAgICBpbnN0cnVjdGlvbnMudGV4dENvbnRlbnQgPSBgUGxhY2UgeW91ciAke3NoaXBOYW1lc1tpXX0hYDtcbiAgICAgICAgYXdhaXQgYWxsb3dTaGlwUGxhY2VtZW50KHNoaXBMZW5ndGhzW2ldLCBwbGF5ZXJzKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Vycm9yJykudGV4dENvbnRlbnQgPSBgYDtcbiAgICB9XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby1hd2FpdC1pbi1sb29wICovXG4gICAgaW5zdHJ1Y3Rpb25zLnRleHRDb250ZW50ID0gJ1ByZXNzIHRoZSBidXR0b24gdG8gc3RhcnQhJztcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XG4gICAgbW91c2Vwb3NpdGlvbiA9IFtlLmNsaWVudFgsIGUuY2xpZW50WV07XG59KTtcblxuZXhwb3J0IHsgcGxhY2VTaGlwcyB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYGh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXG5iLCB1LCBpLCBjZW50ZXIsXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XG5cdG1hcmdpbjogMDtcblx0cGFkZGluZzogMDtcblx0Ym9yZGVyOiAwO1xuXHRmb250LXNpemU6IDEwMCU7XG5cdGZvbnQ6IGluaGVyaXQ7XG5cdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcbn1cbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcblx0ZGlzcGxheTogYmxvY2s7XG59XG5ib2R5IHtcblx0bGluZS1oZWlnaHQ6IDE7XG59XG5vbCwgdWwge1xuXHRsaXN0LXN0eWxlOiBub25lO1xufVxuYmxvY2txdW90ZSwgcSB7XG5cdHF1b3Rlczogbm9uZTtcbn1cbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xuXHRjb250ZW50OiAnJztcblx0Y29udGVudDogbm9uZTtcbn1cbnRhYmxlIHtcblx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcblx0Ym9yZGVyLXNwYWNpbmc6IDA7XG59XG5cbmJvZHkge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBoZWlnaHQ6MTAwdmg7XG5cdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5ib2FyZEFyZWEge1xuICAgIGhlaWdodDogNDAwcHg7XG4gICAgYXNwZWN0LXJhdGlvOiAxIC8gMTtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xufVxuXG4uYm9hcmRTcGFjZSB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG59XG5cbi5jYXJyaWVyIHtcblx0YmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xufVxuXG4uZ2hvc3Qge1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7Ozs7Ozs7Ozs7OztDQWFDLFNBQVM7Q0FDVCxVQUFVO0NBQ1YsU0FBUztDQUNULGVBQWU7Q0FDZixhQUFhO0NBQ2Isd0JBQXdCO0FBQ3pCO0FBQ0EsZ0RBQWdEO0FBQ2hEOztDQUVDLGNBQWM7QUFDZjtBQUNBO0NBQ0MsY0FBYztBQUNmO0FBQ0E7Q0FDQyxnQkFBZ0I7QUFDakI7QUFDQTtDQUNDLFlBQVk7QUFDYjtBQUNBOztDQUVDLFdBQVc7Q0FDWCxhQUFhO0FBQ2Q7QUFDQTtDQUNDLHlCQUF5QjtDQUN6QixpQkFBaUI7QUFDbEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixZQUFZO0NBQ2Ysc0JBQXNCO0FBQ3ZCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixhQUFhO0lBQ2Isc0NBQXNDO0lBQ3RDLG1DQUFtQztJQUNuQyx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSx1QkFBdUI7QUFDM0I7O0FBRUE7Q0FDQywyQkFBMkI7QUFDNUI7O0FBRUE7Q0FDQyxzQkFBc0I7QUFDdkJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRib3JkZXI6IDA7XFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcblxcdGZvbnQ6IGluaGVyaXQ7XFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxufVxcbm9sLCB1bCB7XFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXG59XFxuYmxvY2txdW90ZSwgcSB7XFxuXFx0cXVvdGVzOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0Y29udGVudDogbm9uZTtcXG59XFxudGFibGUge1xcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgaGVpZ2h0OjEwMHZoO1xcblxcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi5ib2FyZEFyZWEge1xcbiAgICBoZWlnaHQ6IDQwMHB4O1xcbiAgICBhc3BlY3QtcmF0aW86IDEgLyAxO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4uYm9hcmRTcGFjZSB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4uY2FycmllciB7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xcbn1cXG5cXG4uZ2hvc3Qge1xcblxcdGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgeyBjcmVhdGVQbGF5ZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvZ2FtZV9vYmplY3RzJztcbmltcG9ydCB7IHBsYWNlU2hpcHMgfSBmcm9tICcuL2NvbXBvbmVudHMvcGxhY2VTaGlwcyc7XG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcblxubGV0IHBsYXllcnMgPSBbXTtcbi8vICBsZXQgYWN0aXZlUGxheWVyID0gbnVsbDtcblxuZnVuY3Rpb24gcGxheWVySW5wdXQoaW5hY3RpdmUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgbGV0IGRpc2FibGVCb2FyZENvbnRyb2wgPSAoKSA9PiB7fTtcblxuICAgICAgICBjb25zdCByZWdpc3RlckF0dGFjayA9IChlKSA9PiB7XG4gICAgICAgICAgICBsZXQgY2VsbCA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgbGV0IHggPSBOdW1iZXIoY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93JykpO1xuICAgICAgICAgICAgbGV0IHkgPSBOdW1iZXIoY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sJykpO1xuICAgICAgICAgICAgbGV0IHJlcyA9IGluYWN0aXZlLmdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKFt4LCB5XSk7XG4gICAgICAgICAgICBpZiAoIXJlcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRpc2FibGVCb2FyZENvbnRyb2woaW5hY3RpdmUpO1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfTtcblxuICAgICAgICBkaXNhYmxlQm9hcmRDb250cm9sID0gKHApID0+IHtcbiAgICAgICAgICAgIHAuZ2FtZUJvYXJkLnNwYWNlRWxlbWVudHMuZm9yRWFjaCgocm93KSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3cubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcm93W2ldLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgcmVnaXN0ZXJBdHRhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGVuYWJsZUJvYXJkQ29udHJvbCA9IChwKSA9PiB7XG4gICAgICAgICAgICBwLmdhbWVCb2FyZC5zcGFjZUVsZW1lbnRzLmZvckVhY2goKHJvdykgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvd1tpXS5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHJlZ2lzdGVyQXR0YWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zb2xlLmxvZyhpbmFjdGl2ZSk7XG4gICAgICAgIGVuYWJsZUJvYXJkQ29udHJvbChpbmFjdGl2ZSk7XG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW5Mb29wKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydGdhbWUnKS5yZW1vdmUoKTtcbiAgICBsZXQgdHVybiA9IDA7XG4gICAgbGV0IGFjdGl2ZVBsYXllciA9IHBsYXllcnNbMF07XG4gICAgbGV0IGluYWN0aXZlUGxheWVyID0gcGxheWVyc1sxXTtcbiAgICB3aGlsZSAoIWFjdGl2ZVBsYXllci5nYW1lQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWF3YWl0LWluLWxvb3AgKi9cbiAgICAgICAgYXdhaXQgcGxheWVySW5wdXQoaW5hY3RpdmVQbGF5ZXIpO1xuICAgICAgICB0dXJuKys7XG4gICAgICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcnNbdHVybiAlIDJdO1xuICAgICAgICBpbmFjdGl2ZVBsYXllciA9IHBsYXllcnNbTWF0aC5hYnMoKHR1cm4gLSAxKSAlIDIpXTtcbiAgICB9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luc3RydWN0aW9ucycpLnRleHRDb250ZW50ID0gYFBsYXllciAke01hdGguYWJzKCh0dXJuIC0gMSkgJSAyKSArIDF9IFdpbnMhYDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaW5pdGlhbGl6ZUdhbWUoKSB7XG4gICAgcGxheWVycy5wdXNoKGNyZWF0ZVBsYXllcignaHVtJykpO1xuICAgIHBsYXllcnNbMF0uZ2FtZUJvYXJkLmRpc3BsYXlCb2FyZCgpO1xuICAgIGF3YWl0IHBsYWNlU2hpcHMocGxheWVycyk7XG4gICAgcGxheWVycy5wdXNoKGNyZWF0ZVBsYXllcignY3B1JykpO1xuICAgIGxldCBzdGFydEdhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBzdGFydEdhbWUuaWQgPSAnc3RhcnRnYW1lJztcbiAgICBzdGFydEdhbWUuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBtYWluTG9vcCk7XG4gICAgc3RhcnRHYW1lLnRleHRDb250ZW50ID0gXCJDbGljayBoZXJlIHRvIHN0YXJ0IVwiO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChzdGFydEdhbWUpO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGluaXRpYWxpemVHYW1lKTtcbiJdLCJuYW1lcyI6WyJzaGlwRmFjdG9yeSIsImxlbiIsImxlbmd0aCIsImhpdHMiLCJzaGlwIiwib3JpZW50YXRpb24iLCJpc1N1bmsiLCJzdW5rIiwiaXNIaXQiLCJjaGFuZ2VPcmllbnRhdGlvbiIsImdldE9yaWVudGF0aW9uIiwiZ2FtZUJvYXJkRmFjdG9yeSIsInNoaXBzIiwic3BhY2VzIiwiQXJyYXkiLCJtYXAiLCJzcGFjZUVsZW1lbnRzIiwiZ2FtZUJvYXJkIiwibm9TaGlwc0xlZnQiLCJhbGxTdW5rIiwiZXZlcnkiLCJkaXNwbGF5Qm9hcmQiLCJib2FyZEFyZWEiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ4IiwieSIsIm5ld1NwYWNlIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJxdWVyeVNlbGVjdG9yIiwiZ2VuZXJhdGVTcGFjZXMiLCJvY2N1cGllZCIsImkiLCJwdXNoIiwiaXNWYWxpZFBsYWNlbWVudCIsInNoaXBPY2N1cGFuY3kiLCJ0ZXh0Q29udGVudCIsInVuZGVmaW5lZCIsInBsYWNlU2hpcCIsImNvb3JkIiwibmV3U2hpcCIsIk51bWJlciIsInRhcmdldFNwYWNlIiwicmVtb3ZlIiwiYWxsU2hpcHNTdW5rIiwicmVjZWl2ZUF0dGFjayIsImF0dGFja2VkU3BhY2UiLCJpbmNsdWRlcyIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiY3JlYXRlUGxheWVyIiwidHlwZSIsImxlbmd0aHMiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJvIiwicmVzIiwicGxheWVyIiwic2hpcE5hbWVzIiwibW91c2Vwb3NpdGlvbiIsImFsbG93U2hpcFBsYWNlbWVudCIsInBsYXllcnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsImJvYXJkQ2VsbHMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiZ2V0QWZmZWN0ZWRTcXVhcmVzIiwiY2VsbHMiLCJjb29yZHMiLCJ4aSIsInlpIiwidGhpc0NlbGwiLCJ1cGRhdGVTaGlwRGlzcGxheSIsImVsZW1lbnRGcm9tUG9pbnQiLCJjb250YWlucyIsImdldEF0dHJpYnV0ZSIsImZvckVhY2giLCJjZWxsIiwicm90YXRlU2hpcCIsImV2ZW50Iiwia2V5Q29kZSIsImxpZ2h0U3F1YXJlIiwidGFyZ2V0IiwidW5saWdodFNxdWFyZSIsInJlcG9ydENlbGxDb29yZGluYXRlIiwic3BhY2UiLCJmcm9tIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJwbGFjZVNoaXBzIiwic2hpcExlbmd0aHMiLCJpbnN0cnVjdGlvbnMiLCJlIiwiY2xpZW50WCIsImNsaWVudFkiLCJwbGF5ZXJJbnB1dCIsImluYWN0aXZlIiwiZGlzYWJsZUJvYXJkQ29udHJvbCIsInJlZ2lzdGVyQXR0YWNrIiwicCIsInJvdyIsImVuYWJsZUJvYXJkQ29udHJvbCIsImNvbnNvbGUiLCJsb2ciLCJtYWluTG9vcCIsInR1cm4iLCJhY3RpdmVQbGF5ZXIiLCJpbmFjdGl2ZVBsYXllciIsImFicyIsImluaXRpYWxpemVHYW1lIiwic3RhcnRHYW1lIiwiaWQiXSwic291cmNlUm9vdCI6IiJ9