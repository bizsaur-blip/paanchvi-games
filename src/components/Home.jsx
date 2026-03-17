import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const Home = () => {
  const { playerName, setPlayerName, startGame } = useContext(GameContext);

  return (
    <div className="screen" style={{ marginTop: '50px' }}>
      <h1 style={{ fontSize: '3.5rem', color: '#f57f17', textShadow: '2px 2px 4px rgba(0,0,0,0.1)', marginBottom: '50px' }}>
        KYA AAP<br/>PAANCHVI PASS SE TEZ HAIN?
      </h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <input 
          type="text" 
          placeholder="Enter Player Name" 
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          style={{ width: '320px', textAlign: 'center', padding: '15px' }}
        />
        <button 
          onClick={() => startGame(playerName)}
          style={{ padding: '15px 50px', fontSize: '1.5rem', backgroundColor: '#388e3c', borderRadius: '50px' }}
        >
          START GAME
        </button>
      </div>
    </div>
  );
};
export default Home;
