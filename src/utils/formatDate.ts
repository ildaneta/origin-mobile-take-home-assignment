export const formatDate = (date: Date) => {
  const currentDate = new Date(date);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(currentDate);

  return formattedDate;
};
