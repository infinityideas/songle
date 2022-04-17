import React from 'react';
import Footer from './components/Footer';
import HeaderText from './components/HeaderText';
import NavButton from './components/NavButton';
import playlistdict, { playlistnames } from './scripts/PracticePlaylistDict';

import './styles/NavButton.css';
import './styles/Practice.css';

const axios = require('axios');

interface PracticeState {
    chosenGenre: boolean
}

class Practice extends React.Component<{}, PracticeState> {
    private toReturn: any;
    private selectEl: JSX.Element;

    constructor(props: any) {
        super(props);

        this.state = {
            chosenGenre: false
        }
        
        this.generateOptions = this.generateOptions.bind(this);

        this.toReturn = <div></div>;
        this.selectEl = <select className="PracticeSelect"></select>
    }

    generateOptions() {
        var selectOptions = [];

        selectOptions.push(React.createElement("option", {key: "option"+0}, ["Choose a genre"]))

        for (var i=0; i<playlistnames.length; i++) {
            selectOptions.push(React.createElement("option", {key:"option"+(i+1)}, [playlistnames[i]]));
        }

        this.selectEl = React.createElement("select", {className: "PracticeSelect"}, selectOptions);
    }

    render() {
        if (!this.state.chosenGenre) {
            this.generateOptions();

            this.toReturn = (
                <div style={{width: "100%", margin: "auto", height: "100px", marginTop: "10px", color: "white"}}>
                    <div style={{width: "45%", display: "inline-block", height: "100%"}}>
                        {this.selectEl}
                    </div>
                    <div style={{width: "10%", display: "inline-block", height: "100%"}}>
                        <h1>Or</h1>
                    </div>
                    <div style={{width: "45%", display: "inline-block", height: "100%"}}>
                        <button className="NavButton"><p className="innerText">Random</p></button>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <HeaderText text="Practice!" doAnimation={false} subText={<h3 style={{marginTop: 0}}>Work on your song recognition skills through randomly selected songs of a genre that you pick.</h3>} isGame={true}/>
                <div style={{width: "100%", margin: "auto", textAlign: "center"}}>
                    <NavButton route="/" innerText='Go Home' />
                    <br />
                    {this.toReturn}
                </div>
                <Footer />
            </div>
        )
    }
}

export default Practice;