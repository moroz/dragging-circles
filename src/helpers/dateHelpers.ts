import dayjs from "dayjs";

export const TZ_OPTIONS = Intl.DateTimeFormat().resolvedOptions();

export function formatDate(dateString: string) {
  return dayjs(dateString).format("YYYY-MM-DD");
}

export function formatRange(startDate: string | null, endDate: string | null) {
  if (!startDate || !endDate) return null;

  return `${formatDate(startDate)}–${formatDate(endDate)}`;
}

export function isNowInRange(startDate: string | null, endDate: string | null) {
  return (
    startDate &&
    endDate &&
    !dayjs(startDate).startOf("day").isAfter(dayjs()) &&
    !dayjs(endDate).endOf("day").isBefore(dayjs())
  );
}

export function formatDateTime(dateString: string | Date) {
  return dayjs(dateString).format("YYYY-MM-DD HH:mm");
}

export function formatDateTimeWithZone(dateString: string) {
  return (
    dayjs(dateString).format(`YYYY-MM-DD HH:mm:ss (`) +
    TZ_OPTIONS.timeZone +
    ")"
  );
}
