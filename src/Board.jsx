import { useState } from 'react';
import Square from './Square.jsx';

function getnextPlayer(squares) {
    const filledSquares = squares.filter(item => (item === "X" || item === "O"));
    const filledNumber = filledSquares.length;
    const nextPlayer = (filledNumber % 2 === 0) ? "X" : "O";
    return nextPlayer;
}

function calculateWinner(squares) {
    const winConditions = [
        // 每行相同
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // 每列相同
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // 对角线相同
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < winConditions.length; i++) {
        const winCondition = winConditions[i];
        const [a, b, c] = winCondition;
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    const filledSquares = squares.filter(item => (item === "X" || item === "O"));
    if(filledSquares.length === 9) {
        return "Nobody";
    }
    return null;
}

function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const nextPlayer = getnextPlayer(squares);

    const winner = calculateWinner(squares);
    
    // 点击棋盘格的时候触发clickHandler，clickHandler会创建currentSquare去改变square的state，一旦被setSquares方法改变state，就会重新渲染
    // 重新渲染，重新执行Board(), 执行newLetter，也会刷新status的值
    let status = winner ? `${winner} is winner` : `Next player: ${nextPlayer}`;

    const clickHandler = (index) => {
        const currentSquare = squares[index];
        if (currentSquare === null && !winner) {
            const newSquares = squares.slice();  // 创建一个squares的副本，生成一个全新的数组，确保原square不变
            newSquares[index] = nextPlayer;
            setSquares(newSquares);
        }

        /* 
        为什么要建立新数组而不是像如下这么写？因为这么写还是用的以前的数组直接改了数组的值，
                                    数组的引用没有发生变化，只有数组的引用发生了变化，才会重新渲染
        squares[index] = 'X'; // 直接修改原状态
        setSquares(squares); // 设置"相同"的状态
        
        1. 直接修改原状态：直接修改了 squares 数组的元素
        2. 设置状态：虽然数组内容变了，但数组引用没变
        3. React 的比较机制：React 使用 Object.is 比较前后状态，对于对象/数组只比较引用
        
        前后都是同一个 squares 数组引用
        React 认为状态没有变化，不会触发重新渲染
        */
    }
    return (
        <>
            <div className="status">{ status }</div>
            <div className="board-row" >
                <Square value={squares[0]} index={0} onClick={clickHandler}/>
                <Square value={squares[1]} index={1} onClick={clickHandler}/>
                <Square value={squares[2]} index={2} onClick={clickHandler}/>
            </div>
            <div className="board-row" >
                <Square value={squares[3]} index={3} onClick={clickHandler}/>
                <Square value={squares[4]} index={4} onClick={clickHandler}/>
                <Square value={squares[5]} index={5} onClick={clickHandler}/>
            </div>
            <div className="board-row" >
                <Square value={squares[6]} index={6} onClick={clickHandler}/>
                <Square value={squares[7]} index={7} onClick={clickHandler}/>
                <Square value={squares[8]} index={8} onClick={clickHandler}/>
            </div>


        </>
        
    );
}

export default Board;