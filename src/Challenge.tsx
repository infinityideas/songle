import React from 'react';
import Footer from './components/Footer';
import HeaderText from './components/HeaderText';
import MusicResults from './components/MusicResults';

import './styles/Game.css';

const axios = require('axios');

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

interface ChallengeState {
    searchResults: Array<object>,
    searched: string
}

class Challenge extends React.Component<{}, ChallengeState> {
    private searchRef: any;

    constructor(props: any) {
        super(props);

        this.searchRef = React.createRef();
        this.state = ({
            searchResults: [],
            searched: "none"
        })

        this.getDeezerSearch = this.getDeezerSearch.bind(this);
    }

    async getDeezerSearch() {
        await axios.get('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search', { params: {
            q: this.searchRef.current.value,
            limit: 5,
            order: "RANKING",
        }}).then((response: any) => {
            this.setState({
                searchResults: response.data.data,
                searched: "block"
            })
        })
    }

    render() {
        const subText = (
            <p style={{fontFamily: "Helvetica", marginTop: 0}}>Challenge your friends to guess a song of your choice.</p>
        );

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
                        <MusicResults response={this.state.searchResults}/>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Challenge;