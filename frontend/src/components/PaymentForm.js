import React, { useState } from 'react';
import { loadScript } from '../services/scriptLoader';
import '../styles/PaymentForm.css';

function PaymentForm({ onSuccess, onError }) {
  const [formData, setFormData] = useState({
    eventName: '',
    donorName: '',
    contactNumber: '',
    email: '',
    repName: '',
    amount: '500',
    validDate: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const events = [
    'Classical Music Festival',
    'Kathak Dance Workshop',
    'Cultural Food Festival',
    'Art Exhibition',
    'Language & Literature Fest',
    'Summer Cultural Camp',
    'Heritage Preservation Seminar',
    'Traditional Crafts Exhibition'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.eventName) newErrors.eventName = 'Event name is required';
    if (!formData.donorName) newErrors.donorName = 'Donor name is required';
    if (formData.contactNumber && !/^\d{10}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
      newErrors.contactNumber = 'Please enter a valid 10-digit phone number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.amount || formData.amount < 100) {
      newErrors.amount = 'Amount must be at least ₹100';
    }
    if (!formData.validDate) newErrors.validDate = 'Valid date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Load Razorpay script
      await loadScript('https://checkout.razorpay.com/v1/checkout.js');

      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: parseInt(formData.amount) * 100, // Convert to paise
          currency: 'INR',
          eventName: formData.eventName,
          donorName: formData.donorName,
          contactNumber: formData.contactNumber,
          email: formData.email,
          repName: formData.repName,
          validDate: formData.validDate
        })
      });

      const order = await response.json();

      if (!order.id) {
        throw new Error('Failed to create order');
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY || 'test_key',
        amount: order.amount,
        currency: order.currency,
        name: 'My Cultural Organisation',
        description: `Donation for ${formData.eventName}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                formData: formData,
                amount: formData.amount
              })
            });

            const verifyResult = await verifyResponse.json();

            if (verifyResult.success) {
              onSuccess({
                transactionId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id
              });
              setFormData({
                eventName: '',
                donorName: '',
                contactNumber: '',
                email: '',
                repName: '',
                amount: '500',
                validDate: ''
              });
            } else {
              onError('Payment verification failed');
            }
          } catch (error) {
            onError('Payment verification error: ' + error.message);
          }
        },
        prefill: {
          name: formData.donorName,
          email: formData.email,
          contact: formData.contactNumber
        },
        theme: {
          color: '#667eea'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      onError('Payment initialization error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h2>Make Your Donation</h2>

      <div className="form-group">
        <label htmlFor="eventName">Event Name *</label>
        <select
          id="eventName"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          className={errors.eventName ? 'error' : ''}
        >
          <option value="">Select an event</option>
          {events.map(event => (
            <option key={event} value={event}>{event}</option>
          ))}
        </select>
        {errors.eventName && <span className="error-message">{errors.eventName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="donorName">Donor Name *</label>
        <input
          type="text"
          id="donorName"
          name="donorName"
          value={formData.donorName}
          onChange={handleChange}
          placeholder="Your full name"
          className={errors.donorName ? 'error' : ''}
        />
        {errors.donorName && <span className="error-message">{errors.donorName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="contactNumber">Contact Number</label>
        <input
          type="tel"
          id="contactNumber"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="10-digit phone number (optional)"
          className={errors.contactNumber ? 'error' : ''}
        />
        {errors.contactNumber && <span className="error-message">{errors.contactNumber}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com (optional)"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="repName">MCO Representative Name</label>
        <input
          type="text"
          id="repName"
          name="repName"
          value={formData.repName}
          onChange={handleChange}
          placeholder="Representative name (optional)"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="amount">Donation Amount *</label>
          <div className="amount-input">
            <span className="currency">₹</span>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="500"
              min="100"
              className={errors.amount ? 'error' : ''}
            />
          </div>
          {errors.amount && <span className="error-message">{errors.amount}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="validDate">Valid Until *</label>
          <input
            type="date"
            id="validDate"
            name="validDate"
            value={formData.validDate}
            onChange={handleChange}
            className={errors.validDate ? 'error' : ''}
          />
          {errors.validDate && <span className="error-message">{errors.validDate}</span>}
        </div>
      </div>

      <button 
        type="submit" 
        className="submit-btn"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Proceed to Payment'}
      </button>

      <p className="form-disclaimer">
        Your information is secure. We accept UPI, Debit Cards, Credit Cards, and Bank Transfers.
      </p>
    </form>
  );
}

export default PaymentForm;
