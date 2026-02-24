import React, { useState } from 'react';
import '../styles/PaymentPage.css';
import PaymentForm from '../components/PaymentForm';

function PaymentPage() {
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePaymentSuccess = (transactionData) => {
    setPaymentStatus({
      status: 'success',
      message: 'Payment processed successfully!',
      transactionId: transactionData.transactionId
    });
    // Reset form after 3 seconds
    setTimeout(() => {
      setPaymentStatus(null);
    }, 5000);
  };

  const handlePaymentError = (error) => {
    setPaymentStatus({
      status: 'error',
      message: error
    });
  };

  return (
    <div className="payment-page">
      <section className="payment-hero">
        <h1>Support My Cultural Organisation</h1>
        <p>Your generous donation helps us preserve and promote cultural heritage</p>
      </section>

      <div className="payment-container">
        <div className="payment-info">
          <h2>Why Donate?</h2>
          <ul>
            <li>✓ Support cultural events and festivals</li>
            <li>✓ Fund artist mentorship programs</li>
            <li>✓ Preserve traditional art forms</li>
            <li>✓ Make culture accessible to all</li>
            <li>✓ Build a vibrant cultural community</li>
          </ul>

          <h3>Payment Methods Accepted</h3>
          <div className="payment-methods">
            <div className="method">💳 Credit Card</div>
            <div className="method">💳 Debit Card</div>
            <div className="method">📱 UPI</div>
            <div className="method">🏦 Bank Transfer</div>
            <div className="method">🏦 Net Banking</div>
            <div className="method">💰 Digital Wallets</div>
          </div>
        </div>

        <div className="payment-form-container">
          {paymentStatus && (
            <div className={`status-message ${paymentStatus.status}`}>
              <div className="status-icon">
                {paymentStatus.status === 'success' ? '✓' : '✕'}
              </div>
              <p>{paymentStatus.message}</p>
              {paymentStatus.transactionId && (
                <p className="transaction-id">Transaction ID: {paymentStatus.transactionId}</p>
              )}
            </div>
          )}
          <PaymentForm 
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </div>
      </div>

      <section className="donation-info">
        <h2>How Your Donation Helps</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>Events Creation</h3>
            <p>₹5,000 sponsors a cultural event for 100+ attendees</p>
          </div>
          <div className="info-card">
            <h3>Artist Support</h3>
            <p>₹2,000 provides mentorship for 10 emerging artists</p>
          </div>
          <div className="info-card">
            <h3>Community Programs</h3>
            <p>₹3,000 funds a workshop series for cultural learning</p>
          </div>
          <div className="info-card">
            <h3>Heritage Preservation</h3>
            <p>₹10,000 documents and archives traditional art forms</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PaymentPage;
