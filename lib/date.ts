export const formatMyDate = (date: Date): string => {
    const options: { [key: string]: string} = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }