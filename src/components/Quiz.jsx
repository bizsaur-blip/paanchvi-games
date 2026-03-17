import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import PrizeLadder from './PrizeLadder';

const Quiz = () => {
  // Pulling state values from GameContext
  const { 
    playerName, 
    currentClass, 
    isLoading 
  } = useContext(GameContext);

  if (isLoading) {
    return (
      <div className="screen">
        <h2>Loading next question...</h2>
      </div>
    );
  }

  return (
    <div className="screen quiz-screen" style={{ display: 'flex', gap: '20px', maxWidth: '1000px', textAlign: 'left' }}>
      
      {/* Main Game Area */}
      <div className="quiz-main" style={{ flex: 1 }}>
        <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Player: {playerName}</h2>
          <h3>Class {currentClass}</h3>
        </div>
        
        {/* Question Placeholders */}
        <div className="question-card" style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>[Placeholder] What is 2 + 2?</p>
        </div>

        {/* Options UI Placeholder */}
        <div className="options-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <button style={{ padding: '15px', backgroundColor: '#e0e0e0', color: 'black' }}>A. 3</button>
          <button style={{ padding: '15px', backgroundColor: '#e0e0e0', color: 'black' }}>B. 4</button>
          <button style={{ padding: '15px', backgroundColor: '#e0e0e0', color: 'black' }}>C. 5</button>
          <button style={{ padding: '15px', backgroundColor: '#e0e0e0', color: 'black' }}>D. 6</button>
        </div>

        {/* Lifelines Placeholder */}
        <div className="lifelines" style={{ marginTop: '30px', borderTop: '2px dashed #ccc', paddingTop: '20px', display: 'flex', gap: '10px' }}>
          <button style={{ backgroundColor: '#2196f3' }}>Copy (50-50)</button>
          <button style={{ backgroundColor: '#ff9800' }}>Peek</button>
          <button style={{ backgroundColor: '#9c27b0' }}>Save</button>
        </div>
      </div>
      
      {/* Sidebar: Prize Ladder */}
      <div className="sidebar" style={{ width: '250px', borderLeft: '2px solid #eee', paddingLeft: '20px' }}>
        <PrizeLadder />
      </div>

    </div>
  );
};

export default Quiz;
