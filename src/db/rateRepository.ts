import { AppDataSource } from "../data-source";
import { Rate } from "../entities/Rate";

const rateRepository = AppDataSource.getRepository(Rate);

export default rateRepository;
