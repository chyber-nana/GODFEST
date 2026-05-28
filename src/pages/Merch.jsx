import { useEffect, useState } from 'react';
import client from '../api/client';

export default function Merch() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get('/merch')
      .then(res => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen px-6 pt-32 pb-20" style={{ background: '#0a0a0a' }}>
      <div className="max-w-6xl mx-auto">

        <p className="text-xs tracking-widest mb-3 text-center" style={{ color: '#e91e8c' }}>OFFICIAL</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-3"
          style={{ color: '#fafafa' }}>Godfest Merch</h1>
        <p className="text-center text-sm mb-14" style={{ color: '#888' }}>
          Represent the movement. Every purchase supports the program.
        </p>

        {loading && (
          <div className="text-center py-20" style={{ color: '#888' }}>Loading products...</div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg" style={{ color: '#888' }}>Products coming soon.</p>
            <p className="text-sm mt-2" style={{ color: '#555' }}>Check back closer to the event.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="rounded-2xl overflow-hidden"
              style={{ background: '#0d0d0d', border: '1px solid #e91e8c22' }}>

              {/* Product image */}
              <div className="w-full aspect-square flex items-center justify-center"
                style={{ background: '#111' }}>
                {product.imageUrl ? (
                  <img src={`http://localhost:5000${product.imageUrl}`}
                    alt={product.name}
                    className="w-full h-full object-cover" />
                ) : (
                  <span style={{ color: '#333', fontSize: '48px' }}>✦</span>
                )}
              </div>

              {/* Product info */}
              <div className="p-5">
                <h3 className="font-display text-lg font-bold mb-1"
                  style={{ color: '#fafafa' }}>{product.name}</h3>
                <p className="text-sm mb-4" style={{ color: '#888' }}>{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg" style={{ color: '#e91e8c' }}>
                    GH₵ {product.price}
                  </span>
                  <button className="px-5 py-2 rounded-full text-xs font-medium transition-all hover:opacity-90"
                    style={{ background: '#e91e8c', color: '#fafafa' }}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}