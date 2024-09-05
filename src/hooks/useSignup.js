import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (fullName, email, password) => {
    setIsLoading(true);
    setError(null);

    // Replace this with your actual signup API request
    const response = await fetch("http://localhost:4000/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    } else {
      // No need to dispatch LOGIN, as we're not logging in right after signup
      setIsLoading(false);

      // Navigate to login page after successful signup
      navigate("/login");
    }
  };

  return { signup, error, isLoading };
};
