// import { StepLabel } from '@material-ui/core';
import React from 'react';
import { useState } from 'react'
import styles from './Game.module.css'

// type GameSymbol = "X" | "O" | "-"
type GameProps = {
    board: string[][],
    onClick: (x: number, y: number) => void,
    message: string
}

function emptyBoard() {
    return [
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"]
    ]
}

function isWinner(board: string[][]) {
    const symbols = ["X", "O", "-"];

    for (let si = 0; si < symbols.length - 1; si++) {
        const s = symbols[si]

        for (let i = 0; i < board.length; i++) {
            if (board[0][i] === s && board[1][i] === s && board[2][i] === s) {
                return s
            }
        }

        for (let i = 0; i < board.length; i++) {
            if (board[i][0] === s && board[i][1] === s && board[i][2] === s) {
                return s
            }
        }

        if (board[0][0] === s && board[1][1] === s && board[2][2] === s) {
            return s
        }

        if (board[0][2] === s && board[1][1] === s && board[2][0] === s) {
            return s
        }
    }

    return ("-")
}

function GameRender(props: GameProps) {
    const iBoard = props.board;
    const parrentClick = props.onClick
    const message = props.message

    function handleClick(x: number, y: number) {
        parrentClick(x, y)
    }

    // const renderBoard: JSX.Element[] = [] // 3 ul

    // for (let i = 0; i < iBoard.length; i++) {
    //     let currentRow = iBoard[i]
    //     const fillArr = [] // 3 li
    //     for (let v = 0; v < currentRow.length; v++) {
    //         const currentCell = currentRow[v]
    //         fillArr.push(<li onClick={() => { handleClick(v, i) }} className={styles.li}>{(currentCell === '-') ? " " : currentCell}</li>)
    //     }
    //     renderBoard.push(<ul className={styles.ul}>{fillArr}</ul>)
    // }

    const renderBoard = iBoard.map((i, col) => {
        let currentRow = i
        const fillArr = currentRow.map((v, row) => (<li key={row} onClick={() => { handleClick(row, col) }} className={styles.li}>{(v === '-') ? " " : v}</li>))
        return (<ul key={col} className={styles.ul}>{fillArr}</ul>)
    })

    return (<>
        <div className={styles.container}>
            {/* {[(<div>1</div>), (<div>2</div>), (<div>3</div>)]} */}
            {renderBoard}
        </div>
        <div>{message}</div>
    </>)
}

export default function Game() {
    let [gameBoard, setBoard] = useState(emptyBoard())
    let [curPlayer, setCurPlayer] = useState("X")
    let [message, setMessage] = useState("")

    function turn(row: number, col: number) {
        // console.log(gameBoard)
        if (gameBoard[row][col] !== "-") {
            setMessage('Невозможно ходить там где нельзя!')
            return
        }

        if (isWinner(gameBoard) === "X" || isWinner(gameBoard) === "O") {
            setMessage(`Игра окончена! Уже победил: ` + isWinner(gameBoard))
            return
        }

        if (col > 2 || row > 2) {
            setMessage('Неверно выбран выбор!')
            return
        }

        gameBoard[row][col] = curPlayer

        if (isWinner(gameBoard) === "-") {
            setMessage('Игра продолжается!')
        } else {
            setMessage(`Победитель: ` + isWinner(gameBoard))
        }
    }


    const handleClick = function (col: number, row: number) {
        // console.log(col + " " + row)
        turn(row, col)
        setBoard([...gameBoard])
        if (curPlayer === "O") {
            setCurPlayer("X")
        } else {
            setCurPlayer("O")
        }

        const testArr = ["X", "X", "O", " ", "X", "O", "O", "O", "X"]
        const winLength = 4

        function wincombo2(e: string, index: number, arr: string[]) {
            return arr.slice(index, index + winLength).every(v => v === "O")
        }

        function wincomboCol2(e: string, index: number, board: string[][]) {
            return board.map(row => row[index]).slice(index, index + winLength).every(v => v === "O")
        }

        function winCombination(e: string, index: number, arr: string[]) {
            let sum = 0
            for (let i = 0; i < winLength; i++) {
                console.log(arr[index + i])
                if (arr[index + i] === "O") {
                    sum++
                }
            }
            if (sum === winLength) {
                return true
            }
            return false
        }
        console.log(testArr.some(wincombo2))
    }
    return (<GameRender board={gameBoard} onClick={handleClick} message={message} />)
}
