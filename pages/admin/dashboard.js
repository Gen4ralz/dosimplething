import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useReducer } from 'react';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';
import { Store } from '../../utils/Store';
import NextLink from 'next/link';
import classes from '../../utils/classes';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement);

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function AdminDashboard() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter;
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/summary`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout title="Order History">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card sx={classes.section}>
            <List>
              <NextLink href="/admin/dashboard" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="Admin Dashboard"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/orders" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Orders"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/products" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Products"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/users" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Users"></ListItemText>
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card sx={classes.section}>
            <List>
              <ListItem>
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <Typography sx={classes.error}>{error}</Typography>
                ) : (
                  <Grid container spacing={5}>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1" align="center">
                            ฿{summary.ordersPrice}
                          </Typography>
                          <Typography align="center">Sales</Typography>
                        </CardContent>
                        <CardActions>
                          <NextLink href="/admin/orders" passHref>
                            <Button size="small" color="secondary" fullWidth>
                              View sales
                            </Button>
                          </NextLink>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1" align="center">
                            {summary.ordersCount}
                          </Typography>
                          <Typography align="center">Orders</Typography>
                        </CardContent>
                        <CardActions>
                          <NextLink href="/admin/orders" passHref>
                            <Button size="small" color="secondary" fullWidth>
                              View orders
                            </Button>
                          </NextLink>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1" align="center">
                            {summary.productsCount}
                          </Typography>
                          <Typography align="center">Products</Typography>
                        </CardContent>
                        <CardActions>
                          <NextLink href="/admin/products" passHref>
                            <Button size="small" color="secondary" fullWidth>
                              View products
                            </Button>
                          </NextLink>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1" align="center">
                            {summary.usersCount}
                          </Typography>
                          <Typography align="center">Users</Typography>
                        </CardContent>
                        <CardActions>
                          <NextLink href="/admin/users" passHref>
                            <Button size="small" color="secondary" fullWidth>
                              View users
                            </Button>
                          </NextLink>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Grid>
                )}
              </ListItem>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Sales Chart
                </Typography>
              </ListItem>
              <ListItem>
                <Bar
                  data={{
                    labels: summary.salesData.map((x) => x._id),
                    datasets: [
                      {
                        label: 'Sales',
                        backgroundColor: 'rgba(162, 222, 208, 1)',
                        data: summary.salesData.map((x) => x.totalSales),
                      },
                    ],
                  }}
                  options={{
                    legend: { display: true, position: 'right' },
                  }}
                ></Bar>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(AdminDashboard), { ssr: false });
