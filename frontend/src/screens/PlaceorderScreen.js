import React, { useContext } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Card from 'react-bootstrap/esm/Card';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import { Helmet } from 'react-helmet-async';
import CheckoutWizard from '../components/CheckoutWizard';
import { Store } from '../Store';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import { useEffect } from 'react';

export default function PlaceorderScreen() {
  const router = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  cart.shippingPrice = 0;

  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

  const placeOrderHandler = async () => {};

  useEffect(() => {
    if (!cart.paymentMethod) {
      router('/payment');
    }
  }, [cart, router]);

  return (
    <div>
      <CheckoutWizard step1 step2 step3 step4 />
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="py-4">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name: </strong>
                {cart.shippingAddress.fullName} <br />
                <strong>Address: </strong>
                {cart.shippingAddress.address} <br />
                <strong>Phone: </strong>
                {cart.shippingAddress.phone} <br />
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method: </strong>
                {cart.paymentMethod} <br />
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.imageHome}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        />
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>{item.price} Baht</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Items{' '}
                      <strong>
                        ({cart.cartItems.reduce((a, c) => a + c.quantity, 0)})
                        pcs.
                      </strong>
                    </Col>
                    <Col>{cart.itemsPrice} Baht</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{cart.shippingPrice} Baht</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>{cart.totalPrice} Baht</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}
                    >
                      Place Order
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
