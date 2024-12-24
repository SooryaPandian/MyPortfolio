// components/Desktop.jsx
import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import '../styles/Desktop.css';

const Desktop = () => {
  const [windows, setWindows] = useState({
    projects: { open: false, minimized: false },
    achievements: { open: false, minimized: false },
    experience: { open: false, minimized: false },
  });
  const [time, setTime] = useState("");

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Toggle window open and close
  const toggleWindow = (name) => {
    setWindows((prev) => ({
      ...prev,
      [name]: { ...prev[name], open: true, minimized: false },
    }));
  };

  // Minimize window
  const minimizeWindow = (name) => {
    setWindows((prev) => ({
      ...prev,
      [name]: { ...prev[name], minimized: true },
    }));
  };

  // Close window
  const closeWindow = (name) => {
    setWindows((prev) => ({
      ...prev,
      [name]: { open: false, minimized: false },
    }));
  };

  // Render a window if it is open and not minimized
  const renderWindow = (name, title, content) => {
    if (!windows[name].open || windows[name].minimized) return null;

    return (
      <Rnd
        default={{
          x: 100,
          y: 100,
          width: 400,
          height: 300,
        }}
        dragHandleClassName="window-header"
        className="window"
      >
        <div>
          <div className="window-header">
            <span>{title}</span>
            <div className="window-controls">
              <button onClick={() => minimizeWindow(name)}>&ndash;</button>
              <button onClick={() => closeWindow(name)}>&times;</button>
            </div>
          </div>
          <div className="window-content">{content}</div>
        </div>
      </Rnd>
    );
  };

  return (
    <div className="desktop">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-left">Welcome, User</div>
        <div className="top-bar-right">{time}</div>
      </div>

      {/* Left Taskbar */}
      <div className="left-taskbar">
        {Object.keys(windows).map((name) => (
          <div
            key={name}
            className={`icon ${windows[name].open ? 'active' : ''}`}
            onClick={() => toggleWindow(name)}
          >
            {/* Display emojis for each window */}
            {name === 'projects' && '📁'}
            {name === 'achievements' && '🏆'}
            {name === 'experience' && '💼'}
            {windows[name].open && <span className="dot" />}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Welcome to My Portfolio</h1>
        <p>Explore and interact with the portfolio to learn more!</p>
      </div>

      {/* Render Windows */}
      {renderWindow('projects', 'Projects', <div><p>Projects content goes here...</p><h1>I can add any content here</h1></div>)}
      {renderWindow('achievements', 'Achievements', <p>Achievements content goes here...</p>)}
      {renderWindow('experience', 'Experience', <p>Experience content goes here...</p>)}
    </div>
  );
};

export default Desktop;
