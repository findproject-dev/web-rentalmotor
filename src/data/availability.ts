import type { AvailabilitySlot } from '../types';

// Availability schedule - tracks busy rental dates
export const UNAVAILABLE_SLOTS: AvailabilitySlot[] = [
  { motorcycleId: 'yamaha-xmax', startDate: '2026-12-24', endDate: '2026-12-26', note: 'Jadwal Padat' },
  { motorcycleId: 'honda-adv-160', startDate: '2026-12-30', endDate: '2027-01-02', note: 'Jadwal Padat' },
];

export function checkAvailability(
  motorcycleId: string,
  startDate: string,
  endDate: string,
): { available: boolean; conflictNote?: string } {
  if (!startDate || !endDate) return { available: true };
  
  const start = new Date(startDate);
  const end = new Date(endDate);

  const conflict = UNAVAILABLE_SLOTS.find((slot) => {
    if (slot.motorcycleId !== motorcycleId) return false;
    const slotStart = new Date(slot.startDate);
    const slotEnd = new Date(slot.endDate);
    return start <= slotEnd && end >= slotStart;
  });

  if (conflict) {
    return { available: false, conflictNote: conflict.note };
  }
  return { available: true };
}
