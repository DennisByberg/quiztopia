import quiztopiaLogo from "../../images/q.png";
import "./Header.scss";
import userPNG from "../../images/user.png";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function Header() {
  const loggedInUserName = useSelector(
    (state: RootState) => state.user.loggedInUser
  );

  return (
    <header className="header">
      <img src={quiztopiaLogo} />
      {loggedInUserName ? (
        <div className="header__logged-in-user-container">
          <p> {loggedInUserName} </p>
          <img src={userPNG} />
        </div>
      ) : (
        <h1>
          <span>Q</span>uiztopia
        </h1>
      )}
    </header>
  );
}
export default Header;
