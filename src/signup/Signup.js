import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //input validation
    if (!fullName || !email || !password) {
      setFormError("Both email and password are required.");
      return;
    }

    setFormError(null); // Clear any existing form errors

    try {
      await signup(fullName, email, password);

      // clear input fields on successful login
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("register error", error);
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>FullName:</label>
      <input
        type="text"
        onChange={(e) => setFullName(e.target.value)}
        value={fullName}
      />

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
        Sign up
      </button>
      <p className="dont-account">
        Already have an account <Link to={"/login"}>Login</Link>
      </p>
      {formError && <div className="error">{formError}</div>}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
