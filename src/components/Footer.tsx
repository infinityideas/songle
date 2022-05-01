import '../styles/Footer.css';
import deezerlogo from '../assets/images/deezerlogo.svg';

function Footer() {
    const insideText = <p>Created by Darius. <span dangerouslySetInnerHTML={{"__html": "&copy;"}} /> 2022. Thanks to <img src={deezerlogo} height="15px" /><br /> Bug/Comment/Suggestion? Let me know <a href="https://forms.gle/7dS5XuEpyo8jJfrA6">here</a>. View system <a href="https://status.infinityideas.dev">status</a>.<br /><a href='https://ko-fi.com/Y8Y5CDQAC' target='_blank'><img height='36' style={{border: 0, height:36, marginTop: 7}} src='https://cdn.ko-fi.com/cdn/kofi2.png?v=3' alt='Buy Me a Coffee at ko-fi.com' /></a></p>;

    return (
        <div>
            <div id="songlefooter">
                {insideText}
            </div>
        </div>
    )
}

export default Footer;