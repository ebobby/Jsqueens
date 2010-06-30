/**
 * @author Francisco Soto <ebobby@gmail.com>
 */
 var Queens = (function () {
    var NUM_QUEENS             = 8,
        NUM_BOARD_SQUARES      = 64,
        currentQueensPositions = [],
        newQueensPositions     = [];

    function _generateRandomPositions () {
        var done = false;

        for (var iQueen = 0; iQueen < NUM_QUEENS; iQueen++) {
            var repetitions = true;

            currentQueensPositions[iQueen] = {};
            while (repetitions) {
                currentQueensPositions[iQueen].x = parseInt(Math.random() * 8);
                currentQueensPositions[iQueen].y = parseInt(Math.random() * 8);

                if (!_checkRepetitions(currentQueensPositions)) {
                    repetitions = false;
                }
            }
        }

        return _calculateAttacks(currentQueensPositions);
    }

    function _calculateAttacks (board) {
        var numAttacks = 0;

        for (var iQueen = 0; iQueen < NUM_QUEENS - 1; iQueen++) {
            for (var iAttackingQueen = iQueen + 1; iAttackingQueen < NUM_QUEENS; iAttackingQueen++) {
                if (board[iQueen].x == board[iAttackingQueen].x) {
                    numAttacks++;
                }
                else if (board[iQueen].y == board[iAttackingQueen].y) {
                    numAttacks++;
                }
                else if (board[iQueen].x + board[iQueen].y ==
                         board[iAttackingQueen].x + board[iAttackingQueen].y) {
                    numAttacks++;
                }
                else if (board[iQueen].y - board[iQueen].x ==
                         board[iAttackingQueen].y - board[iAttackingQueen].x) {
                    numAttacks++;
                }
            }
        }

        return numAttacks;
    }

    function _generateNeighbor () {
        for (var iQueen = 0; iQueen < NUM_QUEENS; iQueen++) {
            newQueensPositions[iQueen] = {
                x: currentQueensPositions[iQueen].x,
                y: currentQueensPositions[iQueen].y
            };
        }

        var changingQueen = parseInt(Math.random() * NUM_QUEENS);
        var repetitions = true;

        while (repetitions) {
            var oldX = newQueensPositions[changingQueen].x;
            var oldY = newQueensPositions[changingQueen].y;

            newQueensPositions[changingQueen].x = (newQueensPositions[changingQueen].x + (parseInt(Math.random() * 3) - 1)) % 8;
            newQueensPositions[changingQueen].y = (newQueensPositions[changingQueen].y + (parseInt(Math.random() * 3) - 1)) % 8;

            if (newQueensPositions[changingQueen].x < 0) {
                newQueensPositions[changingQueen].x = newQueensPositions[changingQueen].x + 8;
            }

            if (newQueensPositions[changingQueen].y < 0) {
                newQueensPositions[changingQueen].y = newQueensPositions[changingQueen].y + 8;
            }

            if (!_checkRepetitions(newQueensPositions)) {
                repetitions = false;
            }
            else {
                newQueensPositions[changingQueen].x = oldX;
                newQueensPositions[changingQueen].y = oldY;
            }
        }

        return _calculateAttacks(newQueensPositions);
    }

    function _checkRepetitions (board) {
        var howMany = board.length;

        for (var iQueen = 0; iQueen < howMany - 1; iQueen++) {
            for (var iCheckQueen = iQueen + 1; iCheckQueen < howMany; iCheckQueen++) {
                if (board[iQueen].x === board[iCheckQueen].x &&
                    board[iQueen].y === board[iCheckQueen].y) {
                    return true;
                }
            }
        }

        return false;
    }

    function _acceptNeighbor () {
        for (var iQueen = 0; iQueen < NUM_QUEENS; iQueen++) {
            currentQueensPositions[iQueen] = { x: newQueensPositions[iQueen].x, y: newQueensPositions[iQueen].y } ;
        }
    }

    function _getCurrentPositions () {
        var positions = [];

        for (var iQueen = 0; iQueen < NUM_QUEENS; iQueen++) {
            positions[iQueen] = currentQueensPositions[iQueen].x + (currentQueensPositions[iQueen].y * 8);
        }

        return positions;
    }

    return {
        GenerateRandomPositions: function () {
            return _generateRandomPositions();
        },

        GetCurrentPositions: function () {
            return _getCurrentPositions();
        },

        GenerateNeighbor: function () {
            return _generateNeighbor();
        },

        AcceptNeighbor: function () {
            _acceptNeighbor();
        }
    };
})();
