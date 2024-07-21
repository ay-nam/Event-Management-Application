import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Email from '@mui/icons-material/Email';
import Phone from '@mui/icons-material/Phone';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const navigate = useNavigate();

  const handleEditProfileClick = () => {
    navigate('/user-profile-edit');
  };

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
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 4,
          border: '1px solid #ddd',
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.6)', 
          maxWidth: 300, 
          width: '100%', 
          textAlign: 'center' 
        }}
      >
        <Avatar
          sx={{
            width: 150,
            height: 150,
            mb: 3 
          }}
          alt="User Profile Photo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb2f8T8QI-JROiXFRs54zqVaFDUABuJUbTSpyDhyC5rHtvdB4grpNwZ4KFRb3WFBk6Ysk&usqp=CAU" 
        />
        
        <FormControl variant="standard" fullWidth sx={{ mb: 3 }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            Name
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
            sx={{ fontSize: '1.2rem' }}
          />
        </FormControl>
        
        <TextField
          id="input-with-icon-textfield-email"
          label="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
            sx: { fontSize: '1.2rem' }
          }}
          variant="standard"
          fullWidth
          sx={{ mb: 3 }}
        />
        
        <TextField
          id="input-with-icon-textfield-phone"
          label="Contact Number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone />
              </InputAdornment>
            ),
            sx: { fontSize: '1.2rem' }
          }}
          variant="standard"
          fullWidth
          sx={{ mb: 3 }}
        />
        
        <Button
          onClick={handleEditProfileClick}
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: '#1976d2',
            fontSize: '1rem',
            px: 2,
            py: 2
          }}
        >
          Edit Profile
        </Button>

      </Box>
    </Box>
  );
}