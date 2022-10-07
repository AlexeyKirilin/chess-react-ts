import React from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import {useState, useEffect} from 'react';
import {Board} from './models/Board';
import { Colors } from './models/Colors';
import {Player} from './models/Player'
import LostFigures from './components/LostFigures';
import Timer from './components/Timer'

function App() {
  const [board, setBoard] = useState(new Board());

  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer)
  },[])

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  function restart() {
    const newBoard = new Board();    //создаем новый объект Board
    newBoard.initCells()         //вызываем создание ячеек cells
    newBoard.addFigures()
    setBoard(newBoard)            //сохраняем новый объект в состояние
  }


  return (
    <div className="app">
      <Timer
        restart={restart}
        currentPlayer={currentPlayer}
      />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFigures
          title="Черные фигуры"
          figures={board.lostBlackFigures}
        />
        <LostFigures
          title="Белые фигуры"
          figures={board.lostWhiteFigures}
        />
      </div>
    </div>
  );
}

export default App;
