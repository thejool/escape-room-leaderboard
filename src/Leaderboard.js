import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import useInterval from './useInterval'

const Leaderboard = ({challenges}) => {
  const [leaderboard, setLeaderboard] = useState([])
  const fetchLeaderboard = useCallback(() => {
    fetch('https://ksjb83hyh7.execute-api.eu-west-1.amazonaws.com/knowit/competitions/')
    .then(res => res.json())
    .then(res => {
      return res.map(item => {
        const results = []
        challenges.forEach((challenge) => {
          if(item[challenge]) {
            results.push(challenge)
          }
        })
        return {
          name: item.teamName,
          scores: results
        }
      })
    })
    .then(res => {
      setLeaderboard(res)
    })
  }, [challenges])

  useEffect(() => {
    if(leaderboard.length === 0) {
      fetchLeaderboard()
    }
  }, [fetchLeaderboard, leaderboard])

  useEffect(() => {
    console.log(leaderboard)
  }, [leaderboard])

  useInterval(() => {
    fetchLeaderboard()
  }, 5000);

  return (
    <div>
      {leaderboard && leaderboard.map(({
        name,
        scores,
      }) => (
        <div className="leaderboard-score">
          <div className="leaderboard-score__name">
            {name}
          </div>
          <div className="leaderboard-score__scores">
            <div className="leaderboard-score__scores__score" style={{width: (scores.length === 0 ? 0.05 : (scores.length / challenges.length)) * 100 + '%'}}>
              {Math.ceil((scores.length / challenges.length) * 100) + '%'}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
 

export default Leaderboard