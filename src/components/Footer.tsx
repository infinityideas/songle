import '../styles/Footer.css';
import deezerlogo from '../assets/images/deezerlogo.svg';

function Footer() {
    const insideText = <p>Created by Darius. <span dangerouslySetInnerHTML={{"__html": "&copy;"}} /> 2022. Thanks to <img src={deezerlogo} height="15px" /><br /> Bug/Comment/Suggestion? Let me know <a href="https://forms.gle/7dS5XuEpyo8jJfrA6">here</a>.</p>;

    return (
        <div>
            <div id="songlefooter">
                {insideText}
            </div>
        </div>
    )
}

export default Footer;