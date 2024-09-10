import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // input validation
    if (!email || !password) {
      setFormError("Both email and password are required.");
      return;
    }

    setFormError(null); // Clear any existing form errors

    try {
      await login(email, password);

      // clear input fields on successful login
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("login error", error);
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button className="bg-dark" disabled={isLoading}>
        Log in
      </button>
      <p className="dont-account">
        Don't have an account <Link to={"/signup"}>Register</Link>
      </p>
      {formError && <div className="error">{formError}</div>}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
