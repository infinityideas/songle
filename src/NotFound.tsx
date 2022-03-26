import React from 'react';
import Footer from './components/Footer';
import HeaderText from './components/HeaderText';
import NavButton from './components/NavButton';

import './styles/App.css'

class NotFound extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        const subText = (
            <p style={{fontFamily: 'Helvetica'}}>That page was not found. Check the URL address for a mistake or ask the person that gave you this link why they gave you an unusable link.</p>
        )

        return (
            <div>
                <HeaderText text="404" doAnimation={false} subText={subText} isGame={false} />
                <div id="buttonHolder">
                    <NavButton route="/" innerText='Go Home' />    
                </div>
                <Footer />
            </div>
        )
    }
}

export default NotFound;