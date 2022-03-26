import React, { useEffect, useState } from 'react';
import '../styles/App.css';

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
    gsap.to(headerText.current, {duration: 1, text: "Songle", ease: "none"})
  }, [loaded])

  let toReturn;

  if (loaded) {
    return (
      <div className="App">
        <div id="CenterText" style={{display: toReturn}}>
          <h1 ref={headerText} style={{marginTop: 0}}></h1>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default HeaderText;
