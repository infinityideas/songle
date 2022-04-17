import React from 'react';
import HeaderText from './components/HeaderText';
import NavButton from './components/NavButton';

class Practice extends React.Component {
    constructor(props: any) {
        super(props);

        
    }

    render() {
        return (
            <div>
                <HeaderText text="Practice!" doAnimation={false} subText={<h3 style={{marginTop: 0}}>Work on your song recognition skills through randomly selected songs of a genre that you pick.</h3>} isGame={true}/>
                <div style={{width: "100%", margin: "auto", textAlign: "center"}}>
                    <NavButton route="/" innerText='Go Home' />
                </div>
            </div>
        )
    }
}

export default Practice;