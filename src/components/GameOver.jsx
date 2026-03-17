import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const GameOver = () => {
  // Get required state
  const { 
    gameStatus, 
    score, 
    setGameStatus, 
    setScore, 
    setCurrentClass, 
    setPlayerName,
    setUsedQuestionIds,
    setLifelines
  } = useContext(GameContext);

  // Actions
  const handleRestart = () => {
    // Basic reset
    setScore(0);
    setCurrentClass(1);
    setPlayerName('');
    setUsedQuestionIds([]);
    setLifelines({
      copy: { used: false },
      peek: { used: false, active: false },
      save: { used: false, available: true }
    });
    setGameStatus('start'); // Go back to Home
  };

  const isWin = gameStatus === 'won';

  return (
    <div className="screen game-over-screen">
      <h1 style={{ color: isWin ? '#4caf50' : '#f44336', fontSize: '2.5rem' }}>
        {isWin ? 'Congratulations! You Won!' : 'Game Over'}
      </h1>
      <h2 style={{ margin: '20px 0' }}>Your Final Reward: ₹{score}</h2>
      
      <p style={{ color: '#666', marginBottom: '20px' }}>
        {isWin ? 'You are smarter than a 5th grader!' : 'Better luck next time!'}
      </p>

      <button onClick={handleRestart} style={{ padding: '15px 30px', fontSize: '1.2rem' }}>
        Play Again
      </button>
    </div>
  );
};

export default GameOver;
