import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Link,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import jsCookie from 'js-cookie';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import classes from '../utils/classes';
import { Store } from '../utils/Store';

export default function Layout({ children, title, description }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: 'none',
          color: 'black',
        },
      },
    },
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.2rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      mode: 'light',
      background: {
        default: '#f5f5f5',
      },
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#ec5990',
      },
    },
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };

  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    jsCookie.remove('userInfo');
    jsCookie.remove('cartItems');
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>{title ? `${title} - Dosimple` : 'Dosimple'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={classes.appbar}>
          <Toolbar sx={classes.toolbar}>
            <Box display="flex" alignItems="center">
              <NextLink href="/" passHref>
                <Link>
                  <Typography sx={classes.brand}>Dosimple</Typography>
                </Link>
              </NextLink>
            </Box>
            <Box display="flex" alignItems="center">
              <NextLink href="/cart" passHref>
                <Link>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      Cart
                    </Badge>
                  ) : (
                    'Cart'
                  )}
                </Link>
              </NextLink>
              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    sx={classes.navbarButton}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, '/profile')}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, '/order-history')
                      }
                    >
                      Order History
                    </MenuItem>
                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, '/admin/dashboard')
                        }
                      >
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>
                    <Typography>Login</Typography>
                  </Link>
                </NextLink>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Container component="main" sx={classes.main}>
          {children}
        </Container>
        <Box component="footer" sx={classes.footer}>
          <Typography>Made with ❤️ by Dosimple</Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}
