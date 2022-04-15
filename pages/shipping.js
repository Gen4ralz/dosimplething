import { List, ListItem, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import jsCookie from 'js-cookie';
import Form from '../components/Form';
import { useForm, Controller } from 'react-hook-form';
import CustomButton from '../components/Button';
import dynamic from 'next/dynamic';
import CheckoutWizard from '../components/CheckoutWizard';

function Shipping() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  // const { redirect } = router.query; // login ? redirect=/shipping
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('phoneNumber', shippingAddress.phoneNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = ({ fullName, address, phoneNumber }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, phoneNumber },
    });
    jsCookie.set(
      'shippingAddress',
      JSON.stringify({ fullName, address, phoneNumber })
    );
    router.push('/payment');
  };
  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Typography component="h1" variant="h1">
          Shipping Address
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === 'minLength'
                        ? 'Full Name length is more than 1'
                        : 'Full Name is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="address"
                  label="Address"
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? errors.address.type === 'minLength'
                        ? 'Address length is more than 1'
                        : 'Address Name is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  error={Boolean(errors.phoneNumber)}
                  helperText={
                    errors.phoneNumber
                      ? errors.phoneNumber.type === 'minLength'
                        ? 'Phone Number length is more than 1'
                        : 'Phone Number is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <CustomButton fullWidth type="submit" variant="contained">
              Continue
            </CustomButton>
          </ListItem>
        </List>
      </Form>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Shipping), { ssr: false });
