import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [currPlayer, setCurrPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  // WiP: This function must set the winning player state
  function checkWinner() {
    const combinations = [
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];

    for (const combo of combinations) {
      if (combo[0] && combo[0] === combo[1] && combo[1] === combo[2]) {
        setWinner(combo[0]);
        return;
      }
    }
  }

  function hClick(x, y) {
    if (board[x][y]) return;

    // *Ugly code, committed to show why that's a crappy idea*
    // We create a duplicate of our "board" state by copying it's values one by one... and the code would be different if we had objects, or functions, or...
    // const newBoard = [];
    // for (let i = 0; i <= 2; i += 1) {
    //   newBoard[i] = [];
    //   for (let j = 0; j <= 2; j += 1) {
    //     newBoard[i][j] = board[i][j];
    //   }
    // }

    // Much better!
    // We create our "newBoard" by
    // - generating a string from the JS array (feasible with any JS data type)
    // - generating a JS value from a string (that's called "parsing" and it's available in most languages)
    // This code works, whatever the structure of our original state ! <3
    const newBoard = JSON.parse(JSON.stringify(board));

    newBoard[x][y] = currPlayer;
    setBoard(newBoard);

    if (currPlayer === "X") setCurrPlayer("O");
    else setCurrPlayer("X");
  }

  // Everytime the "board" state changes, we check for a winner
  useEffect(checkWinner, [board]);

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
                  disabled={winner}
                >
                  {square}
                </button>
              );
            })}
          </div>
        );
      })}
      {winner ? (
        <p>{winner} has won !</p>
      ) : (
        <p>Waiting for {currPlayer} to play...</p>
      )}
    </div>
  );
}

export default App;
