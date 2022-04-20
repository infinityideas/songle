import { Outlet, useParams } from "react-router-dom";
import playlistdict, {playlistnames} from './scripts/PracticePlaylistDict';
import config from './scripts/Config';
import HeaderText from "./components/HeaderText";
import NavButton from "./components/NavButton";
import GameContainer from "./components/GameContainer";
import { useState, useEffect } from 'react';

const axios = require("axios");

function PracticeGenre() {
    const { genreId } = useParams();

    var returnEarly = false;
    if (genreId==undefined) {
        returnEarly = true;
    }

    var newGenreId = genreId != undefined ? genreId : "no";

    const [toReturn, setToReturn] = useState(<div></div>);

    useEffect(() => {
        if (returnEarly) {
            window.location.replace(config.songleAddress+"/404");
            return;
        }

        if (genreId==undefined) {
            window.location.replace(config.songleAddress+"/404");
            return;
        }
    
        var inList: boolean = false;
    
        for (var i=0; i<playlistdict.length; i++) {
            if (playlistdict[i]==genreId) {
                inList = true;
                break;
            }
        }
    
        if (!inList) {
            window.location.replace(config.songleAddress+"/404");
        }

        const getRandomSong = async (genreId: any) => {
            await axios.get(config.corsAnywhere+"https://api.deezer.com/playlist/"+genreId).then((response: any) => {
                var randomNumber = Math.floor(Math.random() * response.data.tracks.data.length);
                setToReturn(<GameContainer usePusher={false} pusherId={response.data.tracks.data[randomNumber].id+"-"+"none"} shareText={"Songle PRACTICE: "+playlistnames[playlistdict.indexOf(genreId)]+"\nSong: "+response.data.tracks.data[randomNumber].title_short+" by "+response.data.tracks.data[randomNumber].artist.name}/>);
            });
        }

        getRandomSong(genreId);
    }, [])

    return (
        <div>
            <HeaderText text="Practice!" doAnimation={false} subText={<h3 style={{marginTop: 0}}>Work on your song recognition skills through randomly selected songs of a genre that you pick.</h3>} isGame={true}/>
            <div style={{width: "100%", margin: "auto", textAlign: "center"}}>
                <NavButton route="/" innerText='Go Home' />
                <button className="NavButton" style={{width: "150px"}} onClick={() => {window.location.replace(config.songleAddress+"/practice")}}><p className="innerText">Choose Genre</p></button>
                <button className="NavButton" style={{width: "150px"}} onClick={() => {document.location.reload()}}><p className="innerText">New Song</p></button>
                <br />
                <h4 style={{color: "white", fontSize: "2em", marginTop: "5px"}}>Genre: {playlistnames[playlistdict.indexOf(newGenreId)]}</h4>
                {toReturn}
            </div>
            <Outlet />
        </div>
    )
}

export default PracticeGenre;