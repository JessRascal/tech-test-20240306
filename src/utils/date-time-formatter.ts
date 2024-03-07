import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const formatDateTime = (dateTime: string, inputFormat = 'YYYY-MM-DDTHH:mm:SS') => {
  if (!dateTime) return 'N/A';

  return dayjs(dateTime, inputFormat).format('DD/MM/YYYY HH:mm');
};

export const formatDate = (date: string, inputFormat = 'YYYY-MM-DD') => {
  if (!date) return 'N/A';

  return dayjs(date, inputFormat).format('DD/MM/YYYY');
};
