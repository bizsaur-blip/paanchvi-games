import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const TopicBoard = () => {
  const { playerName, score, topics, selectTopic } = useContext(GameContext);

  return (
    <div className="screen">
      <div className="header-bar">
        <h3 style={{ color: '#333' }}>Player: <span style={{ color: '#d32f2f' }}>{playerName || 'Guest'}</span></h3>
        <h3 style={{ color: '#333' }}>Score: <span style={{ color: '#388e3c' }}>₹{score}</span></h3>
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#f57f17', textShadow: '1px 1px 2px rgba(0,0,0,0.1)', marginBottom: '10px' }}>
          KYA AAP PAANCHVI<br/>PASS SE TEZ HAIN?
        </h1>
        <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.6)', padding: '5px 20px', borderRadius: '20px', fontWeight: 'bold', color: '#555', border: '1px solid rgba(0,0,0,0.1)' }}>
          Progress: <span style={{ color: '#2196f3' }}>{topics.filter(t => t.completed).length} / 10</span> completed
        </div>
      </div>

      <div className="board-grid">
        {topics.map((topic) => (
          <button 
            key={topic.id} 
            className={`topic-button ${topic.completed ? 'completed' : ''}`}
            style={{ backgroundColor: topic.completed ? '#777' : topic.rawColor }}
            onClick={() => selectTopic(topic.id)}
            disabled={topic.completed}
          >
            {topic.name}
            {topic.completed && <span style={{ marginLeft: '10px' }}>✔️</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicBoard;
