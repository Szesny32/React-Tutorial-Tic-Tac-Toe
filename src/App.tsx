import { useState }  from'react';

interface SquareData {
  state: string;
  onSquareClick: () => void;
}

function Square({state, onSquareClick} : SquareData){
  return <button className="square" onClick={onSquareClick}>{state}</button>
}



interface BoardData {
  xIsNext: boolean;
  squares: Array<string>;
  onPlay: (squares: Array<string>) => void;
}

function Board({ xIsNext, squares, onPlay }: BoardData) {
  const cleanValue = '\u00A0'

  function handleClick(i: number){
    if (calculateWinner(squares) || squares[i]!==cleanValue) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext?"X" : "O";
    onPlay(nextSquares);
  }
  
  const winner = calculateWinner(squares);
  let status;
  status = winner?'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O');

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square state = {squares[0]} onSquareClick={() => handleClick(0)} />
        <Square state = {squares[1]} onSquareClick={() => handleClick(1)} />
        <Square state = {squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square state = {squares[3]} onSquareClick={() => handleClick(3)} />
        <Square state = {squares[4]} onSquareClick={() => handleClick(4)} />
        <Square state = {squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square state = {squares[6]} onSquareClick={() => handleClick(6)} />
        <Square state = {squares[7]} onSquareClick={() => handleClick(7)} />
        <Square state = {squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
   

  );
}

export default function Game(){
  const cleanValue = '\u00A0'
  const [history, setHistory] = useState([Array(9).fill(cleanValue)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: Array<string>) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number){
      setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description = (move>0)?'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  })


  return (  
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{ moves }</ol>
      </div>
    </div>
  )
}


function calculateWinner(squares:Array<string>) {
    const cleanValue = '\u00A0'
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for(let i = 0; i < lines.length; i++){
      const[a,b,c] = lines[i];
      if(squares[a]!==cleanValue && squares[a] === squares[b] && squares[b] === squares[c]){
        return squares[a];
      }
    }

    return null;
  }
  