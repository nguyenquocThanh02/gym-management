export const formatDate = (dateString: string | undefined | Date): string => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB").format(date);
};
