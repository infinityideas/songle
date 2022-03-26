import React from 'react';
import Footer from './components/Footer';
import HeaderText from './components/HeaderText';
import MusicResults from './components/MusicResults';
import Pusher from "pusher-js";

import './styles/Game.css';

import EventDict from './scripts/EventDict';
import config from './scripts/Config';

const axios = require('axios');

interface ChallengeState {
    searchResults: Array<object>,
    searched: string,
    chosen: boolean,
    chosenTrack: string,
    randomURL: string,
    events: Array<any>,
    channel: any
}

const pusher = new Pusher(config['pusherKey'], {
    cluster: "us2"
})

class Challenge extends React.Component<{}, ChallengeState> {
    private searchRef: any;
    private eventDiv: JSX.Element;

    constructor(props: any) {
        super(props);

        this.searchRef = React.createRef();
        this.state = ({
            searchResults: [],
            searched: "none",
            chosen: false,
            chosenTrack: "",
            randomURL: "",
            events: [],
            channel: null,
        })

        this.eventDiv = <div></div>;

        this.getDeezerSearch = this.getDeezerSearch.bind(this);
        this.onChoose = this.onChoose.bind(this);
        this.generateEventList = this.generateEventList.bind(this);
    }

    async getDeezerSearch() {
        await axios.get('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search', { params: {
            q: this.searchRef.current.value,
            limit: 5,
            order: "RANKING",
        }}, { headers: {"X-Requested-With": "XMLHttpRequest"}}).then((response: any) => {
            console.log(response);
            this.setState({
                searchResults: response.data.data,
                searched: "block",
                chosen: false,
                chosenTrack: "",
                randomURL: "",
                events: [],
                channel: null,
            })
        })
    }

    async onChoose(id: number) {
        await axios.get("http://127.0.0.1:5000/getrandomurl", { params: {id: id}}).then((response: any) => {
            var today = new Date();    

            var channelName = response.data.url.split('/');
            channelName = channelName[channelName.length-1].split('-');
            channelName = channelName[1];
        
            this.setState(prev => {
                return {
                    searchResults: prev.searchResults,
                    searched: "none",
                    chosen: true,
                    chosenTrack: id.toString(),
                    randomURL: response.data.url,
                    channel: pusher.subscribe(channelName),
                    events: [{"ename": "started", "localtime": (today.getHours() % 12) + ":" + ((today.getMinutes()<10?'0':'')+today.getMinutes()) + (((today.getHours() / 12) >= 1) ? " PM" : " AM"), "name": "you"}]
                }
            })
        })
    }

    generateEventList() {
     var eventlist = [];
     let eventText: string;
     let ename: any;

     for (var i=0; i<this.state.events.length; i++) {
        ename = this.state.events[i].ename;
        eventText = EventDict[ename];
        eventlist.push(React.createElement("p", {}, [React.createElement("strong", {}, [this.state.events[i].localtime+": "]), eventText+" by "+this.state.events[i].name]))
     }

     this.eventDiv = React.createElement("div", {className: "eventHolder"}, eventlist);
    }

    render() {
        if (this.state.events.length>0) {
            this.generateEventList();
        }

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
                        <h3 style={{overflowWrap: "anywhere"}}>{this.state.randomURL}</h3><hr />
                        <h2>Want real-time updates on your link? Don't close this tab.</h2>
                        {this.eventDiv}   
                    </div>
                    <Footer />
                </div>
            )
        }
    }
}

export default Challenge;