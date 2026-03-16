import * as yup from "yup";

const quantity = yup.object({
  bookId: yup
    .number()
    .transform((value, originalValue) => Number(originalValue))
    .typeError("Book ID must be a number")
    .required("Book ID is required"),
  quantity: yup
    .number()
    .min(0)
    .required("Quantity of books to add/remove required"),
});

export default quantity;
