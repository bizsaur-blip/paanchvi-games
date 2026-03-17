import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const Lifelines = () => {
    const { lifelines, setLifelines } = useContext(GameContext);

    // Mock functions for lifelines in MVP (full logic would require updating context state based on currentQuestion)

    const handleCopy = () => {
        if(lifelines.copy.used) return;
        alert("Copy Used! (In a full version, this hides 2 wrong options)");
        setLifelines({...lifelines, copy: { used: true }});
    }

    const handlePeek = () => {
        if(lifelines.peek.used) return;
         alert("Peek Used! (In a full version, this reveals the answer for 3s)");
        setLifelines({...lifelines, peek: { used: true, active: true }});
    }

    const handleSave = () => {
        // Save is usually automatic, but could be toggled
        if(lifelines.save.used) return;
        alert("Save active! (Will prevent Game Over on next wrong answer)");
         // Typically handled in answer validation
    }

    return (
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '20px' }}>
            <button 
                onClick={handleCopy}
                disabled={lifelines.copy.used}
                style={{ backgroundColor: lifelines.copy.used ? '#ccc' : '#2196f3', flex: 1 }}
            >
                Copy (50:50)
            </button>
            <button 
                 onClick={handlePeek}
                 disabled={lifelines.peek.used}
                 style={{ backgroundColor: lifelines.peek.used ? '#ccc' : '#ff9800', flex: 1 }}
            >
                Peek
            </button>
            <button 
                onClick={handleSave}
                disabled={lifelines.save.used}
                style={{ backgroundColor: lifelines.save.used ? '#ccc' : '#9c27b0', flex: 1 }}
            >
                Save
            </button>
        </div>
    );
};

export default Lifelines;
