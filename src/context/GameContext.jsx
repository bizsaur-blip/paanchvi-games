import React, { createContext, useState } from 'react';
import questionsData from '../data/questions.json';

export const GameContext = createContext();

// Preload sounds for instant playback (cached in memory)
const sounds = {
  click: new Audio('/sounds/button-click.mp3'),
  correct: new Audio('/sounds/correct-answer.mp3'),
  wrong: new Audio('/sounds/wrong-answer.mp3')
};
// Configure volume upfront
Object.values(sounds).forEach(audio => { audio.volume = 0.5; });

export const GameProvider = ({ children }) => {
  // --- STATE ---
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  
  const [topics, setTopics] = useState([]); // Initialized in startGame
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  
  const [visibleOptions, setVisibleOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [answerResult, setAnswerResult] = useState(''); // 'correct', 'wrong', 'saved'
  
  const [lifelines, setLifelines] = useState({
    copy: { used: false },
    peek: { used: false, active: false },
    save: { used: false, available: true }
  });
  
  const [gameStatus, setGameStatus] = useState('start'); // start, board, question, answer, end

  // --- SOUND HOOK ---
  const playSound = (type) => {
    try {
      const audioToPlay = sounds[type];
      if (audioToPlay) {
        // Reset playback position so sound can play rapidly in succession
        audioToPlay.currentTime = 0;
        
        // Use play promise defensively (browsers block auto-play until user interaction)
        const playPromise = audioToPlay.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn(`[Audio] Blocked or missing sound: ${type}`, error);
          });
        }
      }
    } catch (e) {
      console.error(`[Audio Error] Failed to play: ${type}`, e);
    }
  };

  // --- ACTIONS ---

  // 1. startGame: Initialize game board
  const startGame = (name) => {
    playSound('click');
    setPlayerName(name);
    setScore(0);
    setUsedQuestionIds([]);
    
    // Initialize topics from JSON
    const newTopics = questionsData.map((t) => ({
      id: t.id,
      name: t.name,
      difficulty: t.difficulty,
      completed: false,
      reward: t.reward,
      rawColor: t.rawColor,
      questions: t.questions || [] // We'll adapt JSON to support arrays if needed, or fallback
    }));
    
    // Support the single question format we created in UI step:
    if (!questionsData[0].questions) {
      newTopics.forEach((t, i) => {
         t.questions = [{
            id: `q_${i}`,
            text: questionsData[i].question,
            options: questionsData[i].options,
            answer: questionsData[i].answer
         }];
      });
    }

    setTopics(newTopics);
    setLifelines({
      copy: { used: false },
      peek: { used: false, active: false },
      save: { used: false, available: true }
    });
    setGameStatus('board');
  };

  // 2. selectTopic: Pick a question for the topic
  const selectTopic = (topicId) => {
    const topicToPlay = topics.find(t => t.id === topicId);
    if (!topicToPlay || topicToPlay.completed) return;

    // Filter questions matching topic & not used
    const availableQuestions = topicToPlay.questions.filter(q => !usedQuestionIds.includes(q.id));
    
    if (availableQuestions.length === 0) {
       console.error("No questions left for this topic");
       return;
    }

    playSound('click');

    // Randomly pick 1 question
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const q = availableQuestions[randomIndex];

    setSelectedTopic(topicToPlay);
    setCurrentQuestion(q);
    setVisibleOptions([...q.options]); // Copy options
    setIsAnswerLocked(false);
    setSelectedAnswer(null);
    setAnswerResult('');
    setGameStatus('question');
  };

  // 3. submitAnswer: Evaluate selection
  const submitAnswer = (option) => {
    if (isAnswerLocked) return;
    
    setSelectedAnswer(option);
    setIsAnswerLocked(true);
    
    // Add question to used list
    setUsedQuestionIds(prev => [...prev, currentQuestion.id]);

    // Delay 500ms to show the selected yellow state before revealing correct/wrong
    setTimeout(() => {
      let currentResult = '';

      if (option === currentQuestion.answer) {
        // Correct
        setScore(prev => prev + selectedTopic.reward);
        playSound('correct');
        currentResult = 'correct';
      } else {
        playSound('wrong');
        // Wrong - check Save
        if (lifelines.save.available && !lifelines.save.used) {
          setLifelines(prev => ({ ...prev, save: { used: true, available: false } }));
          currentResult = 'saved';
        } else {
          currentResult = 'wrong';
        }
      }

      setAnswerResult(currentResult);

      // Delay another 1 second to show the green/red highlight before navigating
      setTimeout(() => {
          if (currentResult === 'wrong') {
             setGameStatus('end');
          } else {
             setGameStatus('answer');
          }
      }, 1000);
    }, 500);
  };

  // 4. returnToBoard: Complete topic & verify win condition
  const returnToBoard = () => {
    // Mark topic as completed
    const updatedTopics = topics.map(t => 
      t.id === selectedTopic.id ? { ...t, completed: true } : t
    );
    setTopics(updatedTopics);
    
    // Reset state
    setSelectedAnswer(null);
    setCurrentQuestion(null);
    setVisibleOptions([]);
    
    // Check win condition
    const allCompleted = updatedTopics.every(t => t.completed);
    if (allCompleted) {
       setGameStatus('end');
    } else {
       setGameStatus('board');
    }
  };

  // 5. useLifeline: Apply power-ups
  const useLifeline = (type) => {
    if (isAnswerLocked) return;

    if (type === 'copy' && !lifelines.copy.used) {
      // Remove 2 incorrect options
      const wrongOptions = currentQuestion.options.filter(opt => opt !== currentQuestion.answer);
      // Shuffle and pick 2 to remove
      const toRemove = wrongOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
      
      const updatedVisibleOptions = visibleOptions.map(opt => 
          toRemove.includes(opt) ? null : opt
      );
      
      setVisibleOptions(updatedVisibleOptions);
      setLifelines(prev => ({ ...prev, copy: { used: true } }));
    }

    if (type === 'peek' && !lifelines.peek.used) {
      // Temporarily reveal correct answer
      setLifelines(prev => ({ ...prev, peek: { used: true, active: true } }));
      setIsAnswerLocked(true); // Disable input during peek
      
      setTimeout(() => {
         setLifelines(prev => ({ ...prev, peek: { ...prev.peek, active: false } }));
         setIsAnswerLocked(false);
      }, 3000);
    }
  };

  // --- CONTEXT VALUE ---
  const contextValue = {
    // State
    playerName, setPlayerName,
    score, setScore,
    topics, setTopics,
    selectedTopic, setSelectedTopic,
    currentQuestion, setCurrentQuestion,
    usedQuestionIds, setUsedQuestionIds,
    visibleOptions, setVisibleOptions,
    selectedAnswer, setSelectedAnswer,
    isAnswerLocked, setIsAnswerLocked,
    answerResult, setAnswerResult,
    lifelines, setLifelines,
    gameStatus, setGameStatus,
    
    // Actions
    startGame,
    selectTopic,
    submitAnswer,
    returnToBoard,
    useLifeline
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};
