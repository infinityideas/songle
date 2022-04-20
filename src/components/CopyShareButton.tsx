import React from 'react';
import '../styles/CopyShareButton.css';

interface CopyShareButtonProps {
    copyText: string,
    innerText: string
}

class CopyShareButton extends React.Component<CopyShareButtonProps, {}> {
    private buttonRef: any;

    constructor(props: any) {
        super(props);

        this.buttonRef = React.createRef();

        this.onClick = this.onClick.bind(this);
    }

    onClick(e: any) {
        if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            navigator.share({text: this.props.copyText});
        } else {
            navigator.clipboard.writeText(this.props.copyText);
            this.buttonRef.current.innerText="Copied!";
            setTimeout(() => {
                this.buttonRef.current.innerText="Share";
            }, 2000);
        }
    }

    render() {
        return (
            <div>
                <button className="ShareButton" ref={this.buttonRef} onClick={this.onClick}>{this.props.innerText}</button>
            </div>
        )
    }
}

export default CopyShareButton;