import config from './scripts/Config';
import React from 'react';
import CopyShareButton from './components/CopyShareButton';
import Footer from './components/Footer';
import HeaderText from './components/HeaderText';
import NavButton from './components/NavButton';
import GameContainer from './components/GameContainer';

const axios = require("axios");

class Daily extends React.Component {
    private toReturn: any;
    private dayId: any;

    constructor(props: any) {
        super(props);

        this.toReturn = <div></div>;
        this.dayId = "";

        this.onDoneGame = this.onDoneGame.bind(this);
    }

    onDoneGame(doneText: any) {
        var today = new Date();
        var localName = (today.getMonth()+1).toString()+"-"+(today.getDate()).toString()+"-"+(today.getFullYear()).toString()+"-songle";

        localStorage.setItem(localName, this.dayId+"-"+doneText);
    }

    componentDidMount() {
        var today = new Date();
        var info: any = "";
        var localName = (today.getMonth()+1).toString()+"-"+(today.getDate()).toString()+"-"+(today.getFullYear()).toString()+"-songle";

        if (localStorage.getItem(localName) != null) {
            info = localStorage.getItem(localName);
            var shareText = "Songle DAILY #"+(info).split('-')[0]+"\n\n🔈 ";
            for (var i=0; i<info.split('-')[1].length-1; i++) {
                shareText+="⬛️";
            }
            shareText+=info.split('-')[1][info.split('-')[1].length-1] == "x" ? "⬛️" : "✅";
            shareText+="\n\n"+config.songleAddress;

            this.toReturn = (
                <div style={{textAlign: "center", color: "white"}}>
                    <h3>You already played today's Songle! Share your results with the button below!</h3>
                    <CopyShareButton copyText={shareText} innerText="Share" />
                    <h4>There will be a new Songle at <strong>midnight</strong>.</h4>
                </div>
            )

            this.forceUpdate();
        } else {
            axios.get(config.flaskServer+"/todayid?date="+(today.getMonth()+1).toString()+"-"+(today.getDate()).toString()+"-"+(today.getFullYear()).toString()).then((response: any) => {
                this.toReturn = (
                    <GameContainer onDone={this.onDoneGame} usePusher={false} pusherId={response.data.resp+"-none"} shareText={"Songle DAILY #"+response.data.id} />
                )

                this.dayId = response.data.id;

                this.forceUpdate();
            })
        }
    }

    render() {
        var subText = <h3 style={{marginTop: 0}}>Play today's Songle!</h3>;

        return (
            <div>
                <HeaderText text="Daily" doAnimation={false} subText={subText} isGame={true}/>
                <div style={{textAlign:"center", marginBottom: 10}}>
                    <NavButton route="/" innerText="Go Home" />
                </div>
                {this.toReturn}
                <Footer />
            </div>
        )
    }
}

export default Daily;