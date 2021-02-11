import React from 'react';
import { useState } from 'react'



function Game() {
    const iBoard = [
        ["O", "X", "-"],
        ["O", "-", "-"],
        ["O", "-", "X"]
    ]
    const boardElems = []

    for (let i = 0; i < 3; i++) {

        for (let i = 0; i < 3; i++) {
            boardElems.push(<div>{i}</div>)
            console.log(i)
        }
    }

    return (<>

        <div>
            {/* {[(<div>1</div>), (<div>2</div>), (<div>3</div>)]} */}
            {boardElems}
        </div>

    </>)
}

export default function GameRender() {
    return (<Game />)
}