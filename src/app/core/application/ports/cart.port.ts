import { ICart } from "../dto";

export interface PCart {
    getAllCarts():Promise<ICart>

    getCartById(id: number):Promise<ICart>

    updateCart(id: number):Promise<ICart>

    addCart(formData: FormData): Promise<ICart>

    deleteCart(id: number):Promise<ICart>
}