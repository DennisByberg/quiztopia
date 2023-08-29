import Toggle from "../Toggle/Toggle";
// images
import quiztopiaLogo from "../../images/q.png";
// scss
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <img className="header__hillsLogo" src={quiztopiaLogo} />
      <Toggle />
    </header>
  );
}
export default Header;
