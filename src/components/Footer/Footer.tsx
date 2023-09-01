import "./Footer.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function Footer() {
  const userName = useSelector((state: RootState) => state.user.loggedInUser);

  return (
    <footer className="footer">
      {!userName ? (
        <p>
          Project made by{" "}
          <a target="__blank" href="https://github.com/DennisByberg">
            Dennis Byberg
          </a>
        </p>
      ) : (
        <p>Logged in as {userName}</p>
      )}
    </footer>
  );
}
export default Footer;
