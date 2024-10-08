import React, { useState } from 'react';
import './TicTacToe.css'; // Link the CSS file for styling

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [message, setMessage] = useState("");

  const handleClick = (index) => {
    if (board[index] || message) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'HERO' : 'DON';
    setBoard(newBoard);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setMessage(`${winner} Wins!`);
    } else if (newBoard.every(tile => tile)) {
      setMessage("It's a Tie!");
    } else {
      setIsXTurn(!isXTurn);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setMessage("");
  };

  const calculateWinner = (board) => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  return (
    <div className="game-container">
      <h1 className="heading">Tic Tac Toe</h1>
      <div className="game-board">
        {board.map((cell, index) => (
          <button key={index} className="tile" onClick={() => handleClick(index)}>
            {cell}
          </button>
        ))}
      </div>
      {message && <div id="msg" className="animate">{message}</div>}
      <button id="reset-btn" onClick={resetGame}>New Game</button>
    </div>
  );
};

export default TicTacToe;
