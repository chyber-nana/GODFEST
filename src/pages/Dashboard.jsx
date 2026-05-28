import { useEffect, useState } from 'react';
import client from '../api/client';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productForm, setProductForm] = useState({ name: '', description: '', price: '', stock: '' });
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState(null); // tracks which attendee is being deleted

  const fetchData = () => {
    client.get('/dashboard')
      .then(res => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleProductSubmit = async e => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    Object.entries(productForm).forEach(([k, v]) => formData.append(k, v));
    if (image) formData.append('image', image);
    try {
      await client.post('/merch', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadMsg('Product added successfully!');
      setProductForm({ name: '', description: '', price: '', stock: '' });
      setImage(null);
      fetchData();
    } catch {
      setUploadMsg('Failed to add product.');
    } finally {
      setUploading(false);
    }
  };

  const deleteProduct = async id => {
    if (!confirm('Delete this product?')) return;
    await client.delete(`/merch/${id}`);
    fetchData();
  };

  const deleteAttendee = async (id, name) => {
    if (!confirm(`Remove ${name} from the registration list?`)) return;
    setDeleting(id);
    try {
      await client.delete(`/register/${id}`);
      fetchData();
    } catch (err) {
      alert('Failed to delete attendee.');
    } finally {
      setDeleting(null);
    }
  };

  const filteredAttendees = data?.attendees?.filter(a => {
    const q = search.toLowerCase();
    return (
      a.firstName.toLowerCase().includes(q) ||
      a.lastName.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q)
    );
  });

  const inputStyle = {
    background: '#111', border: '1px solid #333', color: '#fafafa',
    borderRadius: '10px', padding: '12px 14px', width: '100%',
    fontSize: '13px', outline: 'none',
  };

  if (loading) return (
    <main className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0a' }}>
      <p style={{ color: '#888' }}>Loading dashboard...</p>
    </main>
  );

  return (
    <main className="min-h-screen px-6 pt-32 pb-20" style={{ background: '#0a0a0a' }}>
      <div className="max-w-6xl mx-auto">

        <h1 className="font-display text-4xl font-bold mb-2" style={{ color: '#fafafa' }}>Dashboard</h1>
        <p className="text-sm mb-10" style={{ color: '#888' }}>Admin panel — Godfest 2026</p>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Registered', value: data?.attendees?.length ?? 0 },
            { label: 'Products', value: data?.products?.length ?? 0 },
            { label: 'Donations', value: data?.donations?.length ?? 0 },
            { label: 'Total Raised', value: `GH₵ ${data?.totalDonations ?? 0}` },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-2xl p-6"
              style={{ background: '#0d0d0d', border: '1px solid #e91e8c22' }}>
              <p className="text-xs tracking-widest mb-2" style={{ color: '#e91e8c' }}>{label.toUpperCase()}</p>
              <p className="font-display text-3xl font-bold" style={{ color: '#fafafa' }}>{value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Attendees list */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-bold" style={{ color: '#fafafa' }}>
                Registrations
                <span className="text-sm font-normal ml-2" style={{ color: '#888' }}>
                  ({filteredAttendees?.length ?? 0})
                </span>
              </h2>
            </div>

            {/* Search */}
            <input
              placeholder="Search by name or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ ...inputStyle, marginBottom: '12px' }}
            />

            <div className="flex flex-col gap-3 overflow-y-auto pr-1" style={{ maxHeight: '520px' }}>
              {filteredAttendees?.length === 0 && (
                <p className="text-sm" style={{ color: '#555' }}>
                  {search ? 'No results found.' : 'No registrations yet.'}
                </p>
              )}
              {filteredAttendees?.map(a => (
                <div key={a._id}
                  className="rounded-xl p-4 flex items-center justify-between gap-3"
                  style={{ background: '#0d0d0d', border: '1px solid #222' }}>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: '#fafafa' }}>
                      {a.firstName} {a.lastName}
                    </p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: '#888' }}>{a.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: a.ticketType === 'vip' ? '#e91e8c22' : '#ffffff11',
                          color: a.ticketType === 'vip' ? '#e91e8c' : '#888'
                        }}>
                        {a.ticketType.toUpperCase()}
                      </span>
                      <span className="text-xs" style={{ color: '#555' }}>
                        {new Date(a.registeredAt).toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => deleteAttendee(a._id, `${a.firstName} ${a.lastName}`)}
                    disabled={deleting === a._id}
                    className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80 disabled:opacity-40"
                    style={{ background: '#2a0a0a', color: '#bf6a6a', border: '1px solid #6a2a2a' }}>
                    {deleting === a._id ? '...' : 'Remove'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — add product + products list */}
          <div>
            <h2 className="font-display text-xl font-bold mb-5" style={{ color: '#fafafa' }}>Add Product</h2>
            <form onSubmit={handleProductSubmit} className="flex flex-col gap-4"
              style={{ background: '#0d0d0d', border: '1px solid #e91e8c22', borderRadius: '16px', padding: '24px' }}>
              <input name="name" value={productForm.name} placeholder="Product name"
                onChange={e => setProductForm(p => ({ ...p, name: e.target.value }))}
                required style={inputStyle} />
              <input name="description" value={productForm.description} placeholder="Description"
                onChange={e => setProductForm(p => ({ ...p, description: e.target.value }))}
                style={inputStyle} />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" name="price" value={productForm.price} placeholder="Price (GH₵)"
                  onChange={e => setProductForm(p => ({ ...p, price: e.target.value }))}
                  required style={inputStyle} />
                <input type="number" name="stock" value={productForm.stock} placeholder="Stock qty"
                  onChange={e => setProductForm(p => ({ ...p, stock: e.target.value }))}
                  style={inputStyle} />
              </div>
              <div>
                <label className="text-xs block mb-2" style={{ color: '#888' }}>PRODUCT IMAGE</label>
                <input type="file" accept="image/*"
                  onChange={e => setImage(e.target.files[0])}
                  style={{ ...inputStyle, padding: '10px' }} />
              </div>
              {uploadMsg && (
                <p className="text-xs text-center"
                  style={{ color: uploadMsg.includes('success') ? '#6abf6a' : '#bf6a6a' }}>
                  {uploadMsg}
                </p>
              )}
              <button type="submit" disabled={uploading}
                className="w-full py-3 rounded-full text-sm font-medium transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: '#e91e8c', color: '#fafafa' }}>
                {uploading ? 'Uploading...' : 'Add Product'}
              </button>
            </form>

            <h2 className="font-display text-xl font-bold mt-8 mb-4" style={{ color: '#fafafa' }}>Products</h2>
            <div className="flex flex-col gap-3">
              {data?.products?.length === 0 && (
                <p className="text-sm" style={{ color: '#555' }}>No products yet.</p>
              )}
              {data?.products?.map(p => (
                <div key={p._id} className="flex items-center justify-between rounded-xl p-4"
                  style={{ background: '#0d0d0d', border: '1px solid #222' }}>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#fafafa' }}>{p.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#888' }}>GH₵ {p.price} · Stock: {p.stock}</p>
                  </div>
                  <button onClick={() => deleteProduct(p._id)}
                    className="text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                    style={{ background: '#2a0a0a', color: '#bf6a6a', border: '1px solid #6a2a2a' }}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}