import jsCookie from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import CheckoutWizard from '../components/CheckoutWizard';
import Form from '../components/Form';
import {
  Card,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import CustomButton from '../components/Button';
import { useSnackbar } from 'notistack';
import classes from '../utils/classes';

export default function Payment() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;
  const [paymentMethod, setPaymentMethod] = useState('');
  const router = useRouter();
  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
    } else {
      setPaymentMethod(jsCookie.get('paymentMethod') || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const submitHandler = (e) => {
    closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar('Payment method is required.', { variant: 'error' });
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      jsCookie.set('paymentMethod', paymentMethod);
      router.push('/placeorder');
    }
  };
  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <Form onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Payment Method
        </Typography>
      </Form>
      <Card variant="outlined" sx={classes.section}>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label="PayPal"
                  value="PayPal"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Bank Trasnfer"
                  value="banktransfer"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Bitcoin"
                  value="btc"
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <CustomButton fullWidth variant="contained" onClick={submitHandler}>
              Continue
            </CustomButton>
          </ListItem>
          <ListItem>
            <CustomButton
              fullWidth
              variant="outlined"
              onClick={() => router.push('/shipping')}
            >
              Back
            </CustomButton>
          </ListItem>
        </List>
      </Card>
    </Layout>
  );
}
