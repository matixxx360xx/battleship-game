import { useState, useEffect } from 'react'
import './Game.css'
import waves from '/public/waves.mp4';

export default function Game() {
  const [playerBoard, setPlayerBoard] = useState([])
  const [enemyBoard, setEnemyBoard] = useState([])

  const [ship, setShip] = useState([
    { name: "carrier", size: 5 },
    { name: "battleship", size: 4 },
    { name: "cruiser", size: 3 },
    { name: "destroyer", size: 3 },
    { name: "submarine", size: 2 }
  ])

  function PlayerBoard() {
    let board = [];

    for (let i = 0; i < 10; i++) {
      let row = [];

      for (let j = 0; j < 10; j++) {
        row.push(0);
      }

      board.push(row);
    }

    setPlayerBoard(board);
  }

  function EnemyBoard() {
    let board = [];

    for (let i = 0; i < 10; i++) {
      let row = [];

      for (let j = 0; j < 10; j++) {
        row.push(0);
      }

      board.push(row);
    }

    setEnemyBoard(board);
  }

  function placeShips() {
    let coordinate = 0;
    let x = 0;
    let y = 0;
    for(let i = 0; i < 5; i++){
        coordinate = Math.floor(Math.random() * 2) + 1;
        //vertically
        if(coordinate%2 == 0){
          
        }
        //horizontally
        else {
          
        }
    }
    console.log(playerBoard)
  }placeShips()

  useEffect(() => {

    PlayerBoard();
    EnemyBoard();
  }, []);

  return (

    <div className="scene">
      <video autoPlay autoPlay loop playsInline muted width="100%" src={waves} />
      <div className='Enemy'>
        <h1>Plansza Przeciwnika</h1>
        <div className='enemyBoard'>
          {enemyBoard.flat().map((cell, i) => (
            <span key={i}></span>
          ))}
        </div>
      </div>

      <div className='Player'>
        <h1>Plansza Gracza</h1>
        <div className='playerBoard'>
          {playerBoard.flat().map((cell, i) => (
            <span key={i}></span>
          ))}
        </div>
      </div>
    </div>
  );
}