import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [currPlayer, setCurrPlayer] = useState("X");

  // WiP: This function must return the name of the winning player || null
  // function checkWinner() {
  //   const combinations = [
  //     [board[0][0], board[0][1], board[0][2]],
  //     [board[1][0], board[1][1], board[1][2]],
  //     [board[2][0], board[2][1], board[2][2]],
  //     [board[0][0], board[1][0], board[2][0]],
  //     [board[0][1], board[1][1], board[2][1]],
  //     [board[0][2], board[1][2], board[2][2]],
  //     [board[0][0], board[1][1], board[2][2]],
  //     [board[0][2], board[1][1], board[2][0]],
  //   ];
  // }

  function hClick(x, y) {
    if (board[x][y]) return;

    const newBoard = [];
    for (let i = 0; i <= 2; i += 1) {
      newBoard[i] = [];
      for (let j = 0; j <= 2; j += 1) {
        newBoard[i][j] = board[i][j];
      }
    }

    newBoard[x][y] = currPlayer;
    setBoard(newBoard);

    if (currPlayer === "X") setCurrPlayer("O");
    else setCurrPlayer("X");
  }

  return (
    <div>
      {board.map((row, i) => {
        const keyRow = `row-${i}`;
        return (
          <div key={keyRow}>
            {row.map((square, j) => {
              const keyBtn = `btn-${i}-${j}`;
              return (
                <button
                  type="button"
                  key={keyBtn}
                  onClick={() => {
                    hClick(i, j);
                  }}
                >
                  {square}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
