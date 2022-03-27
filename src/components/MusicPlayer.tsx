import React from 'react';
import { Howl, Howler } from 'howler';

import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

import '../styles/MusicPlayer.css';
import Play from '../assets/images/icons/circle-play-solid.svg';
import Pause from '../assets/images/icons/circle-pause-solid.svg';

gsap.registerPlugin(MorphSVGPlugin);
gsap.registerPlugin(DrawSVGPlugin);
gsap.config({ nullTargetWarn: false });

interface MusicPlayerProps {
    currentStage: string,
    previewLink: string,
}

class MusicPlayer extends React.Component<MusicPlayerProps, {}> {
    private lineRef: any;
    private lineSegments: Array<string>;
    private lineSegmentTimes: Array<string>;
    private howler: any;
    private playPauseRef: any;
    private animation: any;

    constructor(props: MusicPlayerProps) {
        super(props);

        this.lineRef = React.createRef();
        this.playPauseRef = React.createRef();

        this.lineSegments = ["0", "3.33%", "13.33%", "23.33%", "43.33%", "46.66%", "100%"];
        this.lineSegmentTimes = ["0", "1", "4", "7", "13", "20", "30"];
        this.animation = "";

        this.howler = new Howl({
            src: [this.props.previewLink],
            sprite: {
                "1": [0, 1000],
                "2": [0, 4000],
                "3": [0, 7000],
                "4": [0, 13000],
                "5": [0, 20000],
                "6": [0, 30000]
            },
            onend: () => {
                this.playPauseRef.current.src = Play;
            }
        });

        this.playSound = this.playSound.bind(this);
    }

    playSound() {

        if (this.howler.playing()) {
            this.howler.stop();
            this.animation.kill();
            this.playPauseRef.current.src=Play;
            return;
        } else {
            this.playPauseRef.current.src=Pause;
        }
        

        gsap.to(this.lineRef.current, {drawSVG: "0", duration: "0"});
        this.lineRef.current.style.stroke = "green";

        this.animation = gsap.fromTo(this.lineRef.current, {drawSVG: "0"}, {drawSVG: this.lineSegments[parseInt(this.props.currentStage)], duration: this.lineSegmentTimes[parseInt(this.props.currentStage)]});

        this.howler.play(this.props.currentStage);

    }

    render() {
        return (
            <div>
                <div className="svgHolder">
                    <svg className="progressBar" xmlns="http://www.w3.org/2000/svg">
                        <line ref={this.lineRef} x1="0" y1="0" x2="100%" y2="0" stroke="black" strokeWidth="36px"/>    
                    </svg>
                </div>
                <div className="MusicPlayer">
                    <table>
                        <colgroup>
                            <col style={{width: "3.33%"}} />
                            <col style={{width: "10%"}} />
                            <col style={{width: "10%"}} />
                            <col style={{width: "20%"}} />
                            <col style={{width: "23.33%"}} />
                            <col style={{width: "33.34%"}} />
                        </colgroup>
                        <thead>
                            <tr style={{height: "20px"}}>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                    </table>
                    <div className="playPause">
                        <button className="playButton" onClick={this.playSound}>
                            <img src={Play} ref={this.playPauseRef} width="30" height="30" /></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default MusicPlayer;