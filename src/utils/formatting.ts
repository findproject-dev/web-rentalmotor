// ============================================================
// FINDRIDE - Formatting Utilities
// ============================================================

/**
 * Format a number to IDR currency string
 * e.g. 75000 → "Rp 75.000"
 */
export function formatCurrency(amount: number): string {
  return (
    'Rp ' +
    Math.round(amount)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  );
}

/**
 * Format an ISO date string to Indonesian locale
 * e.g. "2024-11-15" → "15 November 2024"
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];
  const date = new Date(dateStr + 'T00:00:00');
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Format hours into human-readable Indonesian string
 * e.g. 6 → "6 jam", 48 → "2 hari", 52 → "2 hari 4 jam"
 */
export function formatDuration(hours: number): string {
  if (hours <= 0) return '0 jam';
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  if (days === 0) return `${remainingHours} jam`;
  if (remainingHours === 0) return `${days} hari`;
  return `${days} hari ${remainingHours} jam`;
}

/**
 * Calculate the total duration in hours between two date+time combos
 */
export function calculateDurationHours(
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string,
): number {
  if (!startDate || !startTime || !endDate || !endTime) return 0;
  const start = new Date(`${startDate}T${startTime}`);
  const end = new Date(`${endDate}T${endTime}`);
  const diffMs = end.getTime() - start.getTime();
  if (diffMs <= 0) return 0;
  return Math.ceil(diffMs / (1000 * 60 * 60));
}

/**
 * Calculate proportional price from daily rate and actual hours
 * Minimum charge is 1 day; additional hours are charged proportionally.
 */
export function calculatePrice(pricePerDay: number, hours: number): number {
  if (hours <= 0) return 0;
  const days = hours / 24;
  return Math.round(pricePerDay * days);
}

/**
 * Utility to combine class names (similar to clsx/classnames)
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
