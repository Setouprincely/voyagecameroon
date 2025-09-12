import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export interface PaymentData {
  amount: number;
  currency: string;
  paymentMethod: string;
  cardDetails?: {
    cardNumber?: string;
    cardExpiry?: string;
    cardName?: string;
  };
  mobileDetails?: {
    mobileNumber?: string;
    provider?: string;
  };
  paypalDetails?: {
    paypalEmail?: string;
  };
  bookingId?: string;
  eventRegistrationId?: string;
  userId?: string;
  description?: string;
}

export const processPayment = async (paymentData: PaymentData): Promise<{ success: boolean; transactionId?: string }> => {
  try {
    // In a real application, this would integrate with a payment gateway
    // Here we're just simulating a successful payment
    
    // Sanitize data before storing
    const sanitizedData = { ...paymentData };
    if (sanitizedData.cardDetails?.cardNumber) {
      sanitizedData.cardDetails.cardNumber = '****' + sanitizedData.cardDetails.cardNumber.slice(-4);
    }
    
    // Store the payment record in Firestore
    const docRef = await addDoc(collection(db, 'payments'), {
      ...sanitizedData,
      status: 'completed',
      createdAt: serverTimestamp()
    });
    
    // Return success with the transaction ID
    return {
      success: true,
      transactionId: docRef.id
    };
  } catch (error) {
    console.error("Payment processing error:", error);
    return {
      success: false
    };
  }
};

export const verifyPayment = async (transactionId: string): Promise<boolean> => {
  // In a real application, this would verify the payment status with a payment gateway
  // Here we're just simulating a successful verification
  return true;
};
