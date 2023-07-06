/* eslint-disable no-constant-condition */
function playerInput(activePlayer, inactive) {
    return new Promise((resolve) => {
        let disableBoardControl = () => {};

        const registerAttack = (e) => {
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

        disableBoardControl = (p) => {
            p.gameBoard.spaceElements.forEach((row) => {
                for (let i = 0; i < row.length; i++) {
                    row[i].removeEventListener('pointerdown', registerAttack);
                }
            });
        };

        const enableBoardControl = (p) => {
            p.gameBoard.spaceElements.forEach((row) => {
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
            if (typeof (space) === 'object' && space.sunk) {
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

export { playerInput };
