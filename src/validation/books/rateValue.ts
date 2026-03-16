import * as yup from "yup";

const rateValue = yup.object({
  bookId: yup.number().required(),
  rateValue: yup.number().min(1).max(5).required("Book rate is required"),
});

export default rateValue;
