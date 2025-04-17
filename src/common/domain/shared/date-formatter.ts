export class DateFormatter {
  public static formatDay(date: Date): string {
    const day = date.getDate();
    const dayFormatted = day < 10 ? '0' + day : day.toString();
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${dayFormatted} ${month} ${year} ${hours}:${minutes}`;
  }
}
