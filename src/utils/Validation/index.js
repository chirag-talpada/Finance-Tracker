export const isValidateForm = (formValues, setFormErr) => {
  let err = {};

  if (formValues.transactionDate === "") {
    err.transactionDate = "Transaction Date is required";
  }
  if (formValues.monthYear === "") {
    err.monthYear = "Month Year is required";
  }
  if (formValues.transactionType === "") {
    err.transactionType = "Transaction Type is required";
  }
  if (formValues.fromAccount === "") {
    err.fromAccount = "From Account is required";
  }
  if (formValues.toAccount === "") {
    err.toAccount = "To Account Year is required";
  } else {
    if (formValues.toAccount === formValues.fromAccount) {
      err.toAccount = "To Account and from account cannot be the same";
    }
  }

  if (formValues.amount === 0) {
    err.amount = "amount is required";
  } else {
    if (formValues.amount <= 0) {
      err.amount = "amount must be greater than 0";
    }
  }

  if (!formValues.receipt) {
    err.receipt = "receipt is required";
  } else {
    if (formValues.receipt.size > 1048576) {
      err.receipt = "file size should not exceed 1 MB";
    }

    let allowedExtensions = [".jpg", ".jpeg", ".png"];

    let fileName = formValues.receipt.name?formValues.receipt.name.toLowerCase():(formValues.receipt.file_name+"."+formValues.receipt.extension);
    
    
    let extension = fileName.substring(fileName.lastIndexOf("."));
    if (!allowedExtensions.includes(extension)) {
      err.receipt =
        "Invalid file type. Only JPG, JPEG, and PNG files are allowed.";
    }
  }

  if (formValues.notes === "") {
    err.notes = "Notes is required";
  } else {
    if (formValues.notes.length > 250) {
      err.notes = "Notes too long, Must be less than 250 characters";
    }
  }

  setFormErr(err);

  return Object.keys(err).length > 0 ? false : true;
};
