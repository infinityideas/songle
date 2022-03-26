import React from 'react';
import Footer from './components/Footer';
import HeaderText from './components/HeaderText';

class NotFound extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        const subText = (
            <p>That page was not found. Check the URL address for a mistake or ask the person that gave you this link why they gave you an unusable link.</p>
        )

        return (
            <div>
                <HeaderText text="Error 404" doAnimation={false} subText={subText} />
                <Footer />
            </div>
        )
    }
}

export default NotFound;