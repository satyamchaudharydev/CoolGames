import "./App.css";
import { useState, useEffect } from "react";

const boardArray = [
  [
    { text: "", state: "" },
    { text: "", state: "" },
    { text: "", state: "" },
    { text: "", state: "" },
    { text: "", state: "" },
  ],
  [
    { text: "", state: "" },
    { text: "", state: "" },
    { text: "", state: "" },
    { text: "", state: "" },
    { text: "", state: "" },
  ],
  [
    { text: "", state: "" },
    { text: "", state: "" },
    { text: "", state: "" },
    { text: "", state: "" },
    { text: "", state: "" },
  ],
  [
    { text: "", state: "" },
    { text: "", state: "" },
    { text: "", state: "" },
    { text: "", state: "" },
    { text: "", state: "" },
  ],
  [
    { text: "", state: "" },
    { text: "", state: "" },
    { text: "", state: "" },
    { text: "", state: "" },
    { text: "", state: "" },
  ],
  [
    { text: "", state: "" },
    { text: "", state: "" },
    { text: "", state: "" },
    { text: "", state: "" },
    { text: "", state: "" },
  ],
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
  const [end, setEnded] = useState(false);
  

  function addLetter(letter) {
    console.log(setActive((prev) => [...prev, letter]));
    setActive((prev) => [...prev, letter]);
    if (currentTile < tileLength) {
      let newBoard = [...board];
      newBoard[currentRow][currentTile].text = letter;
      setBoard(newBoard);
      currentTile++;
    }
  }
  function deleteLetter() {
    if (currentTile > 0) {
      currentTile--;
      let newBoard = [...board];
      newBoard[currentRow][currentTile].text = "";
      setBoard(newBoard);
    }
  }

  function checkRow(key) {
  
    if (currentTile === tileLength) {
      board[currentRow].forEach((tile, index) => {
        setTimeout(() => {
          
          if (tile.text.toUpperCase() == wordle[index].toUpperCase()) {
            let newBoard = [...board];
            newBoard[currentRow][index].state = "correct flip";
            setBoard(newBoard);
          } else if (wordle.toUpperCase().includes(tile.text.toUpperCase())) {
            let newBoard = [...board];
            newBoard[currentRow][index].state = "wrong-location flip";
            setBoard(newBoard);
          } else {
            let newBoard = [...board];
            newBoard[currentRow][index].state = "wrong flip";
            setBoard(newBoard);
          }
          
        }, (500 * index) / 2);
      });
    }
  }
  useEffect(() => {
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach((tile) => {
      tile.addEventListener("transitionend", (e) => {
        tile.classList.remove("flip");
      }
    )});
  },[checkRow]);

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

  }, []);

  return (
    <>
      <div className="board">
        {board.map((row, i) => {
          {
            return row.map((col, j) => {
              return (
                <div
                  className={
                    `tile ${
                      active.includes(currentRow === i && col.text) && "active"
                    }` + ` ${col.state}`
                  }
                  key={j}
                >
                  {col.text}
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
