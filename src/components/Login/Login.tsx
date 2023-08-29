import { useState } from "react";
import "./Login.scss";

function Login() {
  const serverUrl = "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com";

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
    const data: any = await response.json(); // ANY!!!!
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
    const data: any = await response.json(); // ANY!!!!
    console.log(data);
  }

  return (
    <section className="login">
      <input type="text" placeholder="Username..." />
      <input type="password" placeholder="Password..." />
      <button onClick={handleSignUp}> Skapa användare </button>
      <button onClick={handleLogin}> Logga in </button>
    </section>
  );
}
export default Login;
