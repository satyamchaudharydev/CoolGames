import './App.css';
import {useState} from 'react'
const boardArray = [
  ["", "", "","",""],
  ["", "", "","",""],
  ["", "", "","",""],
  ["","","","",""],
  ["","","","",""],
  ["","","","",""]

]
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
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "I",
  "H",
  "J",
  "K",
  "L",
  "Enter",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "⌫",
]
function App() {
  const [board,setBoard] = useState(boardArray)
  console.log(board)
  return (
    <div className="App">
     <div className="board">
       {board.map((row,i)=>{
          return(
            <div className="row" key={i}>
              {row.map((col,j)=>{
                return(
                  <div className="tile" key={j}>
                    {col}
                  </div>
                )
              })}
            </div>
          )
        }
        )}
     </div>
     <div className="keyboard">
        {keysData.map((key,i)=>{
          return(
            <div className="key" key={i}>
              {key}
            </div>
          )
          })
        }

     </div>
    </div>
  );
}

export default App;
