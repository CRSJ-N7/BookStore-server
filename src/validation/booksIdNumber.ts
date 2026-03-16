import * as yup from "yup";

const booksIdNumber = yup.object({
  bookId: yup
    .number()
    .transform((value, originalValue) => Number(originalValue))
    .typeError("Book ID must be a number")
    .required("Book ID is required"),
});

export default booksIdNumber;
