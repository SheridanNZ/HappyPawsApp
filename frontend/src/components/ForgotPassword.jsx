import React from 'react';
import { TextField, Button, Box, DialogActions, DialogContent, Typography } from '@mui/material';

const ForgotPassword = ({ handleSwitchView }) => {
  return (
    <Box>
      <Typography variant="h6">Forgot Your Password?</Typography>
      <TextField
        fullWidth
        label="Enter Your Email"
        margin="normal"
        variant="outlined"
        type="email"
      />
      <DialogActions>
        <Button onClick={() => handleSwitchView('login')} color="primary">Back to Login</Button>
        <Button color="primary">Reset Password</Button>
      </DialogActions>
    </Box>
  );
};

export default ForgotPassword;
