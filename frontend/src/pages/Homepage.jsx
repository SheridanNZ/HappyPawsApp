import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import LoginMUI from "../components/LoginMUI";

const Homepage = () => {
  const [openLogin, setOpenLogin] = useState(false);

  // Toggle login modal
  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        padding: '20px',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to Happy Paws!
      </Typography>
      <Typography variant="body1" paragraph>
      Keeping paws happy and healthy, one check-up at a time.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenLogin}>
        Log In
      </Button>
      
      {/* The Login Modal */}
      <LoginMUI open={openLogin} handleClose={handleCloseLogin} />
    </Box>
  );
};

export default Homepage;
