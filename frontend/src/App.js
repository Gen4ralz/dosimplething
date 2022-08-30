import data from './data';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a href="/">Dosimple</a>
      </header>
      <main>
        <h1>Featured Products</h1>
        <div className="products">
          {data.products.map((product) => (
            <div className="product" key={product.slug}>
              <a href={`/product/${product.slug}`}>
                <img src={product.imageHome} alt={product.name} />
              </a>
              <div className="product-info">
                <p>{product.name}</p>
                <p>
                  <strong>{product.price} ฿</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
