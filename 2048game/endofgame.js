// Function to check if there are no more valid moves
function noMoreMoves(boa) {
    for (let row = 0; row < boa.length; row++) {
        for (let col = 0; col < boa[row].length; col++) {
            // Check if the current cell is empty
            if (boa[row][col] === 0) {
                return false; // There's an empty cell, so the game is not over
            }
            
            // Check adjacent cells for possible merges
            if (row > 0 && boa[row][col] === boa[row - 1][col]) {
                return false; // Merge possible above
            }
            if (row < boa.length - 1 && boa[row][col] === boa[row + 1][col]) {
                return false; // Merge possible below
            }
            if (col > 0 && boa[row][col] === boa[row][col - 1]) {
                return false; // Merge possible to the left
            }
            if (col < boa[row].length - 1 && boa[row][col] === boa[row][col + 1]) {
                return false; // Merge possible to the right
            }
        }
    }
    
    return true; // No more valid moves, game over
}

// Example usage
const grid = [
    [2, 2, 16, 2],
    [4, 64, 4, 8],
    [8, 32, 16, 32],
    [2, 8, 4, 256]
];

if (noMoreMoves(grid)) {
    console.log("Game Over");
} else {
    console.log("Game still in progress");
}
