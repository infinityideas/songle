import React from 'react';
import Footer from './components/Footer';
import HeaderText from './components/HeaderText';
import NavButton from './components/NavButton';
import playlistdict, { playlistnames } from './scripts/PracticePlaylistDict';
import config from './scripts/Config';

import './styles/NavButton.css';
import './styles/Practice.css';

const axios = require('axios');

interface PracticeState {
    chosenGenre: boolean,
    chosenGenreName: string,
    chosenGenreId: number,
}

class Practice extends React.Component<{}, PracticeState> {
    private toReturn: any;
    private selectEl: JSX.Element;
    private selectRef: any;

    constructor(props: any) {
        super(props);

        this.state = {
            chosenGenre: false,
            chosenGenreName: "",
            chosenGenreId: 0,
        }
        
        this.generateOptions = this.generateOptions.bind(this);
        this.selectgenre  = this.selectgenre.bind(this);
        this.chooseRandom = this.chooseRandom.bind(this);

        this.toReturn = <div></div>;
        this.selectRef = React.createRef();
        this.selectEl = <select className="PracticeSelect"></select>
    }

    selectgenre(e: any) {
        window.location.replace(config.songleAddress+"/practice/"+playlistdict[this.selectRef.current.selectedIndex-1]);
    }

    generateOptions() {
        var selectOptions = [];

        selectOptions.push(React.createElement("option", {key: "option"+0}, ["Choose a genre"]))

        for (var i=0; i<playlistnames.length; i++) {
            selectOptions.push(React.createElement("option", {key:"option"+(i+1)}, [playlistnames[i]]));
        }

        this.selectEl = React.createElement("select", {className: "PracticeSelect", onChange: this.selectgenre, ref: this.selectRef}, selectOptions);
    }

    chooseRandom() {
        window.location.replace(config.songleAddress+"/practice/"+playlistdict[Math.floor(Math.random() * playlistdict.length)]);
    }

    render() {
        if (!this.state.chosenGenre) {
            this.generateOptions();

            this.toReturn = (
                <div id="choiceHolder">
                    <div className="holder1">
                        {this.selectEl}
                    </div>
                    <div className="holder2">
                        <h1>Or</h1>
                    </div>
                    <div className="holder3">
                        <button className="NavButton" style={{width: "150px"}} onClick={this.chooseRandom}><p className="innerText">Random genre</p></button>
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