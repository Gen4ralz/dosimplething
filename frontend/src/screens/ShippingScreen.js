import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import CheckoutWizard from '../components/CheckoutWizard';

export default function ShippingScreen() {
  const router = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [phone, setPhone] = useState(shippingAddress.phone || '');

  useEffect(() => {
    if (!userInfo) {
      router('/signin?redirect=/shipping');
    }
  }, [userInfo, router]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, phone },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({ fullName, address, phone })
    );
    router('/payment');
  };
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutWizard step1 step2 />
      <div className="container small-container">
        <h1 className="mb-4">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-4">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
