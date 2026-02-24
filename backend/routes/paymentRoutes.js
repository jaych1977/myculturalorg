import express from 'express';
import { initiatePayment, verifyPayment } from '../controllers/paymentController.js';

const router = express.Router();

// Create payment order
router.post('/create-order', initiatePayment);

// Verify payment and save to Google Sheets
router.post('/verify-payment', verifyPayment);

export default router;
