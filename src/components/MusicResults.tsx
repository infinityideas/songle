import React from 'react';
import ChooseButton from './ChooseButton';
import MusicResultsPresentational from './presentational/MusicResultsPresentational';

interface ResultsProps {
    response: Array<any>,
    onChoose: any,
}

class MusicResults extends React.Component<ResultsProps, {}> {
    constructor(props: ResultsProps) {
        super(props);
    }

    render() {
        var tableChildren: Array<any> = [];
        var tds: Array<any> = [];

        if (this.props.response.length > 0) {
            for (var i=0; i<this.props.response.length; i++) {
                tds = []
                tds.push(React.createElement("td", {}, [React.createElement("img", {src: this.props.response[i].album.cover_small})]));
                tds.push(React.createElement("td", {}, [this.props.response[i].title]));
                tds.push(React.createElement("td", {}, [this.props.response[i].artist.name]));
                tds.push(React.createElement("td", {}, [<ChooseButton id={this.props.response[i].id} onChoose={this.props.onChoose} />]))
                tableChildren.push(React.createElement("tr", {}, tds));
            }
        }

        var tBody = React.createElement("tbody", {}, tableChildren);

        if (this.props.response.length == 0) {
            return (
                <h1 style={{textAlign: 'center', color: 'white'}}>No results! Try searching again.</h1>
            )
        } else {
            return (
                <MusicResultsPresentational tBody={tBody} />
            )
        }
    }
}

export default MusicResults;