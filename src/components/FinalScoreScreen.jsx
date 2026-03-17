import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import Confetti from './Confetti';

const FinalScoreScreen = () => {
  const { score, setGameStatus, setScore, setTopics, setPlayerName, setSelectedAnswer, setIsAnswerLocked, setLifelines, initialTopics, topics, playerName } = useContext(GameContext);

  const completedCount = topics.filter(t => t.completed).length;
  const isWin = completedCount === 10;

  let message = "";
  if (isWin) message = "You truly are smarter than a 5th grader!";
  else if (completedCount > 7) message = "So close! Great effort!";
  else if (completedCount > 4) message = "Not bad, but you can do better. Study hard!";
  else message = "Better luck next time. Back to school for you!";

  const handleRestart = () => {
    // Reset all state
    setScore(0);
    setPlayerName('');
    setTopics(initialTopics);
    setSelectedAnswer(null);
    setIsAnswerLocked(false);
    setLifelines({
      copy: { used: false },
      peek: { used: false, active: false },
      save: { used: false, available: true }
    });
    setGameStatus('start');
  };

  return (
    <div className="screen game-over-screen">
      {isWin && <Confetti />}
      
      {isWin ? (
           <>
              <h1 style={{ color: '#4caf50', fontSize: '3.5rem', marginBottom: '10px' }}>Incredible!</h1>
              <h2 style={{ color: '#333' }}>You cleared the board!</h2>
           </>
      ) : (
           <>
              <h1 style={{ color: '#f44336', fontSize: '3.5rem', marginBottom: '10px' }}>Game Over</h1>
              <h2 style={{ color: '#333' }}>Topics Completed: <span style={{ color: '#2196f3' }}>{completedCount} / 10</span></h2>
           </>
      )}

      <p style={{ color: '#666', marginTop: '20px', fontSize: '1.2rem', fontStyle: 'italic' }}>"{message}"</p>

      <div style={{ margin: '40px auto', padding: '30px', backgroundColor: 'rgba(255,255,255,0.9)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', borderRadius: '16px', display: 'inline-block', minWidth: '400px' }}>
          <h3 style={{ margin: 0, color: '#888', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '1px' }}>Player: <span style={{ color: '#000' }}>{playerName}</span></h3>
          <h3 style={{ margin: '15px 0 0', color: '#888', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Final Winnings</h3>
          <h1 style={{ margin: '10px 0 0 0', color: '#ff9800', fontSize: '4rem', textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}>₹{score}</h1>
      </div>

      <div>
        <button onClick={handleRestart} style={{ padding: '15px 50px', fontSize: '1.3rem', backgroundColor: '#333', borderRadius: '50px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default FinalScoreScreen;
