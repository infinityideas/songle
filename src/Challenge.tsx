import React from 'react';
import HeaderText from './components/HeaderText';

import './styles/Game.css';

const axios = require('axios');

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

class Challenge extends React.Component {
    private searchRef: any;

    constructor(props: any) {
        super(props);

        this.searchRef = React.createRef();

        this.getDeezerSearch = this.getDeezerSearch.bind(this);
    }

    async getDeezerSearch() {
        await axios.get('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search', { params: {
            q: this.searchRef.current.value,
            limit: 5
        }}).then((response: any) => {
            console.log(response);
        })
    }

    render() {
        const subText = (
            <p style={{fontFamily: "Helvetica", marginTop: 0}}>Challenge your friends to guess a song of your choice.<br/><strong>Note:</strong> Songs marked "explicit" are not eligible.</p>
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
                    <table className='musicResults'>
                        <colgroup>
                            <col style={{width: "15%"}} />
                            <col style={{width: "32.5%"}} />
                            <col style={{width: "32.5%"}} />
                            <col style={{width: "20%"}} />
                        </colgroup>

                        <thead>
                            <tr>
                                <th>Album Cover</th>
                                <th>Track Name</th>
                                <th>Track Artist</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>test</td>
                                <td>hi</td>
                                <td>test</td>
                                <td>test</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Challenge;