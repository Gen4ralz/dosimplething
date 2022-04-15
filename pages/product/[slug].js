import React, { useContext } from 'react';
import {
  Box,
  Typography,
  Link,
  Grid,
  List,
  ListItem,
  Card,
  Button,
  Rating,
} from '@mui/material';
import Layout from '../../components/Layout';
import NextLink from 'next/link';
import classes from '../../utils/classes';
import Image from 'next/image';
import db from '../../utils/db';
import Product from '../../models/Product';
import axios from 'axios';
import { Store } from '../../utils/Store';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import CustomButton from '../../components/Button';

function ProductScreen(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { product } = props;
  const { enqueueSnackbar } = useSnackbar();

  if (!product) {
    return <Box>Product Not Found</Box>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.stock < quantity) {
      enqueueSnackbar('Sorry . Product is out of stock', { variant: 'error' });
      return;
    }
    enqueueSnackbar(`${product.name} added to cart`, { variant: 'success' });
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout title={product.name} description={product.description}>
      <Box sx={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Button>
              <Typography>back to products</Typography>
            </Button>
          </Link>
        </NextLink>
      </Box>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={1080}
            height={1350}
            layout="responsive"
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <Card variant="outlined">
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  {product.name}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>Category: {product.category}</Typography>
              </ListItem>
              <ListItem>Brand: {product.brand}</ListItem>
              <ListItem>
                <Rating value={product.rating} precision={0.25} readOnly />
                {product.rating} &nbsp; ({product.numReviews} reviews)
              </ListItem>
              <ListItem>
                <Typography> Description: {product.description}</Typography>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card variant="outlined">
            <List>
              <ListItem>
                <Grid item xs={6}>
                  <Typography>Price</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>฿{product.price}</Typography>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid item xs={6}>
                  <Typography>Status</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {product.stock > 0 ? 'In stock' : 'Out of stock'}
                  </Typography>
                </Grid>
              </ListItem>
              <ListItem>
                <CustomButton
                  fullWidth
                  variant="contained"
                  color={product.stock > 0 ? 'primary' : 'secondary'}
                  onClick={addToCartHandler}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of stock'}
                </CustomButton>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(ProductScreen), { ssr: false });

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
