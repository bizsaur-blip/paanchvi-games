import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const AnswerScreen = () => {
  const { currentQuestion, selectedAnswer, answerResult, returnToBoard } = useContext(GameContext);

  const isCorrect = answerResult === 'correct';
  const isSaved = answerResult === 'saved';

  return (
    <div className="screen">
      <h2 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '40px' }}>Result</h2>
      
      <div style={{ 
        padding: '30px', 
        backgroundColor: isCorrect ? '#e8f5e9' : (isSaved ? '#fff3e0' : '#ffebee'), 
        border: `3px solid ${isCorrect ? '#4caf50' : (isSaved ? '#ff9800' : '#f44336')}`,
        borderRadius: '12px', 
        marginBottom: '40px' 
      }}>
        {isCorrect && <h1 style={{ color: '#4caf50', fontSize: '3rem', margin: '10px 0' }}>Correct!</h1>}
        {isSaved && <h1 style={{ color: '#ff9800', fontSize: '3rem', margin: '10px 0' }}>Saved!</h1>}
        {!isCorrect && !isSaved && <h1 style={{ color: '#f44336', fontSize: '3rem', margin: '10px 0' }}>Wrong!</h1>}

        {isSaved && <h3 style={{ color: '#ef6c00', margin: '10px 0' }}>Your 'Save' lifeline protected you.</h3>}

        <h3 style={{ marginTop: '20px' }}>The correct answer is:</h3>
        <h2 style={{ color: '#333', fontSize: '2rem', margin: '10px 0' }}>{currentQuestion?.answer || 'Answer'}</h2>
      </div>

      <button 
        onClick={returnToBoard}
        style={{ padding: '15px 40px', fontSize: '1.2rem', backgroundColor: '#388e3c' }}
      >
        Continue
      </button>
    </div>
  );
};

export default AnswerScreen;
