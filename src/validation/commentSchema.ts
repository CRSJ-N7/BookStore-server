import * as yup from "yup";

const commentSchema = yup.object({
  text: yup
    .string()
    .trim()
    .required("Comment text is required")
    .min(6, "Comment must be at least 6 characters"),

  bookId: yup
    .number()
    .transform((value, originalValue) => Number(originalValue))
    .typeError("Book ID must be a number")
    .required("Book ID is required"),
});

export default commentSchema;
