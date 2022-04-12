import { useEffect, useState } from 'react';
import HeaderText from './components/HeaderText';

import { Outlet, useParams } from "react-router-dom";

import './styles/Game.css';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';
import Guessing from './components/Guessing';
import config from './scripts/Config';
const axios = require("axios");


function ChallengeGame () {

    const { gameId } = useParams();

    const [previewLink, setPreviewLink] = useState("");
    const [currentStage, setCurrentStage] = useState("1");
    const [prevGueses, setPrevGuesses] = useState([{value: "songle", correct: false, correctString: "❌"}]);
    const [songName, setSongName] = useState("");
    const [artistName, setArtistName] = useState("");

    const getDeezerResult = async (id: string) => {
        await axios.get(config.corsAnywhere+'https://api.deezer.com/track/'+id, { headers: {"X-Requested-With": "XMLHttpRequest"}}).then((response: any) => {
            if ((response.data.title_short == songName) && (response.data.artist.name == artistName)) {
                if (prevGueses[0].value=="songle") {
                    setPrevGuesses([{value: response.data.title_short, correct: true, correctString: "✅"}]);
                } else {
                    setPrevGuesses([...prevGueses, {value: response.data.title_short, correct: true, correctString: "✅"}]);
                }
                setCurrentStage("6");
            } else {
                if (prevGueses[0].value=="songle") {
                    setPrevGuesses([{value: response.data.title_short, correct: false, correctString: "❌"}]);
                } else {
                    setPrevGuesses([...prevGueses, {value: response.data.title_short, correct: false, correctString: "❌"}]);
                }
                setCurrentStage((parseInt(currentStage)+1).toString());
            }
        })
    };

    const onChoose = (id: string) => {
        getDeezerResult(id);
        setArtistName(artistName);
    };
 
    useEffect(() => {
        const getTrackInfo = async (gameId: string) => {
        
            await axios.get(config.corsAnywhere+"https://api.deezer.com/track/"+gameId, {headers: 
                {"X-Requested-With": "XMLHttpRequest"}
            }).then((response: any) => {
                if (response.status==800) {
                    window.location.replace(config.songleAddress+"/404");
                } else {
                    setPreviewLink(response.data.preview);
                    setSongName(response.data.title_short);
                    setArtistName(response.data.artist.name);
                }
            });
        
        }

        if (!window.location.href.includes("-")) {
            window.location.replace(config.songleAddress+"/404");
        }
    
        if (gameId!=undefined) {
             getTrackInfo(gameId.split('-')[0]);
        } else {
            window.location.replace(config.songleAddress+"/404");
        }

    }, []);

    var toReturn = <div></div>;

    if (previewLink!="") {
        toReturn = (<div><MusicPlayer currentStage={currentStage} previewLink={previewLink} /><Guessing songArtist={artistName} songName={songName} currentStage={currentStage} prevGuesses={prevGueses} onChoose={onChoose} /></div>)
    }
    
    const subText = (
        <p style={{fontFamily: 'Helvetica', marginTop: 0}}>Someone challenged you to a Songle! They've chosen a song... see if you can guess it in the fewest number of tries!</p>
    )

    return (
        <div>
            <div id="gameHeader">
                <HeaderText text="Challenge" doAnimation={false} subText={subText} isGame={true} />
            </div>
            {toReturn}
            <Footer />
            <Outlet />
        </div>
    )

}

export default ChallengeGame;