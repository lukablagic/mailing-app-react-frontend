export const DateTimeUtility = {

  format(dateString: string, formatString: string = "Y-m-d-H:i") {
    const date = new Date(dateString);

    const year = date.getFullYear().toString(); 
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return formatString
        .replace("Y", year)
        .replace("m", month)
        .replace("d", day)
        .replace("H", hours)
        .replace("i", minutes);
  },
};
