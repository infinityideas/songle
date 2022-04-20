import { useEffect, useState } from 'react';
import HeaderText from './components/HeaderText';

import { Outlet, useParams } from "react-router-dom";

import './styles/Game.css';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';
import Guessing from './components/Guessing';
import config from './scripts/Config';
import NavButton from './components/NavButton';
import GameContainer from './components/GameContainer';
const axios = require("axios");


function ChallengeGame () {

    const { gameId } = useParams();
 
    useEffect(() => {

        if (!window.location.href.includes("-")) {
            window.location.replace(config.songleAddress+"/404");
        }
    
        if (gameId!=undefined) {
             axios.get(config.flaskServer+"/ne", {params: {
                 "type": "opened",
                 "channel": gameId.split('-')[1]
             }})
        } else {
            window.location.replace(config.songleAddress+"/404");
        }

    }, []);
    
    const subText = (
        <p style={{fontFamily: 'Helvetica', marginTop: 0}}>Someone challenged you to a Songle! They've chosen a song... see if you can guess it in the fewest number of tries!</p>
    )

    return (
        <div>
            <div id="gameHeader">
                <HeaderText text="Challenge" doAnimation={false} subText={subText} isGame={true} />
                <div style={{width: "100%", textAlign: "center", marginBottom: "15px"}}><NavButton route="/" innerText="Main Page" /></div>
            </div>
            <GameContainer usePusher={true} pusherId={gameId} shareText={"Songle CHALLENGE\nSomeone challenged me to a Songle!"}/>
            <Footer />
            <Outlet />
        </div>
    )

}

export default ChallengeGame;