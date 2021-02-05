import React from 'react';
import { useState } from 'react'

const arr = [
    ["X", "X", "O"],
    ["X", "X", "O"],
    ["X", "X", "O"]
]

const printboard = () => {
    console.log(`Содержимое массива arr: ` + arr)
}

export default function Game() {
    const [state, setState] = useState("")

    return (
        <div>
            
        </div>
    )
}

printboard()