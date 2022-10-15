import { CartDTO } from "../DTO/CartDTO";

export interface CreateCartData {
  code: string;
  price: number;
}

export interface ReadOneCartData {
  id?: string;
  code?: string;
}

export interface UpdateCartData {
  id: string;
  code: string;
  price: number;
}

export interface DeleteCartData {
  id: string;
}

export interface CartRepository {
  create: (data: CreateCartData) => Promise<CartDTO>;
  readOne: (data: ReadOneCartData) => Promise<CartDTO | null | undefined>;
  readAll: () => Promise<CartDTO[]>;
  update: (data: UpdateCartData) => Promise<CartDTO>;
  delete: (data: DeleteCartData) => Promise<void>;
}