import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

const SignupMUI = ({ handleSwitchView }) => { // Added prop for view switching
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:9000/api/users/register", formData);
      console.log("User registered successfully:", response.data);
      
      // Assuming your API returns the user object in response.data.user
      login(response.data.user); // Updated to use proper user data
      handleSwitchView('login'); // Switch back to login view after successful registration
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" align="center">Sign Up</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          {/* ... (keep existing form fields the same) ... */}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Sign Up
          </Button>
        </form>
        <Button 
          fullWidth 
          sx={{ mt: 2 }} 
          onClick={() => handleSwitchView('login')} // Added back to login
        >
          Already have an account? Log In
        </Button>
      </Box>
    </Container>
  );
};

export default SignupMUI;