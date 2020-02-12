import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Countdown from 'react-countdown';
import Leaderboard from './Leaderboard';
import WinnerScreen from './WinnerScreen'

const startTime = new Date()
const App = () => {
  const [winner, setWinner] = useState()
  const [hideWinnerScreen, setHideWinnerScreen] = useState(false)
  const challenges = [
    'Snake',
    'Fizz Buzz',
    'Swagger',
    'Paint',
    'QR KOD',
    'Blue Screen',
    'Question',
    'Tower',
  ]

  const Finished = () => (
    <div className="overlay">
      <div className="gameover">
        <h1>Game over!!</h1>
      </div>
    </div>
  )

  const renderer = ({ minutes, seconds, completed }) => {
    let secs = seconds > 9 ? seconds : '0' + seconds
    let mins = minutes > 9 ? minutes : '0' + minutes

    if (completed) {
      // Render a completed state
      return <Finished />;
    } else {
      // Render a countdown
      return <span className="countdown">{mins}:{secs}</span>;
    }
  };

  if(winner && !hideWinnerScreen) {
    return <WinnerScreen onClick={() => setHideWinnerScreen(true)} teamName={winner} startTime={startTime} />
  }

  return (
    <div className="App">

      <div className="leaderboard">
        <div className="leaderboard-title">
          <h1>Leaderboard</h1>

          <Countdown
            date={startTime.getTime() + 3600000}
            renderer={renderer}
          />
        </div>
        
        <Leaderboard setWinner={setWinner} challenges={challenges} />
      </div>
    </div>
  );
}

export default App;
