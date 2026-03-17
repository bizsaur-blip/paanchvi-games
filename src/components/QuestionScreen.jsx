import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import Lifelines from './Lifelines'; // Ensure this matches the implementation below!

const QuestionScreen = () => {
  const { 
    selectedTopic, 
    currentQuestion, 
    submitAnswer,
    visibleOptions,
    selectedAnswer,
    isAnswerLocked,
    lifelines,
    useLifeline,
    answerResult
  } = useContext(GameContext);

  return (
    <div className="screen">
      <div className="header-bar">
        <h3 style={{ color: '#333' }}>{selectedTopic?.name || "Topic Title"}</h3>
      </div>

      <div style={{ padding: '20px', marginBottom: '20px' }}>
        {/* If Peek lifeline is active, display the answer overlay */}
        {lifelines.peek.active ? (
          <div style={{ padding: '20px', backgroundColor: '#fff9c4', border: '3px solid #fbc02d', borderRadius: '12px', fontSize: '1.5rem', color: '#f57f17', fontWeight: 'bold' }}>
             Peek Active! Answer: {currentQuestion?.answer}
          </div>
        ) : (
          <h2 style={{ fontSize: '2.2rem', color: '#222' }}>{currentQuestion?.text || "Question Text Goes Here?"}</h2>
        )}
      </div>

      <Lifelines useLifeline={useLifeline} lifelines={lifelines} />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) minmax(200px, 1fr)', gap: '15px', maxWidth: '700px', margin: '30px auto 0' }}>
        {visibleOptions.map((option, idx) => {
          if (option === null) {
              return <div key={idx} style={{ padding: '20px', visibility: 'hidden' }}>Hidden</div>;
          }

          const isSelected = selectedAnswer === option;
          const isRevealed = answerResult !== '';

          let bgColor = '#fff';
          let textColor = '#333';
          let borderColor = 'rgba(0,0,0,0.1)';

          if (isRevealed) {
            if (option === currentQuestion.answer) {
              bgColor = '#4caf50'; // Correct - Green
              textColor = '#fff';
              borderColor = '#388e3c';
            } else if (isSelected) {
              bgColor = '#f44336'; // Wrong select - Red
              textColor = '#fff';
              borderColor = '#d32f2f';
            } else {
              bgColor = '#f5f5f5'; // Unselected
              textColor = '#ccc';
            }
          } else if (isSelected) {
            bgColor = '#ffeb3b'; // Initial selected - Yellow
            textColor = '#000';
            borderColor = '#fbc02d';
          }

          return (
            <button 
              key={idx}
              disabled={isAnswerLocked}
              onClick={() => submitAnswer(option)}
              style={{ 
                backgroundColor: bgColor, 
                color: textColor, 
                padding: '20px', 
                fontSize: '1.2rem',
                borderRadius: '8px',
                border: `3px solid ${borderColor}`,
                textAlign: 'center',
                transform: (isSelected && !isRevealed) ? 'scale(1.05)' : 'none',
                opacity: (isRevealed && option !== currentQuestion.answer && !isSelected) ? 0.6 : 1
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionScreen;
