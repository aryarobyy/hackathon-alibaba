// components/AIAvatar.tsx
import React from 'react';
import type { AIAvatarProps } from '../types/index';
// import './AIAvatar.css';

export const AIAvatar: React.FC<AIAvatarProps> = ({ isThinking }) => {
  return (
    <div className="avatar-container">
      <div className={`avatar ${isThinking ? 'thinking' : ''}`}>
        <div className="avatar-face">
          <div className="eyes">
            <div className={`eye ${isThinking ? 'closed' : ''}`}></div>
            <div className={`eye ${isThinking ? 'closed' : ''}`}></div>
          </div>
          <div className="mouth"></div>
        </div>
        {isThinking && (
          <div className="thinking-bubbles">
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
          </div>
        )}
      </div>
    </div>
  );
};
