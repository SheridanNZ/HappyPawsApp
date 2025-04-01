import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Typography } from '@mui/material';
import SignupMUI from './SignupMUI';
import ForgotPassword from './ForgotPassword';

const LoginMUI = ({ open, handleClose }) => {
  const [view, setView] = useState('login'); // Controls which view to show (Login, Signup, ForgotPassword)

  const handleSwitchView = (viewType) => {
    setView(viewType);
  };

  const renderContent = () => {
    switch (view) {
      case 'signup':
        return <SignupMUI handleSwitchView={handleSwitchView} />;
      case 'forgotPassword':
        return <ForgotPassword handleSwitchView={handleSwitchView} />;
      default:
        return (
          <Box>
            <Typography variant="h6">Login to Your Account</Typography>
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              variant="outlined"
              type="email"
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              variant="outlined"
              type="password"
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">Cancel</Button>
              <Button onClick={handleClose} color="primary">Login</Button>
            </DialogActions>
            <Box textAlign="center">
              <Button color="primary" onClick={() => handleSwitchView('signup')}>Sign Up</Button>
              <Button color="secondary" onClick={() => handleSwitchView('forgotPassword')}>Forgot Password?</Button>
            </Box>
          </Box>
        );
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default LoginMUI;
