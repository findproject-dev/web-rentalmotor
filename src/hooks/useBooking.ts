import { useContext } from 'react';
import { BookingContext } from '../context/BookingContextInstance';
import type { BookingContextType } from '../types';

export function useBooking(): BookingContextType {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error('useBooking must be used inside <BookingProvider>');
  }
  return ctx;
}
