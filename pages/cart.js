import {
  Box,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from '@mui/material';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import NextLink from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import CustomButton from '../components/Button';
import classes from '../utils/classes';

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const { enqueueSnackbar } = useSnackbar();

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.stock < quantity) {
      enqueueSnackbar('Sorry . Product is out of stock', { variant: 'error' });
      return;
    }
    enqueueSnackbar(`${item.name} updated in cart`, { variant: 'info' });
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };
  const removeItemHandler = (item) => {
    enqueueSnackbar(`${item.name} has been deleted`, { variant: 'error' });
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const checkoutHandler = () => {
    router.push('/shipping');
  };
  return (
    <Layout title="Shopping Cart">
      <Typography component="h1" variant="h1">
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Box>
          Cart is empty.
          <NextLink href="/" passHref>
            <Link>
              <Button>Go to Shopping</Button>
            </Link>
          </NextLink>
        </Box>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <Card variant="outlined" sx={classes.section}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          <NextLink href={`/product/${item.slug}`} passHref>
                            <Link>
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={100}
                                height={100}
                              ></Image>
                            </Link>
                          </NextLink>
                        </TableCell>
                        <TableCell>
                          <NextLink href={`/product/${item.slug}`} passHref>
                            <Link>
                              <Typography>{item.name}</Typography>
                            </Link>
                          </NextLink>
                        </TableCell>
                        <TableCell align="right">
                          <Select
                            value={item.quantity}
                            size="small"
                            onChange={(e) =>
                              updateCartHandler(item, e.target.value)
                            }
                          >
                            {[...Array(item.stock).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell align="right">฿{item.price}</TableCell>
                        <TableCell align="right">
                          <Button
                            color="secondary"
                            variant="contained"
                            size="small"
                            onClick={() => removeItemHandler(item)}
                          >
                            x
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card variant="outlined" sx={classes.section}>
              <List>
                <ListItem>
                  <Typography>
                    Subtotal &nbsp;(
                    {cartItems.reduce((a, c) => a + c.quantity, 0)}
                    &nbsp;items)&nbsp;:&nbsp;
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                    &nbsp;Baht
                  </Typography>
                </ListItem>
                <ListItem>
                  <CustomButton
                    fullWidth
                    variant="contained"
                    onClick={checkoutHandler}
                  >
                    Check out
                  </CustomButton>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
