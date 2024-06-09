/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, Box, IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

const Logo = styled(Typography)({
  flexGrow: 1,
  fontWeight: 'bold',
  color: '#37474f',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#eceff1',
});

const StyledButton = styled(Button)(({ active }) => ({
  color: '#37474f',
  borderRadius: '0',
  borderBottom: active ? '2px solid #37474f' : 'none',
  '&:hover': {
    backgroundColor: 'rgba(55, 71, 79, 0.1)',
  },
}));

const Navbar = () => {
  const location = useLocation();

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo">
          <Inventory2OutlinedIcon style={{ color: '#37474f' }} />
        </IconButton>
        <Logo component={Link} to="/">
          STOCK TRACK
        </Logo>
        <Box>
          <StyledButton
            component={Link}
            to="/"
            active={location.pathname === '/'}
          >
            Products
          </StyledButton>
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

export default Navbar;
