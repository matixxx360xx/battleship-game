import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import './Game.css'
import waves from '/public/waves.mp4';
import splash from '/public/splash.mp3';
import canonShot from '/public/canonShot.mp3';

export default function Game({ sfxVolume }) {
  const navigate = useNavigate();

  const [playerBoard, setPlayerBoard] = useState([])
  const [enemyBoard, setEnemyBoard] = useState([])
  const [shipsPlaced, setShipsPlaced] = useState(false);
  const [HitPlayer, setHitsPlayer] = useState([]);
  const [HitBot, setHitBot] = useState([]);
  const [flopPlayer, setFlopPlayer] = useState([]);
  const [flopBot, setFlopBot] = useState([])
  const [TimeOut, setTimeOut] = useState(false);
  const [PlayerPkt, setPlayerPkt] = useState(0);
  const [BotPkt, setBotPkt] = useState(0);
  const [showEnd, setShowEnd] = useState(true);
  const [win, setWin] = useState(null);

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


  const splashRef = useRef(new Audio(splash));
  const canonShotRef = useRef(new Audio(canonShot));
  function HitShipEnemy(i, cell) {
    if (HitPlayer.includes(i) || flopPlayer.includes(i)) {
      return;
    }
    if (cell === 1) {
      canonShotRef.current.volume = sfxVolume;
      canonShotRef.current.currentTime = 0;
      canonShotRef.current.play();
      setHitsPlayer(prev => [...prev, i]);
      setPlayerPkt(prev => prev + 1)
    } if (cell == 0) {

      splashRef.current.volume = sfxVolume;
      splashRef.current.currentTime = 0;
      splashRef.current.play();
      setFlopPlayer(prev => [...prev, i])
    }
    setTimeOut(true);
    setTimeout(() => {
      setTimeOut(false);
    }, 2000);

    setTimeout(() => {
      HitShipPlayer()
    }, 2000)
  }

  function HitShipPlayer() {
    let x;
    let y;
    let i;
    let cell;

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);

      i = x * 10 + y;
      cell = playerBoard[x][y];
    } while (HitBot.includes(i) || flopBot.includes(i));

    if (cell === 1) {
      setHitBot(prev => [...prev, i]);
      setBotPkt(prev => prev + 1)
      canonShotRef.current.volume = sfxVolume;
      canonShotRef.current.currentTime = 0;
      canonShotRef.current.play();
    } else {
      splashRef.current.volume = sfxVolume;
      splashRef.current.currentTime = 0;
      splashRef.current.play();
      setFlopBot(prev => [...prev, i]);
    }
  }

  useEffect(() => {
    if (PlayerPkt >= 17) {
      setWin(true);
      setShowEnd(true);
    } else if (BotPkt >= 17) {
      setWin(false);
      setShowEnd(true);
    }
  }, [PlayerPkt, BotPkt]);
  return (

    <div className="scene">
      <video autoPlay autoPlay loop playsInline muted width="100%" src={waves} />
      <div className='Enemy'>
        <h1>Plansza Przeciwnika</h1>
        <div className='enemyBoard' style={{ pointerEvents: TimeOut ? "none" : "auto" }} style={{ pointerEvents: showEnd ? "none" : "auto" }}>
          {enemyBoard.flat().map((cell, i) => (
            <span key={i} onClick={() => HitShipEnemy(i, cell)} style={{ background: HitPlayer.includes(i) ? "red" : flopPlayer.includes(i) ? "rgb(85, 85, 236)" : "" }}></span>
          ))}
        </div>
      </div>

      <div className='Player' style={{ pointerEvents: showEnd ? "none" : "auto" }}>
        <h1>Plansza Gracza</h1>
        <div className='playerBoard'>
          {playerBoard.flat().map((cell, i) => (
            <span key={i} style={{ background: HitBot.includes(i) ? "red" : flopBot.includes(i) ? "rgb(85, 85, 236)" : cell == 1 ? "rgb(13, 82, 13)" : "" }}>
              {cell == 1 ? <span className='chimney' style={{ width: "22px", height: "22px", background: "gray", borderRadius: '10px' }}></span> : ""}
            </span>
          ))}
        </div>
      </div>
      <div className='Result' style={{ display: showEnd ? "block" : "none" }}>
        <h1>{win ? "Wygrałeś" : "Przegrałeś"}</h1>
        <div className="bottle" onClick={() => navigate(0)} >
          <div className="bottle-fill"></div>
          <div className='bottle-text'>Zagraj Ponownie</div>
        </div>
         <div className="bottle2" onClick={() => navigate("/")} >
          <div className="bottle-fill2"></div>
          <div className='bottle-text2'>Wyjdź</div>
        </div>
      </div>
    </div>
  );
}