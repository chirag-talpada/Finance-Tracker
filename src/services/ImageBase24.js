export function getImageData(file) {
  const reader = new FileReader();
  let [file_name,extension]=file.name.split(".");

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      const base24String = reader.result.replace("data:", "").replace(/^.+,/, "");
      resolve({ base24String, extension,file_name });
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });

}

export function getImageObject(editedTransaction){
    const base64String = editedTransaction?.receipt?.base24String;
    const ext = editedTransaction?.receipt?.extension;
    const fileName = editedTransaction?.receipt?.file_name;

    const encoder = new TextEncoder();
    const dataEncode = encoder.encode(base64String.replace(/[\r\n]+/g, "")); // Remove new lines

    const blob = new Blob([dataEncode], { type: `image/${ext}` });
    const file = new File([blob], `${fileName}.${ext}`, { type: `image/${ext}` });
    
    console.log(file);
    
    const fileList = new DataTransfer();
    fileList.items.add(file);
    console.log("old",file);
    

    return fileList.files
    // return file
}