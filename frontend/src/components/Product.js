import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Product(props) {
  const { product } = props;
  return (
    <div>
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.imageHome}
          className="card-img-top"
          alt={product.name}
        />
      </Link>
      <Card.Body>
        <p className="mb-2 mt-2">{product.name}</p>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <p className="mb-0 mt-2">
          <strong>{product.price} ฿</strong>
        </p>
      </Card.Body>
    </div>
  );
}

export default Product;
