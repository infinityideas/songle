import React from 'react';

const axios = require('axios');

interface MusicSearchProps {
    onResult: any,
}

class MusicSearch extends React.Component<MusicSearchProps, {}> {
    private searchRef: any;

    constructor(props: MusicSearchProps) {
        super(props);

        this.searchRef = React.createRef();

        this.getDeezerSearch = this.getDeezerSearch.bind(this);
    }

    async getDeezerSearch() {
        await axios.get('http://127.0.0.1:8080/https://api.deezer.com/search', { params: {
            q: this.searchRef.current.value,
            limit: 5,
            order: "RANKING",
        }}, { headers: {"X-Requested-With": "XMLHttpRequest"}}).then((response: any) => {
            this.props.onResult(response.data.data);
        })
    }

    render() {
        return (
            <div className="gameSearch">
                <input ref={this.searchRef} className="gameSearchBox" type="text" placeholder="Enter the name of a song"></input>
                <button className="searchButton" onClick={this.getDeezerSearch}>Search</button>
            </div>
        )
    }
}

export default MusicSearch;