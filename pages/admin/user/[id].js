import {
  Button,
  Card,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import Layout from '../../../components/Layout';
import { getError } from '../../../utils/error';
import { Store } from '../../../utils/Store';
import NextLink from 'next/link';
import classes from '../../../utils/classes';
import { Controller, useForm } from 'react-hook-form';
import Form from '../../../components/Form';
import { useSnackbar } from 'notistack';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return { ...state, loadingUpload: false, errorUpload: '' };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
}

function UserEdit({ params }) {
  const userId = params.id;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const { state } = useContext(Store);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const { userInfo } = state;
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    } else {
      const fetchData = async () => {
        try {
          dispatch({ type: 'FETCH_REQUEST' });
          // reqest data from backend api
          const { data } = await axios.get(`/api/admin/users/${userId}`, {
            headers: { authorization: `Bearer ${userInfo.token}` },
          });
          setIsAdmin(data.isAdmin);
          dispatch({ type: 'FETCH_SUCCESS' });
          setValue('name', data.name);
        } catch (err) {
          dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
        }
      };
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = async ({ name }) => {
    closeSnackbar();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/admin/users/${userId}`,
        {
          name,
          isAdmin,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      enqueueSnackbar('User updated successfully', { variant: 'success' });
      router.push('/admin/users');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL' });
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  return (
    <Layout title={`Edit User ${userId}`}>
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card sx={classes.section}>
            <List>
              <NextLink href="/admin/dashboard" passHref>
                <ListItem button component="a">
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
                <ListItem selected button component="a">
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
                <Typography component="h1" variant="h1">
                  Edit User {userId}
                </Typography>
              </ListItem>
              <ListItem>
                {loading && <CircularProgress />}
                {error && <Typography sx={classes.error}>{error}</Typography>}
              </ListItem>
              <ListItem>
                <Form onSubmit={handleSubmit(submitHandler)}>
                  <List>
                    <ListItem>
                      <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="name"
                            label="Name"
                            error={Boolean(errors.name)}
                            helperText={errors.name ? 'Name is required' : ''}
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    </ListItem>
                    <ListItem>
                      <FormControlLabel
                        label="Is Admin"
                        control={
                          <Checkbox
                            onClick={(e) => setIsAdmin(e.target.checked)}
                            checked={isAdmin}
                            name="isAdmin"
                          ></Checkbox>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <Button type="submit" fullWidth variant="contained">
                        Update
                      </Button>
                      {loadingUpdate && <CircularProgress />}
                    </ListItem>
                  </List>
                </Form>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: { params },
  };
}

export default dynamic(() => Promise.resolve(UserEdit), { ssr: false });
