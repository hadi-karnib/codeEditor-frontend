import fbIcon from "../../assets/facebookIcon.png";
import igIcon from "../../assets/InstagramIcon.png";
import XIcon from "../../assets/XIcon.png";


export default function Footer(){
    return(
        <footer>
                <ul className="icon_list">
                <li><img src={fbIcon} alt="Facebook Icon" /></li>
                <li><img src={igIcon} alt="Instagram Icon" /></li>
                <li><img src={XIcon} alt="X Icon" /></li>
                </ul>
                <p>Contact Us at CodraEditor@codra.com</p>
        </footer>
    )
}

