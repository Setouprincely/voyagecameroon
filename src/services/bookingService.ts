import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface BookingData {
  destinationId: number;
  destinationName: string;
  tourDate: string;
  guests: number;
  fullName: string;
  email: string;
  phone: string;
  specialRequirements: string;
  paymentMethod: string;
  totalPrice?: number;
  status?: string;
  userId?: string;
}

export const saveBooking = async (bookingData: BookingData): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...bookingData,
      createdAt: serverTimestamp(),
      status: bookingData.status || 'confirmed'
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving booking:", error);
    throw new Error('Failed to save booking. Please try again.');
  }
};

export const getUserBookings = async (userId: string) => {
  try {
    const bookingsQuery = query(
      collection(db, 'bookings'),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(bookingsQuery);
    const bookings: any[] = [];
    
    querySnapshot.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return bookings;
  } catch (error) {
    console.error("Error getting user bookings:", error);
    throw new Error('Failed to fetch bookings. Please try again.');
  }
};

export const cancelBooking = async (bookingId: string) => {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, {
      status: 'cancelled',
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error cancelling booking:", error);
    throw new Error('Failed to cancel booking. Please try again.');
  }
};

export const deleteBooking = async (bookingId: string) => {
  try {
    await deleteDoc(doc(db, 'bookings', bookingId));
    return true;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw new Error('Failed to delete booking. Please try again.');
  }
};
