import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CheckoutWizard from '../components/CheckoutWizard';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';

export default function PaymentScreen() {
  const router = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'Paypal'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      router('/shipping');
    }
  }, [shippingAddress, router]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    router('/placeorder');
  };
  return (
    <div>
      <CheckoutWizard step1 step2 step3 />;
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="mb-4">Payment</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-4">
            <Form.Check
              type="radio"
              id="Paypal"
              label="Paypal"
              value="Paypal"
              checked={paymentMethodName === 'Paypal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Form.Check
              type="radio"
              id="Cash On Delivery"
              label="Cash On Delivery"
              value="Cash On Delivery"
              checked={paymentMethodName === 'Cash On Delivery'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div>
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
