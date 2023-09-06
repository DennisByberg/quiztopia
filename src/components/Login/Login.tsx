import { useState } from "react";
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

  // Sign Up
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

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data: ISignUpApiResponse = await response.json();
      console.log("handleSignUp:", data);
    } catch (error) {
      console.error("Error in handleSignUp:", error);
    }
  }

  // Log In
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

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data: ILoginApiResponse = await response.json();
      console.log(data);

      if (data.token) {
        setToken(data.token);
        dispatch(
          setUser({ loggedInUser: username, loggedInToken: data.token })
        );
      }
    } catch (error) {
      console.error("Error in handleLogin:", error);
    }
  }

  return (
    <section className="login">
      {!token ? (
        <div className="login__container">
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter your username"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password..."
          />
          <button onClick={handleSignUp}> Sign Up </button>
          <button onClick={handleLogin}> Log In </button>
        </div>
      ) : (
        <div className="login__logged-in-container">
          <h2>Welcome {username}</h2>
          <button onClick={() => navigate("/game")}>PLAY</button>
        </div>
      )}
    </section>
  );
}
export default Login;
