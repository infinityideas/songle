import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';

import App from './App';
import About from './About';
import ChallengeGame from './ChallengeGame';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Practice from './Practice';
import Daily from './Daily';
import Challenge from './Challenge';
import NotFound from './NotFound';
import PracticeGenre from './PracticeGenre';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/practice/:genreId" element={<PracticeGenre />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/challengegame/:gameId" element={<ChallengeGame />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);