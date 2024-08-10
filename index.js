const solveNQueens = (n) => {
    const solutions = [];
    const queens = new Set();
    
    const cols = new Array(n).fill(false);
    const hills = new Array(2 * n - 1).fill(false);
    const dales = new Array(2 * n - 1).fill(false);

    const isNotUnderAttack = (row, col) => {
        return !cols[col] && !hills[row - col + n - 1] && !dales[row + col];
    };

    const placeQueen = (row, col) => {
        queens.add(`${row}-${col}`);
        cols[col] = true;
        hills[row - col + n - 1] = true;
        dales[row + col] = true;
    };

    const removeQueen = (row, col) => {
        queens.delete(`${row}-${col}`);
        cols[col] = false;
        hills[row - col + n - 1] = false;
        dales[row + col] = false;
    };

    const addSolution = () => {
        const solution = [];
        queens.forEach(q => {
            const [row, col] = q.split('-').map(Number);
            solution[row] = '.'.repeat(col) + 'Q' + '.'.repeat(n - col - 1);
        });
        solutions.push(solution);
    };

    const backtrack = (row = 0) => {
        for (let col = 0; col < n; col++) {
            if (isNotUnderAttack(row, col)) {
                placeQueen(row, col);
                if (row + 1 === n) {
                    addSolution();
                } else {
                    backtrack(row + 1);
                }
                removeQueen(row, col);
            }
        }
    };

    backtrack();
    return solutions;
};

const solutions = solveNQueens(8);
console.log(solutions.length)

solutions.forEach(solution => {
    solution.forEach(row => console.log(row));
    console.log();
});
