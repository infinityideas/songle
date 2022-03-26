import React from 'react';
import '../../styles/MusicResults.css';

interface resultsprops {
    tBody: JSX.Element
}


class MusicResultsPresentational extends React.Component<resultsprops, {}> {
    constructor(props: resultsprops) {
        super(props);
    }

    render() {
        return (
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
                {this.props.tBody}
            </table>
        )
    }
}

export default MusicResultsPresentational;