import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
  Switch,
  Picker,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, DefaultEvents, PaymentMethods, Currency } from '../constants';
import {
  validatePaymentForm,
  createPaymentRecord,
  formatCurrency,
  simulatePaymentGateway,
  validateEmail,
  validatePhoneNumber,
} from '../utils/paymentUtils';
import { submitPaymentToGoogleForm } from '../services/googleSheetsService';
import { PaymentFormData } from '../types';

/**
 * Payment Screen Component
 * Handles payment collection with validation
 */
const PaymentScreen: React.FC = () => {
  const [formData, setFormData] = useState<PaymentFormData>({
    eventName: '',
    donorName: '',
    contactNumber: '',
    email: '',
    representativeName: '',
    paymentValidDate: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
    paymentMethod: 'UPI',
    amount: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [transactionId, setTransactionId] = useState('');

  /**
   * Handle input changes
   */
  const handleInputChange = (field: keyof PaymentFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  /**
   * Validate individual field
   */
  const validateField = (field: keyof PaymentFormData) => {
    const fieldErrors: { [key: string]: string } = {};

    switch (field) {
      case 'eventName':
        if (!formData.eventName.trim()) {
          fieldErrors.eventName = 'Event name is required';
        }
        break;
      case 'donorName':
        if (!formData.donorName.trim()) {
          fieldErrors.donorName = 'Donor name is required';
        }
        break;
      case 'contactNumber':
        if (formData.contactNumber && !validatePhoneNumber(formData.contactNumber)) {
          fieldErrors.contactNumber = 'Invalid 10-digit phone number';
        }
        break;
      case 'email':
        if (formData.email && !validateEmail(formData.email)) {
          fieldErrors.email = 'Invalid email format';
        }
        break;
      case 'amount':
        if (formData.amount <= 0) {
          fieldErrors.amount = 'Amount must be greater than zero';
        }
        break;
    }

    setErrors(prev => ({ ...prev, ...fieldErrors }));
    return Object.keys(fieldErrors).length === 0;
  };

  /**
   * Handle date change
   */
  const handleDateChange = (days: number) => {
    const newDate = new Date(formData.paymentValidDate);
    newDate.setDate(newDate.getDate() + days);
    handleInputChange('paymentValidDate', newDate);
  };

  /**
   * Format and validate amount input
   */
  const handleAmountChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    handleInputChange('amount', numValue);
  };

  /**
   * Process payment
   */
  const handlePayment = async () => {
    // Validate form
    const validation = validatePaymentForm(formData);
    if (!validation.isValid) {
      Alert.alert('Validation Error', validation.errors.join('\n'));
      return;
    }

    setIsLoading(true);
    try {
      // Simulate payment gateway processing
      const paymentResult = await simulatePaymentGateway(
        formData.paymentMethod,
        formData.amount
      );

      // Create payment record
      const paymentRecord = createPaymentRecord(formData);
      paymentRecord.transactionId = paymentResult.transactionId;

      // Try to submit to Google Sheets
      try {
        await submitPaymentToGoogleForm(paymentRecord);
        console.log('Payment recorded in Google Sheets');
      } catch (sheetsError) {
        console.warn(
          'Could not save to Google Sheets (check configuration)',
          sheetsError
        );
        // Continue with local success even if Google Sheets fails
      }

      // Show success message
      setTransactionId(paymentResult.transactionId);
      setSuccessMessage(
        `Payment successful!\n\nTransaction ID: ${paymentResult.transactionId}\nAmount: ${formatCurrency(formData.amount)}\nEvent: ${formData.eventName}`
      );
      setShowSuccessModal(true);

      // Reset form
      resetForm();
    } catch (error: any) {
      Alert.alert('Payment Failed', error.message || 'An error occurred during payment processing');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Reset form to initial state
   */
  const resetForm = () => {
    setFormData({
      eventName: '',
      donorName: '',
      contactNumber: '',
      email: '',
      representativeName: '',
      paymentValidDate: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      paymentMethod: 'UPI',
      amount: 0,
    });
    setErrors({});
  };

  /**
   * Get event names for dropdown
   */
  const eventOptions = DefaultEvents.map(event => ({
    label: event.name,
    value: event.name,
  }));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="credit-card"
          size={32}
          color={Colors.primary}
        />
        <Text style={styles.title}>Donation & Payment</Text>
        <Text style={styles.subtitle}>Support Our Cultural Organization</Text>
      </View>

      {/* Form Card */}
      <View style={styles.formCard}>
        {/* Event Name - Mandatory */}
        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Event Name</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <View style={[styles.pickerContainer, errors.eventName && styles.errorBorder]}>
            <Picker
              selectedValue={formData.eventName}
              onValueChange={value => handleInputChange('eventName', value)}
              style={styles.picker}
            >
              <Picker.Item label="Select an event..." value="" />
              {eventOptions.map(option => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
          {errors.eventName && (
            <Text style={styles.errorText}>{errors.eventName}</Text>
          )}
        </View>

        {/* Donor Name - Mandatory */}
        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Donor Name</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <TextInput
            style={[styles.input, errors.donorName && styles.errorInput]}
            placeholder="Enter your full name"
            placeholderTextColor={Colors.gray}
            value={formData.donorName}
            onChangeText={value => handleInputChange('donorName', value)}
            onBlur={() => validateField('donorName')}
          />
          {errors.donorName && (
            <Text style={styles.errorText}>{errors.donorName}</Text>
          )}
        </View>

        {/* Contact Number - Optional */}
        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Contact Number</Text>
            <Text style={styles.optional}>(Optional)</Text>
          </View>
          <TextInput
            style={[styles.input, errors.contactNumber && styles.errorInput]}
            placeholder="Enter 10-digit phone number"
            placeholderTextColor={Colors.gray}
            value={formData.contactNumber}
            onChangeText={value => handleInputChange('contactNumber', value)}
            onBlur={() => validateField('contactNumber')}
            keyboardType="phone-pad"
            maxLength={10}
          />
          {errors.contactNumber && (
            <Text style={styles.errorText}>{errors.contactNumber}</Text>
          )}
        </View>

        {/* Email - Optional */}
        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.optional}>(Optional)</Text>
          </View>
          <TextInput
            style={[styles.input, errors.email && styles.errorInput]}
            placeholder="Enter email address"
            placeholderTextColor={Colors.gray}
            value={formData.email}
            onChangeText={value => handleInputChange('email', value)}
            onBlur={() => validateField('email')}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
        </View>

        {/* Representative Name - Optional */}
        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Representative Name</Text>
            <Text style={styles.optional}>(Optional)</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Organization representative name"
            placeholderTextColor={Colors.gray}
            value={formData.representativeName}
            onChangeText={value => handleInputChange('representativeName', value)}
          />
        </View>

        {/* Amount */}
        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>{Currency.symbol}</Text>
            <TextInput
              style={[styles.amountInput, errors.amount && styles.errorInput]}
              placeholder="0.00"
              placeholderTextColor={Colors.gray}
              value={formData.amount ? formData.amount.toString() : ''}
              onChangeText={handleAmountChange}
              onBlur={() => validateField('amount')}
              keyboardType="decimal-pad"
            />
          </View>
          {errors.amount && (
            <Text style={styles.errorText}>{errors.amount}</Text>
          )}
        </View>

        {/* Payment Method */}
        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Payment Method</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <View style={styles.paymentMethodsContainer}>
            {PaymentMethods.map(method => (
              <TouchableOpacity
                key={method.value}
                style={[
                  styles.methodButton,
                  formData.paymentMethod === method.value &&
                    styles.methodButtonSelected,
                ]}
                onPress={() => handleInputChange('paymentMethod', method.value)}
              >
                <Text
                  style={[
                    styles.methodButtonText,
                    formData.paymentMethod === method.value &&
                      styles.methodButtonTextSelected,
                  ]}
                >
                  {method.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Valid Date */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Payment Valid Until</Text>
          <View style={styles.dateContainer}>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => handleDateChange(-30)}
            >
              <MaterialCommunityIcons name="minus" size={20} color={Colors.primary} />
            </TouchableOpacity>
            <View style={styles.dateDisplay}>
              <Text style={styles.dateText}>
                {formData.paymentValidDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => handleDateChange(30)}
            >
              <MaterialCommunityIcons name="plus" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Info Box */}
      <View style={styles.infoBox}>
        <MaterialCommunityIcons
          name="information-outline"
          size={20}
          color={Colors.blue}
        />
        <Text style={styles.infoText}>
          Your donation helps us preserve and promote cultural heritage. Payment information will be securely recorded.
        </Text>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
        onPress={handlePayment}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={Colors.white} size="large" />
        ) : (
          <>
            <MaterialCommunityIcons
              name="credit-card-check"
              size={24}
              color={Colors.white}
            />
            <Text style={styles.submitButtonText}>
              Proceed to Payment
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* Reset Button */}
      <TouchableOpacity
        style={styles.resetButton}
        onPress={resetForm}
        disabled={isLoading}
      >
        <MaterialCommunityIcons
          name="refresh"
          size={20}
          color={Colors.gray}
        />
        <Text style={styles.resetButtonText}>Clear Form</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Success Modal Component
const SuccessModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  message: string;
  transactionId: string;
}> = ({ visible, onClose, message, transactionId }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.successModal}>
          <View style={styles.successIcon}>
            <MaterialCommunityIcons
              name="check-circle"
              size={64}
              color={Colors.green}
            />
          </View>
          <Text style={styles.successTitle}>Payment Successful!</Text>
          <Text style={styles.successMessage}>{message}</Text>

          <View style={styles.transactionDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Transaction ID:</Text>
              <Text style={styles.detailValue}>{transactionId}</Text>
            </View>
          </View>

          <Text style={styles.receiptNote}>
            A receipt has been recorded in our system. Check your email for confirmation.
          </Text>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  title: {
    ...Typography.h2,
    color: Colors.primary,
    marginTop: Spacing.md,
    fontWeight: 'bold',
  },
  subtitle: {
    ...Typography.body,
    color: Colors.gray,
    marginTop: Spacing.sm,
  },
  formCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  formGroup: {
    marginBottom: Spacing.lg,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  label: {
    ...Typography.body,
    color: Colors.black,
    fontWeight: '600',
  },
  required: {
    ...Typography.body,
    color: Colors.red,
    marginLeft: Spacing.xs,
  },
  optional: {
    ...Typography.small,
    color: Colors.gray,
    marginLeft: Spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 6,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: 16,
    color: Colors.black,
    backgroundColor: Colors.white,
  },
  errorInput: {
    borderColor: Colors.red,
    backgroundColor: '#FFE4E1',
  },
  errorBorder: {
    borderColor: Colors.red,
  },
  errorText: {
    ...Typography.small,
    color: Colors.red,
    marginTop: Spacing.xs,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  picker: {
    height: 50,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 6,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.white,
  },
  currencySymbol: {
    ...Typography.h2,
    color: Colors.primary,
    marginRight: Spacing.sm,
  },
  amountInput: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: 16,
    color: Colors.black,
  },
  paymentMethodsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  methodButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 2,
    borderColor: Colors.gray,
    borderRadius: 6,
    backgroundColor: Colors.white,
  },
  methodButtonSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  methodButtonText: {
    ...Typography.small,
    color: Colors.black,
    fontWeight: '500',
  },
  methodButtonTextSelected: {
    color: Colors.white,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  dateButton: {
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 6,
  },
  dateDisplay: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.accent,
    borderRadius: 6,
    alignItems: 'center',
  },
  dateText: {
    ...Typography.body,
    color: Colors.black,
    fontWeight: '600',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderLeftWidth: 4,
    borderLeftColor: Colors.blue,
    padding: Spacing.md,
    borderRadius: 6,
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  infoText: {
    ...Typography.body,
    color: Colors.blue,
    flex: 1,
  },
  submitButton: {
    backgroundColor: Colors.green,
    paddingVertical: Spacing.lg,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    ...Typography.body,
    color: Colors.white,
    fontWeight: 'bold',
  },
  resetButton: {
    borderWidth: 2,
    borderColor: Colors.gray,
    paddingVertical: Spacing.md,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
  },
  resetButtonText: {
    ...Typography.body,
    color: Colors.gray,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModal: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.xl,
    width: '85%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  successIcon: {
    marginBottom: Spacing.lg,
  },
  successTitle: {
    ...Typography.h2,
    color: Colors.green,
    marginBottom: Spacing.md,
  },
  successMessage: {
    ...Typography.body,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: 24,
  },
  transactionDetails: {
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    padding: Spacing.md,
    width: '100%',
    marginBottom: Spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  detailLabel: {
    ...Typography.small,
    color: Colors.gray,
    fontWeight: '600',
  },
  detailValue: {
    ...Typography.small,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  receiptNote: {
    ...Typography.small,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    fontStyle: 'italic',
  },
  closeButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    ...Typography.body,
    color: Colors.white,
    fontWeight: 'bold',
  },
});

// Export both components
export { SuccessModal };
export default PaymentScreen;
