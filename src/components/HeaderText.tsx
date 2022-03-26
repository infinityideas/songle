import React, { useEffect, useState } from 'react';
import '../styles/HeaderText.css';

import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import FontFaceObserver from "fontfaceobserver";

var headerText: any = React.createRef();

gsap.registerPlugin(TextPlugin);

interface HeaderTextProps {
  text: string,
  doAnimation: boolean,
  subText: JSX.Element
}

function HeaderText(props: HeaderTextProps) {
  const [loaded, setLoaded] = useState(false);
  let animationDuration: number;

  useEffect(() => {
   var font = new FontFaceObserver('Raleway');

   font.load().then(function () {
    setLoaded(true);
   })
  }, []);

  useEffect(() => {
    if (props.doAnimation) {
      animationDuration = 1.1;
    } else {
      animationDuration = 0;
    }

    gsap.to(headerText.current, {duration: animationDuration, text: props.text, ease: "none"})
  }, [loaded])

  let toReturn;

  if (loaded) {
    return (
        <div id="CenterText" style={{display: toReturn}}>
          <h1 ref={headerText} style={{marginTop: 0, marginBottom: 0}}>{(props.text.split(''))[0]}</h1>
          {props.subText}
        </div>
    );
  } else {
    return <div id="CenterTextHidden">Lorem</div>;
  }
}

export default HeaderText;
