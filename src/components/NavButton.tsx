import '../styles/NavButton.css';

import { Link } from "react-router-dom";

interface NavButtonProps {
    route: string,
    innerText: string
}

function NavButton(props: NavButtonProps) {
    return (
        <Link style={{textDecoration: "none"}} to={props.route} ><button
            className="NavButton"
        ><p className="innerText">{props.innerText}</p></button></Link>
    )
}

export default NavButton;