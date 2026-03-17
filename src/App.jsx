import React, { useContext } from 'react';
import { GameContext } from './context/GameContext';
import Home from './components/Home';
import TopicBoard from './components/TopicBoard';
import QuestionScreen from './components/QuestionScreen';
import AnswerScreen from './components/AnswerScreen';
import './App.css';

function App() {
  const { gameStatus } = useContext(GameContext);

  return (
    <div className="app-container">
      {/* Background ? Logo */}
      <div className="watermark">?</div>
      
      {/* Small top right brand badge shown on all non-home screens */}
      {gameStatus !== 'start' && (
        <div className="logo-overlay">
          <div className="slash"></div>
          <div className="logo-text">
            KYA AAP<br/>PAANCHVI PASS<br/>SE TEZ HAIN?
          </div>
        </div>
      )}

      {/* Basic routing based on GameStatus state */}
      {gameStatus === 'start' && <Home />}
      {gameStatus === 'board' && <TopicBoard />}
      {gameStatus === 'question' && <QuestionScreen />}
      {gameStatus === 'answer' && <AnswerScreen />}
    </div>
  );
}

export default App;
