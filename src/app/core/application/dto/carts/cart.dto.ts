import { IProduct } from "../products/product.dto";

export interface ICart {
    id: number,
    userId: number,
    products: IProduct[]
}