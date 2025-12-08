import React, { useState, useEffect } from 'react';
import '../styles/TypewriterBox.css';

const TypewriterBox = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [text]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="typewriter-box">
      <span className="typewriter-text">
        {displayedText}
      </span>
      <span className={`typewriter-cursor ${showCursor ? 'active' : ''}`}>|</span>
    </div>
  );
};

export default TypewriterBox;
