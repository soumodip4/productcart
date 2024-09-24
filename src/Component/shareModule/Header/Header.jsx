import React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import { useSelector } from 'react-redux';

export default function SearchAppBar() {
  const { cart } = useSelector((state) => state.prod);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            AddToCart
          </Typography>
          <Link to="/cart">
            <IconButton aria-label="cart">
              <Badge badgeContent={cart?.length} color="primary">
                <ShoppingCartIcon sx={{ fontSize: '30px', color: 'black' }} />
              </Badge>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
