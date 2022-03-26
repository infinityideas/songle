import React from 'react';
import HeaderText from './components/HeaderText';
import Footer from './components/Footer';

import './styles/App.css';
import NavButton from './components/NavButton';

function App() {
  return (
    <div className="App">
      <HeaderText />
      <div id="buttonHolder">
        <NavButton route="/daily" innerText="Daily" />
        <NavButton route="/practice" innerText="Practice" />
        <NavButton route="/about" innerText="About" />
      </div>
      <Footer />
    </div>
  )
}

export default App;
