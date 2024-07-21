import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function UserProfileEdit() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        p: 2,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          p: 4,
          border: '1px solid #ddd',
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.6)', // Semi-transparent white background for the form
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontFamily: 'Poppins, sans-serif' // Apply the font family here
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="name"
          label="Name"
        />
        <TextField
          required
          id="password"
          label="New Password"
          type="password"
        />
        <TextField
          required
          id="email"
          label="Email"
        />
        <TextField
          required
          id="contactNumber"
          label="Contact Number"
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: '#1976d2', // Customize the blue color if needed
            fontSize: '1rem', // Increase font size
            px: 2, // Increase horizontal padding
            py: 1, // Increase vertical padding
            fontFamily: 'Poppins, sans-serif' // Apply the font family here
          }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
}
