export const testBoard = [
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "X", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "O", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "X", "-", "-", "-", "O", "-", "-", "-"],
    ["-", "-", "-", "-", "X", "-", "-", "-", "-", "O", "-", "-"],
    ["-", "-", "-", "-", "-", "X", "-", "-", "X", "-", "O", "-"],
    ["-", "-", "-", "-", "X", "-", "-", "X", "-", "O", "-", "-"],
    ["-", "-", "-", "X", "-", "-", "X", "-", "O", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "X", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]
]


export function winComboDiag(board: string[][], winLength: number, symbol: string) {

    function diagComboFwd(x: number, y: number) {
        let sum = 0
        for (let i = 0; i < winLength; i++) {
            if ((y + i >= board.length) || (x + i >= board[y].length)) { continue; }
            if (board[y + i][x + i] === symbol) {
                sum++
            }
        }
        return (sum === winLength)
    }

    function diagComboBck(x: number, y: number) {
        let sum = 0
        for (let i = 0; i < winLength; i++) {
            if ((y + i >= board.length) || (x - i < 0)) { continue; }
            if (board[y + i][x - i] === symbol) {
                sum++
            }
        }
        return (sum === winLength)
    }


    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (diagComboFwd(x, y) || diagComboBck(x, y)) {
                return true
            }
        }
    }
    return false
}
