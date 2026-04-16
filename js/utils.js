export const formatDueDate = function (isoString) {
  const date = new Date(isoString);

  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return `Due ${formattedDate}`;
};
