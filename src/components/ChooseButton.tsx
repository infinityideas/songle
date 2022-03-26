import React from 'react';

import '../styles/ChooseButton.css';

interface ChooseButtonProps {
    id: number,
    onChoose: any,
}

class ChooseButton extends React.Component<ChooseButtonProps, {}> {
    constructor(props: ChooseButtonProps) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e: any) {
        this.props.onChoose(this.props.id);
    }

    render() {
        return (
            <button className="chooseButton" onClick={this.onClick}>
                Choose
            </button>
        )
    }
}

export default ChooseButton;