import { useState } from 'react';
import client from '../api/client';

const MOMO_NUMBER = "0240000000";
const MOMO_NAME = "GODFEST";

const SPONSORSHIP_AREAS = [
  'Sound and Media',
  'Stage Setup',
  'Guest Artiste Support',
  'Publicity',
  'Venue and Logistics',
  'Youth Support',
  'General Sponsorship'
];

export default function Donate() {
  const [selectedType, setSelectedType] = useState(null);
  const [status, setStatus] = useState(null);
  const [submittedGift, setSubmittedGift] = useState(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    type: 'donation',
    sponsorshipArea: '',
    message: ''
  });

  const openModal = (type) => {
    setSelectedType(type);
    setStatus(null);
    setSubmittedGift(null);

    setForm({
      name: '',
      email: '',
      phone: '',
      amount: '',
      type,
      sponsorshipArea: type === 'sponsorship' ? 'General Sponsorship' : '',
      message: ''
    });
  };

  const closeModal = () => {
    setSelectedType(null);
    setStatus(null);
    setSubmittedGift(null);
  };

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');

    try {
      const payload = {
        ...form,
        amount: Number(form.amount)
      };

      const res = await client.post('/donate', payload);

      setSubmittedGift(res.data.donation);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      alert(err.response?.data?.message || 'Something went wrong.');
    }
  };

  const inputStyle = {
    background: '#111',
    border: '1px solid #333',
    color: '#fafafa',
    borderRadius: '10px',
    padding: '14px 16px',
    width: '100%',
    fontSize: '14px',
    outline: 'none',
  };

  const labelStyle = {
    fontSize: '12px',
    letterSpacing: '0.08em',
    color: '#888',
    marginBottom: '6px',
    display: 'block'
  };

  return (
    <main className="min-h-screen px-6 pt-32 pb-20" style={{ background: '#0a0a0a' }}>
      <div className="max-w-5xl mx-auto">

        <p className="text-xs tracking-widest mb-3 text-center" style={{ color: '#e91e8c' }}>
          GIVE
        </p>

        <h1
          className="font-display displayyy text-4xl md:text-5xl font-bold text-center mb-3"
          style={{ color: '#fafafa' }}
        >
          Support Godfest
        </h1>

        <p className="text-center text-sm max-w-2xl mx-auto mb-12" style={{ color: '#888' }}>
          Partner with us through a general donation or by sponsoring a specific area of the program.
          All MoMo payments will be reviewed and confirmed by the admin team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Donation Card */}
          <div
            className="rounded-3xl p-8"
            style={{ background: '#0d0d0d', border: '1px solid #e91e8c22' }}
          >
            <p className="text-xs tracking-widest mb-3" style={{ color: '#e91e8c' }}>
              GENERAL GIVING
            </p>

            <h2
              className="font-display displayyy text-3xl font-bold mb-4"
              style={{ color: '#fafafa' }}
            >
              Donation
            </h2>

            <p className="text-sm leading-relaxed mb-6" style={{ color: '#888' }}>
              Give any amount to support the overall Godfest program, including planning,
              worship, logistics, and general event needs.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {['Program Support', 'Event Logistics', 'General Support'].map(item => (
                <span
                  key={item}
                  className="text-xs px-3 py-1 rounded-full"
                  style={{ background: '#111', color: '#aaa', border: '1px solid #333' }}
                >
                  {item}
                </span>
              ))}
            </div>

            <button
              onClick={() => openModal('donation')}
              className="w-full py-4 rounded-full text-sm font-medium"
              style={{ background: '#e91e8c', color: '#fafafa' }}
            >
              Give a Donation
            </button>
          </div>

          {/* Sponsorship Card */}
          <div
            className="rounded-3xl p-8"
            style={{ background: '#0d0d0d', border: '1px solid #e91e8c55' }}
          >
            <p className="text-xs tracking-widest mb-3" style={{ color: '#e91e8c' }}>
              TARGETED SUPPORT
            </p>

            <h2
              className="font-display displayyy text-3xl font-bold mb-4"
              style={{ color: '#fafafa' }}
            >
              Sponsorship
            </h2>

            <p className="text-sm leading-relaxed mb-6" style={{ color: '#888' }}>
              Sponsor a specific area of Godfest. This is best for individuals, groups,
              or businesses who want their support connected to a clear need.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {['Media', 'Stage', 'Publicity', 'Youth Support'].map(item => (
                <span
                  key={item}
                  className="text-xs px-3 py-1 rounded-full"
                  style={{ background: '#111', color: '#aaa', border: '1px solid #333' }}
                >
                  {item}
                </span>
              ))}
            </div>

            <button
              onClick={() => openModal('sponsorship')}
              className="w-full py-4 rounded-full text-sm font-medium"
              style={{ background: 'transparent', color: '#e91e8c', border: '1px solid #e91e8c' }}
            >
              Become a Sponsor
            </button>
          </div>
        </div>
      </div>

      {/* Giving Modal */}
      {selectedType && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.78)' }}
        >
          <div
            className="w-full max-w-lg rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto"
            style={{ background: '#0d0d0d', border: '1px solid #e91e8c55' }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-sm"
              style={{ color: '#888' }}
            >
              ✕
            </button>

            {!submittedGift ? (
              <>
                <p className="text-xs tracking-widest mb-3" style={{ color: '#e91e8c' }}>
                  {selectedType === 'sponsorship' ? 'SPONSORSHIP' : 'DONATION'}
                </p>

                <h2
                  className="font-display displayyy text-2xl font-bold mb-3"
                  style={{ color: '#fafafa' }}
                >
                  {selectedType === 'sponsorship' ? 'Become a Sponsor' : 'Give a Donation'}
                </h2>

                <p className="text-sm mb-5" style={{ color: '#888' }}>
                  Fill this form first. After submitting, you will see the MoMo number and account name
                  to send your payment. Your giving will remain pending until the admin team confirms receipt.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label style={labelStyle}>FULL NAME</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>EMAIL</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>PHONE / WHATSAPP</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+233 XX XXX XXXX"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>AMOUNT (GH₵)</label>
                    <input
                      type="number"
                      name="amount"
                      value={form.amount}
                      onChange={handleChange}
                      required
                      min="1"
                      placeholder="Enter amount"
                      style={inputStyle}
                    />
                  </div>

                  {selectedType === 'sponsorship' && (
                    <div>
                      <label style={labelStyle}>SPONSORSHIP AREA</label>
                      <select
                        name="sponsorshipArea"
                        value={form.sponsorshipArea}
                        onChange={handleChange}
                        style={{ ...inputStyle, cursor: 'pointer' }}
                      >
                        {SPONSORSHIP_AREAS.map(area => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label style={labelStyle}>MESSAGE / NOTE OPTIONAL</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder={
                        selectedType === 'sponsorship'
                          ? 'You can add sponsor details, organization name, or any note...'
                          : 'Leave an encouraging word...'
                      }
                      rows={3}
                      style={{ ...inputStyle, resize: 'none' }}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-xs text-center" style={{ color: '#bf6a6a' }}>
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 rounded-full text-sm font-medium disabled:opacity-50"
                    style={{ background: '#e91e8c', color: '#fafafa' }}
                  >
                    {status === 'loading'
                      ? 'Submitting...'
                      : selectedType === 'sponsorship'
                        ? 'Submit Sponsorship Request'
                        : 'Submit Donation Request'}
                  </button>
                </form>
              </>
            ) : (
              <>
                <p className="text-xs tracking-widest mb-3" style={{ color: '#e91e8c' }}>
                  PAYMENT DETAILS
                </p>

                <h2
                  className="font-display displayyy text-2xl font-bold mb-3"
                  style={{ color: '#fafafa' }}
                >
                  Send MoMo Payment
                </h2>

                <p className="text-sm mb-5" style={{ color: '#888' }}>
                  Your {submittedGift.type} request has been submitted. Please send the exact amount
                  below. It will show as pending until the admin team confirms payment.
                </p>

                <div
                  className="rounded-xl p-5 mb-5 text-sm"
                  style={{ background: '#111', border: '1px solid #e91e8c55', color: '#fafafa' }}
                >
                  <p><strong>Name:</strong> {submittedGift.name}</p>
                  <p><strong>Type:</strong> {submittedGift.type.toUpperCase()}</p>

                  {submittedGift.type === 'sponsorship' && (
                    <p><strong>Sponsorship Area:</strong> {submittedGift.sponsorshipArea}</p>
                  )}

                  <p><strong>Amount:</strong> GH₵ {submittedGift.amount}</p>
                  <p><strong>Status:</strong> {submittedGift.status.toUpperCase()}</p>

                  <hr style={{ borderColor: '#333', margin: '14px 0' }} />

                  <p><strong>MoMo Number:</strong> {MOMO_NUMBER}</p>
                  <p><strong>Account Name:</strong> {MOMO_NAME}</p>
                </div>

                <div
                  className="rounded-xl p-4 mb-5 text-sm"
                  style={{ background: '#1a1200', border: '1px solid #6a5200', color: '#f5c542' }}
                >
                  Please use your full name as the payment reference if possible, so the admin team can easily confirm your payment.
                </div>

                <button
                  onClick={closeModal}
                  className="w-full py-3 rounded-full text-sm font-medium"
                  style={{ background: '#e91e8c', color: '#fafafa' }}
                >
                  Done
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}