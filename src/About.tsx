import React from 'react';
import HeaderText from './components/HeaderText';
import NavButton from './components/NavButton';

import './styles/App.css';
import './styles/About.css';
import Footer from './components/Footer';

class About extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <HeaderText text="About" doAnimation={true} subText={<div></div>}/>
                <div id="buttonHolder">
                    <NavButton route="/" innerText="Go Back" />    
                </div>
                <div id="aboutHolder">
                    <p id="aboutText">Songle was created by Darius (infinityideas or googlethenumber on most social media platforms) 
                    and inspired by <a href="https://heardle.app">Heardle</a>. 
                    A current high school student, Darius spends his free time coding, 
                    reading, or spending time with his cat.<br /><br />For those interested, Songle was created through a mix of Facebook's open source web development framework, <a href="https://reactjs.org/">React</a>, Microsoft's <a href="https://www.typescriptlang.org/">TypeScript</a>, and two music APIs: Spotify and SoundCloud. The code is published on GitHub under the GNU Lesser General Public License v2.1 (plus a bunch of other packages/libraries).</p>
                </div>
                <Footer />
            </div>
        )
    }
}

export default About;