// import { StepLabel } from '@material-ui/core';
import React from 'react';
import { useState } from 'react'
import styles from './Game.module.css'
import { winComboDiag, testBoard } from './diag'

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

const newBoard = [
    ["-", "-", "-", "X"],
    ["-", "-", "X", "-"],
    ["-", "X", "-", "-"],
    ["-", "-", "-", "-"]
]


function isWinner(board: string[][]) {
    const symbols = ["X", "O", "-"];

    const winLength = 3

    for (let si = 0; si < symbols.length - 1; si++) {
        const s = symbols[si]
        const winRow = (e: string, index: number, arr: string[]) => {
            if (arr.length < index + winLength) { return false }
            return arr.slice(index, index + winLength).every(v => v === s)
        }
        const winCol = (e: string[], index: number, board: string[][]) => {
            return board.map(row => row[index]).some(winRow)
        }
        if (board.some((row) => row.some(winRow)) || board.some(winCol) || winComboDiag(board, winLength, s)) {
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

    const renderBoard = iBoard.map((currentRow, col) => {
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
        // console.log(testArr.some(wincombo2))
        // console.log(winComboDiag(testBoard, 4, "O"))

    }
    return (<GameRender board={gameBoard} onClick={handleClick} message={message} />)
}
