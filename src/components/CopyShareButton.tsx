import React from 'react';

interface CopyShareButtonProps {
    copyText: string,
    innerText: string
}

class CopyShareButton extends React.Component<CopyShareButtonProps, {}> {
    constructor(props: any) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e: any) {
        if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

        } else {
            navigator.clipboard.writeText(this.props.copyText);
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.onClick}>{this.props.innerText}</button>
            </div>
        )
    }
}

export default CopyShareButton;