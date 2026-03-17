import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const PrizeLadder = () => {
  // Get current state to highlight active row
  const { currentClass } = useContext(GameContext);

  // Structured prize ladder as per MVP requirements
  // We reverse the array here to display highest class at the top
  const ladder = [
    { level: 5, amount: "₹10,000" },
    { level: 4, amount: "₹5,000" },
    { level: 3, amount: "₹1,000" },
    { level: 2, amount: "₹500" },
    { level: 1, amount: "₹100" }
  ];

  return (
    <div className="prize-ladder">
      <h3 style={{ marginBottom: '15px' }}>Prize Ladder</h3>
      
      <ul style={{ listStyleType: 'none' }}>
        {ladder.map((item) => {
          const isActive = currentClass === item.level;
          const isPassed = currentClass > item.level;

          return (
            <li 
              key={item.level}
              style={{ 
                padding: '12px', 
                margin: '8px 0',
                // Styling active vs passed vs upcoming
                backgroundColor: isActive ? '#4caf50' : (isPassed ? '#e8f5e9' : '#f5f5f5'),
                color: isActive ? 'white' : (isPassed ? '#4caf50' : '#888'),
                borderRadius: '8px',
                fontWeight: isActive ? 'bold' : 'normal',
                boxShadow: isActive ? '0 2px 8px rgba(76,175,80,0.4)' : 'none',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span>Class {item.level}</span>
              <span>{item.amount}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PrizeLadder;
