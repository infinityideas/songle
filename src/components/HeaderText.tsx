import React, { useEffect, useState } from 'react';
import '../styles/HeaderText.css';

import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import FontFaceObserver from "fontfaceobserver";

var headerText: any = React.createRef();

gsap.registerPlugin(TextPlugin);

function HeaderText() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
   var font = new FontFaceObserver('Raleway');

   font.load().then(function () {
    setLoaded(true);
   })
  }, []);

  useEffect(() => {
    gsap.to(headerText.current, {duration: 1.1, text: "Songle", ease: "none"})
  }, [loaded])

  let toReturn;

  if (loaded) {
    return (
        <div id="CenterText" style={{display: toReturn}}>
          <h1 ref={headerText} style={{marginTop: 0, marginBottom: 0}}>S</h1>
          <p id="underText">Inspired by <a href="https://heardle.app">Heardle</a>. Now with daily and practice modes (including genre selection).</p>
        </div>
    );
  } else {
    return <div id="CenterTextHidden">Lorem</div>;
  }
}

export default HeaderText;
