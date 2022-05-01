import React from 'react';
import config from '../scripts/Config';
import MusicPlayer from './MusicPlayer';
import Footer from './Footer';
import Guessing from './Guessing';

const axios = require('axios');

interface GameContainerState {
    previewLink: string,
    currentStage: string,
    prevGueses: Array<any>,
    songName: string,
    artistName: string
}

interface GameContainerProps {
    usePusher: boolean,
    pusherId: any,
    shareText: any,
    onDone: any,
}

class GameContainer extends React.Component<GameContainerProps, GameContainerState>{

    constructor(props: any) {
        super(props);

        this.state = {
            previewLink: "",
            currentStage: "1",
            prevGueses: [{value: "songle", correct: false, correctString: "❌"}],
            songName: "",
            artistName: ""
        }

        this.getDeezerResult = this.getDeezerResult.bind(this);
        this.getTrackInfo = this.getTrackInfo.bind(this);
        this.onChoose = this.onChoose.bind(this);

    }

    async getDeezerResult (id: string, gameId: any) {
        if (id=="skip") {
            if (this.state.prevGueses[0].value=="songle") {
                await this.setState((prev) => {
                    return ({
                        ...prev,
                        prevGueses: [{value: "Skipped", correct: false, correctString: "❌"}]
                    });
                });
            } else {
                await this.setState((prev) => {
                    return ({
                        ...prev,
                        prevGueses: [...prev.prevGueses, {value: "Skipped", correct: false, correctString: "❌"}]
                    });
                });
            }
            await this.setState((prev) => {
                return ({
                    ...prev,
                    currentStage: (parseInt(prev.currentStage)+1).toString()
                })
            });
            if (this.props.usePusher) {
                axios.get(config.flaskServer+"/ne", {params: {
                    "type": "skipped",
                    "channel": gameId.split('-')[1]
                }});
            }

            if (this.state.prevGueses.length == 6 && this.props.usePusher) {
                axios.get(config.flaskServer+"/ne", {params: {
                    "type": "endfail",
                    "channel": gameId.split('-')[1]
                }})
            }

            if (this.state.prevGueses.length == 6 && this.props.onDone != "none") {
                this.props.onDone("xxxxxx");
            }

            if (this.state.prevGueses.length == 6) {
                await this.setState((prev) => {
                    return({
                        ...prev,
                        currentStage: "6"
                    })
                })
            }

            return;
        } else if (id=="quit") {
            if (this.state.prevGueses[0].value=="songle") {
                this.setState((prev) => {
                    return ({
                        ...prev,
                        prevGueses: [{value: "Quit", correct: true, correctString: "🤷‍♂️"}]
                    });
                });
            } else {
                this.setState((prev) => {
                    return ({
                        ...prev,
                        prevGueses: [...prev.prevGueses, {value: "Quit", correct: true, correctString: "🤷‍♂️"}]
                    });
                });
            }
            this.setState((prev) => {
                return({
                    ...prev,
                    currentStage: "6"
                })
            });
            if (this.props.usePusher) {
                axios.get(config.flaskServer+"/ne", {params: {
                    "type": "endquit",
                    "channel": gameId.split('-')[1]
                }});
            }
            if (this.props.onDone != "none") {
                var doneString = "";

                for (var x=0; x<this.state.prevGueses.length-1; x++) {
                    doneString+="x";
                }

                this.props.onDone(doneString+"x")
            }

            return;
        } else {
            await axios.get(config.corsAnywhere+'https://api.deezer.com/track/'+id, { headers: {"X-Requested-With": "XMLHttpRequest"}}).then((response: any) => {
                if ((response.data.title_short == this.state.songName) && (response.data.artist.name == this.state.artistName)) {
                    if (this.state.prevGueses[0].value=="songle") {
                        this.setState((prev) => {
                            return ({
                                ...prev,
                                prevGueses: [{value: response.data.title_short, correct: true, correctString: "✅"}]
                            });
                        });
                    } else {
                        this.setState((prev) => {
                            return ({
                                ...prev,
                                prevGueses: [...prev.prevGueses, {value: response.data.title_short, correct: true, correctString: "✅"}]
                            });
                        });
                    }
                    this.setState((prev) => {
                        return({
                            ...prev,
                            currentStage: "6"
                        })
                    });
                    if (this.props.usePusher) {
                        axios.get(config.flaskServer+"/ne", {params: {
                            "type": "success",
                            "channel": gameId.split('-')[1]
                        }});
                    }
                    if (this.props.onDone != "none") {
                        var doneString = "";

                        for (var x=0; x<this.state.prevGueses.length-1; x++) {
                            doneString+="x";
                        }

                        this.props.onDone(doneString+"y")
                    }
                } else {
                    if (this.state.prevGueses[0].value=="songle") {
                        this.setState((prev) => {
                            return({
                                ...prev,
                                prevGueses: [{value: response.data.title_short, correct: false, correctString: "❌"}]
                            })
                        });
                    } else {
                        this.setState((prev) => {
                            return({
                                ...prev,
                                prevGueses: [...prev.prevGueses, {value: response.data.title_short, correct: false, correctString: "❌"}]
                            })
                        });
                    }
                    this.setState((prev) => {
                        return({
                            ...prev,
                            currentStage: (parseInt(prev.currentStage)+1).toString()
                        })
                    });

                    if (this.props.usePusher) {
                        axios.get(config.flaskServer+"/ne", {params: {
                            "type": "fail-"+response.data.title_short+"-"+response.data.artist.name,
                            "channel": gameId.split('-')[1]
                        }});
                    }
                    
                    if (this.state.prevGueses.length == 6 && this.props.usePusher) {
                        axios.get(config.flaskServer+"/ne", {params: {
                            "type": "endfail",
                            "channel": gameId.split('-')[1]
                        }})
                    }

                    if (this.state.prevGueses.length == 6 && this.props.onDone!="none") {
                        this.props.onDone("xxxxxx");
                    }

                    if (this.state.prevGueses.length == 6) {
                        this.setState((prev) => {
                            return ({
                                ...prev,
                                currentStage: "6"
                            })
                        })
                    }

                }
            })
        }
    };

    async getTrackInfo (trackNum: string) {
        
        await axios.get(config.corsAnywhere+"https://api.deezer.com/track/"+trackNum, {headers: 
            {"X-Requested-With": "XMLHttpRequest", }
        }).then((response: any) => {
            if (response.status==800) {
                window.location.replace(config.songleAddress+"/404");
            } else {
                this.setState((prev) => {
                    return({
                        ...prev,
                        previewLink: response.data.preview,
                        songName: response.data.title_short,
                        artistName: response.data.artist.name
                    })
                });
            }
        });
    
    }

    componentDidMount() {
        this.getTrackInfo(this.props.pusherId.split('-')[0]);
    }

    onChoose (id: string, gameIda = this.props.pusherId) {
        this.getDeezerResult(id, gameIda);
        this.setState((prev) => {
            return({
                ...prev,
                artistName: prev.artistName
            })
        });
    };

    render() {
        var toReturn = <div></div>;

        if (this.state.previewLink!="") {
            toReturn = (<div><MusicPlayer currentStage={this.state.currentStage} previewLink={this.state.previewLink} /><Guessing shareText={this.props.shareText} songArtist={this.state.artistName} songName={this.state.songName} currentStage={this.state.currentStage} prevGuesses={this.state.prevGueses} onChoose={this.onChoose} gameId={this.props.pusherId} /></div>)
        }

        return (
            <div>
                {toReturn}
            </div>
        )
    }
}



export default GameContainer;