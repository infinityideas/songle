import { useEffect, useState } from 'react';
import HeaderText from './components/HeaderText';

import { Outlet, useParams } from "react-router-dom";

import './styles/Game.css';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';
const axios = require("axios");


function ChallengeGame () {

    const { gameId } = useParams();

    const [previewLink, setPreviewLink] = useState("");
    const [currentStage, setCurrentStage] = useState("6");

    useEffect(() => {
        const getTrackInfo = async (gameId: string) => {
        
            await axios.get("https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/"+gameId, {headers: 
                {"X-Requested-With": "XMLHttpRequest"}
            }).then((response: any) => {
                if (response.status==800) {
                    window.location.replace("https://localhost:3000/404");
                } else {
                    setPreviewLink(response.data.preview);
                }
            });
        
        }

        if (!window.location.href.includes("-")) {
            window.location.replace("http://localhost:3000/404");
        }
    
        if (gameId!=undefined) {
             getTrackInfo(gameId.split('-')[0]);
        } else {
            window.location.replace("http://localhost:3000/404");
        }

    }, []);

    var toReturn = <div></div>;

    if (previewLink!="") {
        toReturn = <MusicPlayer currentStage={currentStage} previewLink={previewLink} />
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