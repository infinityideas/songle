import React from 'react';
import HeaderText from './components/HeaderText';
import Footer from './components/Footer';

import './styles/App.css';
import NavButton from './components/NavButton';

function App() {
  const subText = (
    <p id="underText">Inspired by <a href="https://heardle.app">Heardle</a>. Now with daily and practice modes (including genre selection).</p>
  )

  return (
    <div className="App">
      <HeaderText text="Songle" doAnimation={true} subText={subText}/>
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
