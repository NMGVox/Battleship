/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game_objects.js":
/*!*****************************!*\
  !*** ./src/game_objects.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPlayer: () => (/* binding */ createPlayer)
/* harmony export */ });
function shipFactory(len) {
  const length = len;
  const hits = 0;
  let ship;
  function isSunk() {
    if (ship.hits === ship.length) {
      ship.sunk = true;
    }
  }
  function isHit() {
    ship.hits++;
    isSunk();
  }
  ship = {
    length,
    hits,
    sunk: false,
    isHit,
    isSunk
  };
  return ship;
}
function gameBoardFactory() {
  const ships = [];
  const spaces = [...Array(8)].map(() => Array(8));
  let gameBoard;
  function isValidPlacement(len, coord) {
    for (let i = 0; i < len; i++) {
      const x = coord[0];
      const y = coord[1] + i;
      if (gameBoard.spaces[x][y] !== undefined) {
        return false;
      }
      if (!(x < 8 && x >= 0 && y < 8 && y >= 0)) {
        return false;
      }
    }
    return true;
  }
  function placeShip(len, coord) {
    const newShip = shipFactory(len);
    if (!isValidPlacement(len, coord)) {
      return null;
    }
    for (let i = 0; i < len; i++) {
      gameBoard.spaces[coord[0]][coord[1] + i] = newShip;
    }
    gameBoard.ships.push(newShip);
    return true;
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
      return true;
    }
    gameBoard.spaces[x][y] = 'x';
    return true;
  }
  function allShipsSunk() {
    return gameBoard.ships.every(ship => ship.sunk === true);
  }
  gameBoard = {
    ships,
    spaces,
    placeShip,
    receiveAttack,
    allShipsSunk
  };
  return gameBoard;
}
function createPlayer(type) {
  const gameBoard = gameBoardFactory();
  if (type === 'cpu') {
    const lengths = [5, 4, 3, 3, 2];
    for (let i = 0; i < lengths.length; i++) {
      const x = Math.floor(Math.random() * 8);
      const y = Math.floor(Math.random() * 8);
      const res = gameBoard.placeShip(lengths[i], [x, y]);
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
/******/ 			// no module.id needed
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_objects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_objects */ "./src/game_objects.js");

window.addEventListener('load', () => {
  let playerOne = (0,_game_objects__WEBPACK_IMPORTED_MODULE_0__.createPlayer)('hum');
  console.log(playerOne);
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BQ3ZDLE1BQU1DLEdBQUcsR0FBR3JCLFNBQVMsQ0FBQ08sU0FBUyxDQUFDVSxPQUFPLENBQUNkLENBQUMsQ0FBQyxFQUFFLENBQUNDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUM7TUFDbkQsSUFBSSxDQUFDZ0IsR0FBRyxFQUFFO1FBQ05sQixDQUFDLEVBQUU7TUFDUDtJQUNKO0VBQ0o7RUFFQSxNQUFNbUIsTUFBTSxHQUFHO0lBQ1hOLElBQUk7SUFDSmhCO0VBQ0osQ0FBQztFQUNELE9BQU9zQixNQUFNO0FBQ2pCOzs7Ozs7O1VDaEhBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOOEM7QUFFOUNDLE1BQU0sQ0FBQ0MsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLE1BQU07RUFDbEMsSUFBSUMsU0FBUyxHQUFHViwyREFBWSxDQUFDLEtBQUssQ0FBQztFQUNuQ1csT0FBTyxDQUFDQyxHQUFHLENBQUNGLFNBQVMsQ0FBQztBQUMxQixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZV9vYmplY3RzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNoaXBGYWN0b3J5KGxlbikge1xuICAgIGNvbnN0IGxlbmd0aCA9IGxlbjtcbiAgICBjb25zdCBoaXRzID0gMDtcbiAgICBsZXQgc2hpcDtcblxuICAgIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICAgICAgaWYgKHNoaXAuaGl0cyA9PT0gc2hpcC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNoaXAuc3VuayA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0hpdCgpIHtcbiAgICAgICAgc2hpcC5oaXRzKys7XG4gICAgICAgIGlzU3VuaygpO1xuICAgIH1cblxuICAgIHNoaXAgPSB7XG4gICAgICAgIGxlbmd0aCxcbiAgICAgICAgaGl0cyxcbiAgICAgICAgc3VuazogZmFsc2UsXG4gICAgICAgIGlzSGl0LFxuICAgICAgICBpc1N1bmssXG4gICAgfTtcblxuICAgIHJldHVybiBzaGlwO1xufVxuXG5mdW5jdGlvbiBnYW1lQm9hcmRGYWN0b3J5KCkge1xuICAgIGNvbnN0IHNoaXBzID0gW107XG4gICAgY29uc3Qgc3BhY2VzID0gWy4uLkFycmF5KDgpXS5tYXAoKCkgPT4gQXJyYXkoOCkpO1xuICAgIGxldCBnYW1lQm9hcmQ7XG5cbiAgICBmdW5jdGlvbiBpc1ZhbGlkUGxhY2VtZW50KGxlbiwgY29vcmQpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY29uc3QgeCA9IGNvb3JkWzBdO1xuICAgICAgICAgICAgY29uc3QgeSA9IGNvb3JkWzFdICsgaTtcbiAgICAgICAgICAgICBpZiAoZ2FtZUJvYXJkLnNwYWNlc1t4XVt5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEoKHggPCA4ICYmIHggPj0gMCkgJiYgKHkgPCA4ICYmIHkgPj0gMCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlU2hpcChsZW4sIGNvb3JkKSB7XG4gICAgICAgIGNvbnN0IG5ld1NoaXAgPSBzaGlwRmFjdG9yeShsZW4pO1xuICAgICAgICBpZiAoIWlzVmFsaWRQbGFjZW1lbnQobGVuLCBjb29yZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGdhbWVCb2FyZC5zcGFjZXNbY29vcmRbMF1dW2Nvb3JkWzFdICsgaV0gPSBuZXdTaGlwO1xuICAgICAgICB9XG4gICAgICAgIGdhbWVCb2FyZC5zaGlwcy5wdXNoKG5ld1NoaXApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKGNvb3JkKSB7XG4gICAgICAgIGNvbnN0IHggPSBjb29yZFswXTtcbiAgICAgICAgY29uc3QgeSA9IGNvb3JkWzFdO1xuICAgICAgICBjb25zdCBhdHRhY2tlZFNwYWNlID0gZ2FtZUJvYXJkLnNwYWNlc1t4XVt5XTtcblxuICAgICAgICBpZiAoYXR0YWNrZWRTcGFjZSA9PT0gJ3gnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdhbWVCb2FyZC5zaGlwcy5pbmNsdWRlcyhhdHRhY2tlZFNwYWNlKSkge1xuICAgICAgICAgICAgYXR0YWNrZWRTcGFjZS5pc0hpdCgpO1xuICAgICAgICAgICAgZ2FtZUJvYXJkLnNwYWNlc1t4XVt5XSA9ICdvJztcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGdhbWVCb2FyZC5zcGFjZXNbeF1beV0gPSAneCc7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFsbFNoaXBzU3VuaygpIHtcbiAgICAgICAgcmV0dXJuIGdhbWVCb2FyZC5zaGlwcy5ldmVyeShcbiAgICAgICAgICAgIChzaGlwKSA9PiBzaGlwLnN1bmsgPT09IHRydWUsXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2FtZUJvYXJkID0ge1xuICAgICAgICBzaGlwcyxcbiAgICAgICAgc3BhY2VzLFxuICAgICAgICBwbGFjZVNoaXAsXG4gICAgICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgICAgIGFsbFNoaXBzU3VuayxcbiAgICB9O1xuXG4gICAgcmV0dXJuIGdhbWVCb2FyZDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUGxheWVyKHR5cGUpIHtcbiAgICBjb25zdCBnYW1lQm9hcmQgPSBnYW1lQm9hcmRGYWN0b3J5KCk7XG5cbiAgICBpZiAodHlwZSA9PT0gJ2NwdScpIHtcbiAgICAgICAgY29uc3QgbGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gICAgICAgICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBnYW1lQm9hcmQucGxhY2VTaGlwKGxlbmd0aHNbaV0sIFt4LCB5XSk7XG4gICAgICAgICAgICBpZiAoIXJlcykge1xuICAgICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHBsYXllciA9IHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAgZ2FtZUJvYXJkLFxuICAgIH07XG4gICAgcmV0dXJuIHBsYXllcjtcbn1cblxuZXhwb3J0IHsgY3JlYXRlUGxheWVyIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNyZWF0ZVBsYXllciB9IGZyb20gJy4vZ2FtZV9vYmplY3RzJztcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgbGV0IHBsYXllck9uZSA9IGNyZWF0ZVBsYXllcignaHVtJyk7XG4gICAgY29uc29sZS5sb2cocGxheWVyT25lKTtcbn0pO1xuIl0sIm5hbWVzIjpbInNoaXBGYWN0b3J5IiwibGVuIiwibGVuZ3RoIiwiaGl0cyIsInNoaXAiLCJpc1N1bmsiLCJzdW5rIiwiaXNIaXQiLCJnYW1lQm9hcmRGYWN0b3J5Iiwic2hpcHMiLCJzcGFjZXMiLCJBcnJheSIsIm1hcCIsImdhbWVCb2FyZCIsImlzVmFsaWRQbGFjZW1lbnQiLCJjb29yZCIsImkiLCJ4IiwieSIsInVuZGVmaW5lZCIsInBsYWNlU2hpcCIsIm5ld1NoaXAiLCJwdXNoIiwicmVjZWl2ZUF0dGFjayIsImF0dGFja2VkU3BhY2UiLCJpbmNsdWRlcyIsImFsbFNoaXBzU3VuayIsImV2ZXJ5IiwiY3JlYXRlUGxheWVyIiwidHlwZSIsImxlbmd0aHMiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyZXMiLCJwbGF5ZXIiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicGxheWVyT25lIiwiY29uc29sZSIsImxvZyJdLCJzb3VyY2VSb290IjoiIn0=