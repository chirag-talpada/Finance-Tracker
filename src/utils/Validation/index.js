import * as yup from "yup";
import { validExtemsions } from "../constant";

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

export const validationShema=yup.object().shape({
  transactionDate: yup
    .date()
    .typeError("please enter valid date")
    .min("1970-01-01", "Date is too early"),
  monthYear: yup.string().required("month year is required"),
  transactionType: yup.string().required("Transaction Type is required"),
  fromAccount: yup.string().required("From Account is required"),
  toAccount: yup
    .string()
    .required("To Account is required")
    .test(
      "compare",
      "To Account and from account cannot be the same",
      (value, testContext) => {
        if (testContext.parent.fromAccount === value) return false;
        return true;
      }
    ),
  amount: yup
    .number()
    .typeError("amount is required")
    .min(1, "amount must be greater than 0"),
  receipt: yup
    .mixed()
    .test("required", "receipt is required!", (file) => {
      if (file.length === 0) {
        return false;
      }
      return true;
    })
    .test("size", "size must be less than 1MB", (file) => {
      if (file[0]?.size > 1048576) {
        return false;
      }
      return true;
    })
    .test(
      "format",
      "Invalid file type. Only JPG, JPEG, and PNG files are allowed.",
      (file) => {
        if (!validExtemsions.includes(file[0]?.type)) {
          return false;
        }
        return true;
      }
    ),
  notes: yup
    .string()
    .required("notes is required")
    .max(250, "notes must be greater than 250 charactres"),
});
