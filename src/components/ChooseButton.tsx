import React from 'react';

import '../styles/ChooseButton.css';

interface ChooseButtonProps {
    id: number,
    onChoose: any,
}

class ChooseButton extends React.Component<ChooseButtonProps, {}> {
    private buttonRef: any

    constructor(props: ChooseButtonProps) {
        super(props);

        this.buttonRef = React.createRef();

        this.onClick = this.onClick.bind(this);
    }

    onClick(e: any) {
        this.buttonRef.current.disabled = true;
        setTimeout(() => {
            this.buttonRef.current.disabled = false;
        }, 200);
        this.props.onChoose(this.props.id);
    }

    render() {
        return (
            <button className="chooseButton" onClick={this.onClick} ref={this.buttonRef}>
                Choose
            </button>
        )
    }
}

export default ChooseButton;