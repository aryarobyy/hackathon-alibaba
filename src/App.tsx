// App.tsx - Main Component
import React, { useState, useEffect } from 'react';
import './App.css'
import { MoodAssistantModal } from './components/MoodAssistantModal';
import { useIdleTimer } from './hooks/useIdleTimer';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const { isIdle, resetTimer } = useIdleTimer(10000);

  useEffect(() => {
    if (isIdle && !isModalOpen && userInteracted) {
      setIsModalOpen(true);
    }
  }, [isIdle, isModalOpen, userInteracted]);

  const handleUserInteraction = React.useCallback(() => {
    if (!userInteracted) {
      setUserInteracted(true);
    }
    resetTimer();
  }, [userInteracted, resetTimer]);

  useEffect(() => {
    const events = ['click', 'scroll', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [userInteracted, handleUserInteraction]);

  const foodItems = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `Food Item ${i + 1}`,
    description: 'Delicious meal description...'
  }));

  return (
    <div className="app" onClick={handleUserInteraction}>
      <div className="food-listing-container">
        <header className="header">
          <h1>Food Recommendations</h1>
          <p>Discover delicious meals based on your mood!</p>
        </header>
        
        <div className="food-grid">
          {foodItems.map((item) => (
            <div key={item.id} className="food-card">
              <div className="food-image-placeholder"></div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        
        <div className="idle-status">
          {userInteracted && (
            <p>
              Status: {isIdle ? "Idle - Modal will appear" : "User is active"}
            </p>
          )}
        </div>
      </div>

      <MoodAssistantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default App;