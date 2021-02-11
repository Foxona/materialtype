// import { StepLabel } from '@material-ui/core';
import React from 'react';
import { useState } from 'react'
import styles from './Game.module.css'

type GameProps = {board: string[][]}

function GameRender(props:GameProps) {
    const iBoard = props.board;

    const renderBoard = [] // 3 ul
    for (let i = 0; i < iBoard.length; i++) {
        let currentRow = iBoard[i]
        const fillArr = [] // 3 li
        for (let v = 0; v < currentRow.length; v++) {
            const currentCell = currentRow[v]
            fillArr.push(<li className={styles.li}>{(currentCell === '-') ? " " : currentCell}</li>)
        }
        renderBoard.push(<ul className={styles.ul}>{fillArr}</ul>)
    }

    return (<>
        <div className={styles.container}>
            {/* {[(<div>1</div>), (<div>2</div>), (<div>3</div>)]} */}
            {renderBoard}
        </div>
    </>)
}

export default function Game() {
    const iBoard2 = [
        ["X", "X", "-", "O"],
        ["X", "X", "X", "O"],
        ["O", "X", "-", "X"],
        ["X", "O", "-", "-"],
    ]
    const iBoard = [
        ["X", "X", "-"],
        ["X", "X", "X"],
        ["O", "X", "-"]
    ]

    return (<GameRender board={iBoard} />)
}

    // for (let v = 0; v < 3; v++) {
    //     ulElems.push((<ul style={{ display: "flex" }}><li>{v}</li></ul>))
    //     console.log(ulElems)

    //     for (let i = 0; i < 3; i++) {
    //         ulElems.push((<li style={{ listStyle: "none" }}>X</li>))
    //     }
    // }