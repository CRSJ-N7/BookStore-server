import * as yup from "yup";
import commentSchema from "./commentSchema";

const rateValue = yup.object({
  bookId: yup.number().required(),
  rateValue: yup.number().min(1).max(5).required("Book rate is required"),
});

export default rateValue;
