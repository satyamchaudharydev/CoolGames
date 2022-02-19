import "./App.css";
import { useState, useEffect } from "react";
const boardArray = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];
const keysData = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "",
  "Enter",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "⌫",
];
const wordle = "Super";
const tileLength = 5;
const rowLength = 6;
let currentRow = 0;
let currentTile = 0;
function App() {
  const [board, setBoard] = useState(boardArray);
  const [active, setActive] = useState([]);
  const [correctTiles, setCorrectTiles] = useState([]);
  const [wrongTiles, setWrongTiles] = useState([]);
  const [wrongPlacedTiles, setWrongPlacedTiles] = useState([]);

  function addLetter(letter) {
    console.log(setActive((prev) => [...prev, letter]));
    setActive((prev) => [...prev, letter]);
    if (currentTile < tileLength) {
      let newBoard = [...board];
      newBoard[currentRow][currentTile] = letter;
      setBoard(newBoard);
      currentTile++;
    }
  }
  function deleteLetter() {
    if (currentTile > 0) {
      currentTile--;
      let newBoard = [...board];
      newBoard[currentRow][currentTile] = "";
      setBoard(newBoard);
    }
  }
  function checkRow(key) {
    if (currentTile === tileLength) {
      board[currentRow].forEach((tile, index) => {
        if (tile.toUpperCase() == wordle[index].toUpperCase()) {
          setCorrectTiles((prev) => [...prev, tile]);
        } else if (wordle.toUpperCase().includes(tile.toUpperCase())) {
          setWrongPlacedTiles((prev) => [...prev, tile]);
        } else {
          setWrongTiles((prev) => [...prev, tile]);
        }
      });
      currentRow++;
      setActive([]);
      currentTile = 0;
      return;
    }
  }
  useEffect(() => {
    window.addEventListener("keypress", (e) => {
      if (keysData.includes(e.key.toUpperCase())) {
        addLetter(e.key);
      } else if (e.key === "Enter") {
        checkRow(e.key);
      } else if (e.key === "Backspace") {
        deleteLetter();
      }
    });
  }, [window]);

  function addColor(text) {
    if (correctTiles.includes(text)) {
      return "correct";
    }
    if (wrongPlacedTiles.includes(text)) {
      return "wrong-location";
    }
    if (wrongTiles.includes(text)) {
      return "wrong";
    }
  }
  return (
    <>
      <div className="board">
        {board.map((row, i) => {
          {
            return row.map((col, j) => {
              return (
                <div
                  className={`tile ${
                    active.includes(currentRow === i && col) && "active"
                  }` + ` ${addColor(col)}`}
                  key={j}
                >
                  {col}
                </div>
              );
            });
          }
        })}
      </div>
      <div className="keyboard">
        {keysData.map((key, i) => {
          let handle = addLetter;
          let className = key;
          if (key === "⌫") {
            className = "delete";
            handle = deleteLetter;
          }
          if (key === "") {
            className = "space";
          }
          if (key === "Enter") {
            className = "enter";
            handle = checkRow;
          }
          return (
            <button
              className={`key ${className}`}
              key={i}
              onClick={() => handle(key)}
            >
              {key}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default App;
