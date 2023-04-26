export function getImageData(file) {
  const reader = new FileReader();
  let extension=file.name.split(".")[1];

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      const base24String = reader.result.replace("data:", "").replace(/^.+,/, "");
      resolve({ base24String, extension });
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });

}
