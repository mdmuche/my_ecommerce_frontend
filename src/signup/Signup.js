import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(fullName, email, password);
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
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
