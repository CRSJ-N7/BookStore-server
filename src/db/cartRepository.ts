import { AppDataSource } from "../data-source";
import { CartItem } from "../entities/CartItem";

const cartRepository = AppDataSource.getRepository(CartItem);

export default cartRepository;
