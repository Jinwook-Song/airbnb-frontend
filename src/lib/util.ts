/**
 *
 * @param date
 * @returns YYYY-MM-DD
 */
export function dateFormat(date: Date): string {
  return new Intl.DateTimeFormat()
    .format(date)
    .replaceAll('. ', '-')
    .slice(0, -1)
    .split(' ')[0];
}
