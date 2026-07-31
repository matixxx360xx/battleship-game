import { useState, useEffect } from 'react'
import './Game.css'
import waves from '/public/waves.mp4';

export default function Game() {
  const [playerBoard, setPlayerBoard] = useState([])
  const [enemyBoard, setEnemyBoard] = useState([])
  const [shipsPlaced, setShipsPlaced] = useState(false);

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

  function placeShipsPlayer() {
    let coordinate = 0;
    let x = 0;
    let y = 0;

    for (let i = 0; i < 5; i++) {
      coordinate = Math.floor(Math.random() * 2);

      // vertical 
      if (coordinate === 0) {

        do {
          x = Math.floor(Math.random() * 10);
          y = Math.floor(Math.random() * 10);

        } while (x + ship[i].size > 10 || !canPlaceShipPlayer(x, y, ship[i].size, coordinate));


        for (let j = 0; j < ship[i].size; j++) {
          playerBoard[x + j][y] = 1;
        }

      }
      // horizontal 
      else {
        do {
          x = Math.floor(Math.random() * 10);
          y = Math.floor(Math.random() * 10);

        } while (y + ship[i].size > 10 || !canPlaceShipPlayer(x, y, ship[i].size, coordinate));

        for (let j = 0; j < ship[i].size; j++) {
          playerBoard[x][y + j] = 1;
        }

      }
    }

    setPlayerBoard([...playerBoard]);
  }


  function canPlaceShipPlayer(x, y, size, coordinate) {

    for (let j = 0; j < size; j++) {

      if (coordinate === 0) {
        // pionowo
        if (playerBoard[x + j][y] !== 0) {
          return false;
        }

        if (!checkAroundPlayer(x + j, y)) {
          return false;
        }

      } else {
        // poziomo
        if (playerBoard[x][y + j] !== 0) {
          return false;
        }

        if (!checkAroundPlayer(x, y + j)) {
          return false;
        }
      }

    }

    return true;
  }

  function checkAroundPlayer(x, y) {

    if (x > 0 && playerBoard[x - 1][y] === 1) {
      return false;
    }

    if (x < 9 && playerBoard[x + 1][y] === 1) {
      return false;
    }

    if (y > 0 && playerBoard[x][y - 1] === 1) {
      return false;
    }

    if (y < 9 && playerBoard[x][y + 1] === 1) {
      return false;
    }

    return true;
  }


  function placeShipsEnemy() {
    let coordinate = 0;
    let x = 0;
    let y = 0;

    for (let i = 0; i < 5; i++) {
      coordinate = Math.floor(Math.random() * 2);

      if (coordinate === 0) {

        do {
          x = Math.floor(Math.random() * 10);
          y = Math.floor(Math.random() * 10);

        } while (
          x + ship[i].size > 10 ||
          !canPlaceShipEnemy(x, y, ship[i].size, coordinate)
        );

        for (let j = 0; j < ship[i].size; j++) {
          enemyBoard[x + j][y] = 1;
        }

      } else {

        do {
          x = Math.floor(Math.random() * 10);
          y = Math.floor(Math.random() * 10);

        } while (
          y + ship[i].size > 10 ||
          !canPlaceShipEnemy(x, y, ship[i].size, coordinate)
        );

        for (let j = 0; j < ship[i].size; j++) {
          enemyBoard[x][y + j] = 1;
        }
      }
    }

    setEnemyBoard([...enemyBoard]);
  }



  function canPlaceShipEnemy(x, y, size, coordinate) {

    for (let j = 0; j < size; j++) {

      if (coordinate === 0) {

        if (enemyBoard[x + j][y] !== 0) {
          return false;
        }

        if (!checkAroundEnemy(x + j, y)) {
          return false;
        }

      } else {

        if (enemyBoard[x][y + j] !== 0) {
          return false;
        }

        if (!checkAroundEnemy(x, y + j)) {
          return false;
        }

      }
    }

    return true;
  }


  function checkAroundEnemy(x, y) {

    if (x > 0 && enemyBoard[x - 1][y] === 1) {
      return false;
    }

    if (x < 9 && enemyBoard[x + 1][y] === 1) {
      return false;
    }

    if (y > 0 && enemyBoard[x][y - 1] === 1) {
      return false;
    }

    if (y < 9 && enemyBoard[x][y + 1] === 1) {
      return false;
    }

    return true;
  }


  useEffect(() => {
    PlayerBoard();
    EnemyBoard();
  }, []);

  useEffect(() => {
    if (playerBoard.length === 10 && enemyBoard.length === 10 && !shipsPlaced) {
      placeShipsPlayer();
      placeShipsEnemy();
      setShipsPlaced(true);
    }
  }, [playerBoard, enemyBoard]);

  const [Hit, setHits] = useState([]);
  function HitShipEnemy(i, cell) {
    if (cell === 1) {
      setHits(prev => [...prev, i]);

    }
  }

  return (

    <div className="scene">
      <video autoPlay autoPlay loop playsInline muted width="100%" src={waves} />
      <div className='Enemy'>
        <h1>Plansza Przeciwnika</h1>
        <div className='enemyBoard'>
          {enemyBoard.flat().map((cell, i) => (
            <span key={i} onClick={() => HitShipEnemy(i, cell)} style={{ background: Hit.includes(i) ? "red" : "" }}></span>
          ))}
        </div>
      </div>

      <div className='Player'>
        <h1>Plansza Gracza</h1>
        <div className='playerBoard'>
          {playerBoard.flat().map((cell, i) => (
            <span key={i} style={{ background: cell == 1 ? "rgb(13, 82, 13)" : "" }}>
              {cell == 1 ? <span className='chimney' style={{ width: "22px", height: "22px", background: "gray", borderRadius: '10px' }}></span> : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}