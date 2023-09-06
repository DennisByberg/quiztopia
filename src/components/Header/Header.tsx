import Toggle from "../Toggle/Toggle";
// images
import quiztopiaLogo from "../../images/q.png";
// scss
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <img src={quiztopiaLogo} />
      <h1>Quiztopia</h1>
      <Toggle />
    </header>
  );
}
export default Header;
