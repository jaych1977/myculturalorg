import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'test_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'test_secret'
});

export const initiatePayment = async (req, res) => {
  try {
    const { amount, currency, eventName, donorName } = req.body;

    const options = {
      amount: amount, // Amount in paise
      currency: currency || 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        eventName: eventName,
        donorName: donorName
      }
    };

    const order = await razorpayInstance.orders.create(options);

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order', details: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      formData,
      amount
    } = req.body;

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'test_secret')
      .update(body)
      .digest('hex');

    const isValidSignature = crypto.timingSafeEqual(
      Buffer.from(razorpay_signature),
      Buffer.from(expectedSignature)
    );

    if (!isValidSignature) {
      return res.status(400).json({ success: false, error: 'Invalid signature' });
    }

    // Payment is verified, save to Google Sheets
    const sheetsResult = await saveToGoogleSheets({
      transactionId: razorpay_payment_id,
      orderId: razorpay_order_id,
      eventName: formData.eventName,
      donorName: formData.donorName,
      contactNumber: formData.contactNumber,
      email: formData.email,
      repName: formData.repName,
      amount: amount,
      currency: 'INR',
      validDate: formData.validDate,
      paymentDate: new Date().toLocaleDateString('en-IN')
    });

    res.json({
      success: true,
      message: 'Payment verified and recorded successfully',
      paymentId: razorpay_payment_id,
      sheetsResult: sheetsResult
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, error: 'Verification failed', details: error.message });
  }
};

// Mock function for Google Sheets integration
// In production, replace with actual Google Sheets API
async function saveToGoogleSheets(paymentData) {
  try {
    // TODO: Implement Google Sheets API integration
    // For now, we'll just log the data
    console.log('Payment data to be saved:', paymentData);

    // This is where you would use the Google Sheets API
    // Import { google } from 'googleapis';
    // Use service account credentials to authenticate
    // Update spreadsheet with payment data

    return {
      success: true,
      message: 'Data would be saved to Google Sheets',
      data: paymentData
    };
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    throw error;
  }
}
