import React from 'react';

import '../styles/ChooseButton.css';

class ChooseButton extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <button className="chooseButton">
                Choose
            </button>
        )
    }
}

export default ChooseButton;