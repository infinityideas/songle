import React from 'react';
import Footer from './components/Footer';
import HeaderText from './components/HeaderText';
import MusicResults from './components/MusicResults';
import Pusher from "pusher-js";
import NavButton from './components/NavButton';

import './styles/Game.css';

import EventDict from './scripts/EventDict';
import config from './scripts/Config';
import MusicSearch from './components/MusicSearch';

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
    private eventDiv: JSX.Element;
    private goHome: JSX.Element;

    constructor(props: any) {
        super(props);

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
        this.goHome = <div></div>;

        this.getDeezerSearch = this.getDeezerSearch.bind(this);
        this.onChoose = this.onChoose.bind(this);
        this.generateEventList = this.generateEventList.bind(this);
        this.addEvent = this.addEvent.bind(this);
    }

    async getDeezerSearch(response: any) {
        this.setState({
            searchResults: response,
            searched: "block",
            chosen: false,
            chosenTrack: "",
            randomURL: "",
            events: [],
            channel: null,
        });
    }

    async onChoose(id: number) {
        await axios.get(config.flaskServer+"/getrandomurl", { params: {id: id}}).then((response: any) => {
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
                    events: [{"ename": "started", "localtime": (today.getHours() % 12 == 0 ? '12': today.getHours() % 12) + ":" + ((today.getMinutes()<10?'0':'')+today.getMinutes()) + (((today.getHours() / 12) >= 1) ? " PM" : " AM"), "name": "you"}]
                }
            });

            this.state.channel.bind("ne", (data: any) => {
                this.addEvent(data);
            })
        })
    }

    addEvent(data: any) {
        console.log(data);
        var today = new Date();
        this.setState(prev => {
            return {
                searchResults: prev.searchResults,
                searched: prev.searched,
                chosen: prev.chosen,
                chosenTrack: prev.chosenTrack,
                randomURL: prev.randomURL,
                channel: prev.channel,
                events: [...prev.events, {"ename": data.message, "localtime": (today.getHours() % 12 == 0 ? '12' : today.getHours() % 12) + ":" +((today.getMinutes()<10?'0':'')+today.getMinutes()) + (((today.getHours() / 12) >= 1) ? " PM": " AM"), "name": "someone"}]
            }
        })
    }

    generateEventList() {
     var eventlist = [];
     let eventText: string;
     let ename: any;

     for (var i=0; i<this.state.events.length; i++) {
        ename = this.state.events[i].ename;
        if (ename.substring(0,4) == "fail") {
            eventText = EventDict["fail"]+ename.split('-')[1]+" by "+ename.split('-')[2];
        } else {
            eventText = EventDict[ename];
        }
        eventlist.push(React.createElement("p", {}, [React.createElement("strong", {}, [this.state.events[i].localtime+": "]), eventText]))
     }

     this.eventDiv = React.createElement("div", {className: "eventHolder"}, eventlist);

     if (this.state.events[this.state.events.length-1].ename == "endfail") {
         this.goHome = <div style={{width: "100%", margin: "auto", marginTop: "10px"}}><NavButton route="/challenge" innerText="New game" /></div>
     }
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
                        <HeaderText text="Multiplayer" doAnimation={false} subText={subText} isGame={true} />
                        <div style={{textAlign: "center"}} ><NavButton route="/" innerText="Go Home" /></div>
                    </div>
                    <div className="mobileSearch">
                        <MusicSearch onResult={this.getDeezerSearch} />
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
                        <HeaderText text="Multiplayer" doAnimation={false} subText={subText} isGame={true} /> 
                        <div style={{textAlign: "center"}} ><NavButton route="/" innerText="Go Home" /></div>
                    </div>
                    <div id="centered">
                        <h1>Awesome. Share the link below with anyone you want.</h1> 
                        <h3 style={{overflowWrap: "break-word"}}>{this.state.randomURL}</h3><hr />
                        <h2>Want real-time updates on your link? Don't close this tab.</h2>
                        {this.eventDiv}
                        {this.goHome}   
                    </div>
                    <Footer />
                </div>
            )
        }
    }
}

export default Challenge;