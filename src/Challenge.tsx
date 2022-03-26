import React from 'react';
import Footer from './components/Footer';
import HeaderText from './components/HeaderText';
import MusicResults from './components/MusicResults';

import './styles/Game.css';

const axios = require('axios');

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

interface ChallengeState {
    searchResults: Array<object>,
    searched: string,
    chosen: boolean,
    chosenTrack: string,
}

class Challenge extends React.Component<{}, ChallengeState> {
    private searchRef: any;

    constructor(props: any) {
        super(props);

        this.searchRef = React.createRef();
        this.state = ({
            searchResults: [],
            searched: "none",
            chosen: false,
            chosenTrack: ""
        })

        this.getDeezerSearch = this.getDeezerSearch.bind(this);
        this.onChoose = this.onChoose.bind(this);
    }

    async getDeezerSearch() {
        await axios.get('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search', { params: {
            q: this.searchRef.current.value,
            limit: 5,
            order: "RANKING",
        }}).then((response: any) => {
            console.log(response);
            this.setState({
                searchResults: response.data.data,
                searched: "block",
                chosen: false,
                chosenTrack: ""
            })
        })
    }

    onChoose(id: number) {
        console.log(id);
        this.setState(prev => {
            return {
            searchResults: prev.searchResults,
            searched: "none",
            chosen: true,
            chosenTrack: id.toString(),
            }
        })
    }

    render() {
        const subText = (
            <p style={{fontFamily: "Helvetica", marginTop: 0}}>Challenge your friends to guess a song of your choice.</p>
        );

        if (!this.state.chosen) {
            return (
                <div>
                    <div className="gameHeader">
                        <HeaderText text="Challenge" doAnimation={false} subText={subText} isGame={true} />
                    </div>
                    <div className="mobileSearch">
                        <div className="gameSearch">
                            <input ref={this.searchRef} className="gameSearchBox" type="text" placeholder="Enter the name of a song"></input>
                            <button className="searchButton" onClick={this.getDeezerSearch}>Search</button>
                        </div>
                        <div style={{display: this.state.searched}}>
                            <MusicResults response={this.state.searchResults} onChoose={this.onChoose} />
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        } else {
            return (
                <div>
                    <div className="gameHeader">
                        <HeaderText text="Challenge" doAnimation={false} subText={subText} isGame={true} />    
                    </div>
                    <div id="centered">
                        <h1>Awesome. Share the link below with anyone you want.</h1>    
                    </div>
                    <Footer />
                </div>
            )
        }
    }
}

export default Challenge;