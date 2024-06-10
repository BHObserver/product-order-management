/* eslint-disable import/no-extraneous-dependencies */
// Disables ESLint rule for importing dependencies not listed in package.json

// Import necessary modules and components from React and Material-UI
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, Box, IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

// Styling for the logo with MUI's styled API
const Logo = styled(Typography)({
  flexGrow: 1,
  fontWeight: 'bold',
  color: '#37474f',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

// Styling for the AppBar using MUI's styled API
const StyledAppBar = styled(AppBar)({
  backgroundColor: '#eceff1',
});

// Styling for the Button with conditional styling for active state
const StyledButton = styled(Button)(({ active }) => ({
  color: '#37474f',
  borderRadius: '0',
  borderBottom: active ? '2px solid #37474f' : 'none',
  '&:hover': {
    backgroundColor: 'rgba(55, 71, 79, 0.1)',
  },
}));

// Navbar functional component to display the navigation bar
const Navbar = () => {
  // Get the current location using useLocation hook from react-router-dom
  const location = useLocation();

  return (
    // AppBar component to create the navigation bar
    <StyledAppBar position="static">
      {/* Toolbar component to hold the contents of the navigation bar */}
      <Toolbar>
        {/* IconButton to display the logo */}
        <IconButton edge="start" color="inherit" aria-label="logo">
          <Inventory2OutlinedIcon style={{ color: '#37474f' }} />
        </IconButton>
        {/* Logo component with a link to the home page */}
        <Logo component={Link} to="/">
          STOCK TRACK
        </Logo>
        {/* Box component to hold the navigation buttons */}
        <Box>
          {/* Button component for the Products link with active styling based on the current location */}
          <StyledButton
            component={Link}
            to="/"
            active={location.pathname === '/'}
          >
            Products
          </StyledButton>
          {/* Button component for the Orders link with active styling based
              on the current location */}
          <StyledButton
            component={Link}
            to="/orders"
            active={location.pathname.startsWith('/orders')}
          >
            Orders
          </StyledButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

// Exporting the Navbar component as the default export
export default Navbar;
