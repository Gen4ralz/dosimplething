import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HomeScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products');
      setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img src={product.imageHome} alt={product.name} />
            </Link>
            <div className="product-info">
              <p>{product.name}</p>
              <p>
                <strong>{product.price} ฿</strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
