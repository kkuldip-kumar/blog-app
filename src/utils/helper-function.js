export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject("Error converting file to Base64");
    };
    reader.readAsDataURL(file);
  });
};

export const isBase64Image = (str) => {
  return /^data:image\/[^;]+;base64,/.test(str);
};

export const formatDateNew = (dateStr) => {
  const inputDate = new Date(dateStr);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = months[inputDate.getMonth()];
  const day = inputDate.getDate();
  const year = inputDate.getFullYear();

  return `${month} ${day}, ${year}`;
};
