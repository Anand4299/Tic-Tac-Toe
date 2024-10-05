import React, { useState } from "react";
import "./TicTacToe.css"; // Ensure you import the CSS

const TicTacToe = () => {
  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isTie, setIsTie] = useState(false);

  const handleClick = (index) => {
    // Ignore if box is already filled or there's a winner
    if (boxes[index] || winner) return; 
    const newBoxes = boxes.slice();
    newBoxes[index] = isXNext ? "X" : "O"; // Mark the box with "X" or "O"
    setBoxes(newBoxes);
    setIsXNext(!isXNext); // Switch turns

    const calculatedWinner = calculateWinner(newBoxes); // Check for winner
    if (calculatedWinner) {
      setWinner(calculatedWinner); // Set winner if found
    } else if (newBoxes.every(Boolean)) {
      setIsTie(true); // Set tie if all boxes are filled
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Return winner
      }
    }
    return null; // No winner
  };

  const resetGame = () => {
    setBoxes(Array(9).fill(null)); // Reset boxes
    setWinner(null); // Reset winner
    setIsTie(false); // Reset tie
    setIsXNext(true); // Start with X
  };

  const renderBox = (index) => (
    <button className="box" onClick={() => handleClick(index)}>
      {boxes[index]}
    </button>
  );

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className="game">
        {renderBox(0)}
        {renderBox(1)}
        {renderBox(2)}
        {renderBox(3)}
        {renderBox(4)}
        {renderBox(5)}
        {renderBox(6)}
        {renderBox(7)}
        {renderBox(8)}
      </div>
      {winner && <div id="msg">{winner} Wins!</div>}
      {isTie && <div id="msg" className="tie-message">It's a Tie!</div>}
      <button id="reset-btn" onClick={resetGame}>New Game</button>
    </div>
  );
};

export default TicTacToe;
