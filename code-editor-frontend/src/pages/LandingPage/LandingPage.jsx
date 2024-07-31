import "./LandingPage.css";
import Footer from "../../components/footer/footer";
import logo from "../../assets/logo.svg";
import screen from "../../assets/screen_template.png";
import fbIcon from "../../assets/facebookIcon.png";
import igIcon from "../../assets/InstagramIcon.png";
import XIcon from "../../assets/XIcon.png";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/register");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="LandingPage">
      <header>
        <img src={logo} alt="logoSnake" />
      </header>

      <div className="LandingSlogan">
        <h1>#Code Run Act</h1>
        <h4>Codra is an AI-powered software development platform for building, sharing, and shipping software fast</h4>
        <div className="Landing_button_container">
          <button className="landing_btn sign_up_btn" onClick={handleSignUpClick}>Sign Up for Free</button>
          <button className="landing_btn login_btn" onClick={handleLoginClick}>Login</button>
        </div>
      </div>

      <div className="screen_sample">
        <img src={screen} alt="Screen Template" />
      </div>


      <Footer/>
    </div>
  );
}
