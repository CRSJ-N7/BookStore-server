import * as yup from "yup";

const booksId = yup.object({
  bookId: yup.string().required("Book ID is required"),
});

export default booksId;
