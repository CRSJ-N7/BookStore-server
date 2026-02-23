import { AppDataSource } from "../data-source";
import { Book } from "../entities/Book";

const bookRepository = AppDataSource.getRepository(Book);

export default bookRepository;
