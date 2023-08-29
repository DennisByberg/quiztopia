import { useState } from "react";
import "./Login.scss";

function Login() {
  const serverUrl = "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com";

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");

  // Sign Up
  async function handleSignUp() {
    const body = {
      username,
      password,
    };
    const response = await fetch(`${serverUrl}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data: ISignUpApiResponse = await response.json();
    console.log("handleSignUp:", data);
  }

  // Log In
  async function handleLogin() {
    const body = {
      username: username,
      password: password,
    };
    const response = await fetch(`${serverUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data: ILoginApiResponse = await response.json();
    console.log(data);
  }

  return (
    <section className="login">
      <h1>Quiztopia</h1>
      <div className="login__container">
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username..."
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password..."
        />
        <button onClick={handleSignUp}> Sign Up </button>
        <button onClick={handleLogin}> Log In </button>
      </div>
    </section>
  );
}
export default Login;
