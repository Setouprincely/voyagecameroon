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

export interface EventRegistrationData {
  eventId: number;
  eventName: string;
  fullName: string;
  email: string;
  phone: string;
  numberOfTickets: number;
  specialRequirements: string;
  totalPrice?: number;
  status?: string;
  userId?: string;
}

export const saveEventRegistration = async (registrationData: EventRegistrationData): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'eventRegistrations'), {
      ...registrationData,
      createdAt: serverTimestamp(),
      status: registrationData.status || 'confirmed'
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving event registration:", error);
    throw new Error('Failed to save event registration. Please try again.');
  }
};

export const getUserEventRegistrations = async (userId: string) => {
  try {
    const registrationsQuery = query(
      collection(db, 'eventRegistrations'),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(registrationsQuery);
    const registrations = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return registrations;
  } catch (error) {
    console.error("Error getting user event registrations:", error);
    throw new Error('Failed to fetch event registrations. Please try again.');
  }
};

export const cancelEventRegistration = async (registrationId: string) => {
  try {
    const registrationRef = doc(db, 'eventRegistrations', registrationId);
    await updateDoc(registrationRef, {
      status: 'cancelled',
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error cancelling event registration:", error);
    throw new Error('Failed to cancel event registration. Please try again.');
  }
};

export const deleteEventRegistration = async (registrationId: string) => {
  try {
    await deleteDoc(doc(db, 'eventRegistrations', registrationId));
    return true;
  } catch (error) {
    console.error("Error deleting event registration:", error);
    throw new Error('Failed to delete event registration. Please try again.');
  }
};
