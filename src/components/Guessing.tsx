import React from 'react';
import MusicSearch from './MusicSearch';
import MusicResults from './MusicResults';

import '../styles/Game.css';
import '../styles/Guessing.css';
import '../styles/NavButton.css';
import CopyShareButton from './CopyShareButton';
import  config  from '../scripts/Config';

interface GuessingProps {
    currentStage: string,
    prevGuesses: Array<any>,
    songName: string,
    songArtist: string,
    onChoose: any,
    gameId: any,
    shareText: any,
}

interface GuessingState {
    searched: string,
    results: any,
    chosen: boolean,
    chosenID: string,
}

class Guessing extends React.Component<GuessingProps, GuessingState> {
    private toReturnA: any;
    private toReturnB: any;
    private toReturnC: any;
    private toShare: any;

    constructor(props: GuessingProps) {
        super(props);

        this.toReturnA = (<div></div>);
        this.toReturnB = (<div></div>);
        this.toReturnC = (<div></div>);
        this.toShare = "";

        this.state = ({
            searched: "none",
            results: [],
            chosen: false,
            chosenID: ""

        })

        this.generateDisplay = this.generateDisplay.bind(this);
        this.getDeezerSearch = this.getDeezerSearch.bind(this);
        this.onChoose = this.onChoose.bind(this);
    }

    async getDeezerSearch(response: any) {
        this.setState({
            results: response,
            searched: "block",
            chosen: false,
            chosenID: ""
        });
    }

    onChoose(id: number) {
        this.props.onChoose(id.toString());
    }

    generateShare() {
        this.toShare = this.props.shareText+"\n\n🔈 ";
        if (this.props.prevGuesses.length == 6 && !this.props.prevGuesses[5].correct) {
            this.toShare += "⬛️⬛️⬛️⬛️⬛️⬛️\n\nI couldn't guess this Songle!\n\n"+config.songleAddress;
            return;
        }
        for (var i=0; i<this.props.prevGuesses.length-1; i++) {
            this.toShare += "⬛️";
        }
        this.toShare += "✅\n\n"+config.songleAddress;
    }

    generateDisplay() {

        this.toReturnA = (
        <div>
            <h1 style={{marginBottom: 0}}>Your guesses</h1>
            <h3 style={{marginTop: 0}}>If you guess incorrectly, you get a few more seconds of the song. You get six guesses!</h3>
        </div>)

        var prevGuesses = [];

        if (this.props.prevGuesses[0].value != "songle") {
            for (var i=0; i<this.props.prevGuesses.length; i++) {
                prevGuesses.push(React.createElement("div", {className: "guess", key:"guessOpt-"+i}, [<h3><strong>Guess {i+1}/6:</strong> {this.props.prevGuesses[i].value} {this.props.prevGuesses[i].correctString}</h3>]));
            }
        }

        this.toReturnB = React.createElement("div", {key: "holder"}, prevGuesses);

        if (this.props.prevGuesses[this.props.prevGuesses.length-1].correct) {
            this.generateShare();
            this.toReturnC = (<div style={{color: "white", textAlign: "center"}}><CopyShareButton copyText={this.toShare} innerText='Share'/><h1>You guessed correctly!! Congrats :)</h1></div>);
        } else {
            if (this.props.prevGuesses.length == 6) {
                this.generateShare();
                this.toReturnC = (<div style={{color: "white", textAlign: "center"}}><CopyShareButton copyText={this.toShare} innerText='Share'/><h1>You ran out of guesses! The song was {this.props.songName} by {this.props.songArtist}.</h1></div>)
            } else {
                this.toReturnC = (
                    <div>
                        <div className="mobileSearch">
                            <br />
                            <div style={{width: "100%", textAlign: "center"}}><button className="NavButton" onClick={() => {this.props.onChoose("skip")}}><p className="innerText" >Skip</p></button></div>
                            <MusicSearch onResult={this.getDeezerSearch} />
                            <div style={{display: this.state.searched}}>
                                <MusicResults response={this.state.results} onChoose={this.onChoose} />
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }

    render() {
        this.generateDisplay();        

        return (
            <div>
                <div className="guessholder">  
                    {this.toReturnA}
                    {this.toReturnB}
                </div>
                {this.toReturnC}
            </div>
        )
    }
}

export default Guessing;