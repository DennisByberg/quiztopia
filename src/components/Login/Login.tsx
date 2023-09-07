import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { AppDispatch } from "../../redux/store";
import "./Login.scss";

function Login() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Sign up.
  async function handleSignUp() {
    try {
      const body = { username, password };
      const response = await fetch(
        `${import.meta.env.VITE_SWAGGER_URL}/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify(body),
        }
      );
      const data: ISignUpApiResponse = await response.json();

      if (data.success) {
        setSuccessMessage("Successfully created new account");
      } else {
        setErrorMessage("Username already exists");
      }

      console.log("handleSignUp:", data);
    } catch (error) {
      console.error("Error in handleSignUp:", error);
    }
  }

  // Login.
  async function handleLogin() {
    try {
      const body = { username, password };
      const response = await fetch(
        `${import.meta.env.VITE_SWAGGER_URL}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(body),
        }
      );

      const data: ILoginApiResponse = await response.json();
      console.log(data);

      if (data.token) {
        setToken(data.token);
        dispatch(
          setUser({ loggedInUser: username, loggedInToken: data.token })
        );
      } else {
        setErrorMessage("Incorrect username or password");
      }
    } catch (error) {
      console.error("Error in handleLogin:", error);
    }
  }

  // Logout.
  function handleLogout() {
    dispatch(setUser({ loggedInUser: "", loggedInToken: "" }));
    setToken("");
    setUsername("");
    setPassword("");
  }

  // Go To Map
  function handleGoToMap() {
    navigate("/game");
  }

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
    // Clear messages if it exists (if truthy)
    errorMessage && setErrorMessage("");
    successMessage && setSuccessMessage("");
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
    // Clear messages if it exists (if truthy)
    errorMessage && setErrorMessage("");
    successMessage && setSuccessMessage("");
  }

  return (
    <section className="login">
      {!token ? (
        <div className="login__logged-out-container">
          <input
            onChange={handleUsernameChange}
            type="text"
            placeholder="Enter your username"
          />
          <input
            onChange={handlePasswordChange}
            type="password"
            placeholder="Enter your password"
          />
          <p className="login__error-msg"> {errorMessage} </p>
          <p className="login__success-msg"> {successMessage} </p>
          <button onClick={handleLogin}> Log In </button>
          <button onClick={handleSignUp}> Sign Up </button>
        </div>
      ) : (
        <div className="login__logged-in-container">
          <h2>Welcome {username}</h2>
          <button onClick={handleGoToMap}>Go To Map</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </section>
  );
}
export default Login;
