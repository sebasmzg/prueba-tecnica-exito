import { PCart } from "@/app/core/application/ports";
import { HttpClient } from "../utils/client-http";
import { ICart } from "@/app/core/application/dto";

export class CartsServices implements PCart {
    private clientHttp: HttpClient;
    private basePath: string = "carts";
    
    constructor(){
        this.clientHttp = new HttpClient();
    }

    async getAllCarts(): Promise<ICart> {
        return await this.clientHttp.get(`${this.basePath}`);
    }

    async getCartById(id: number): Promise<ICart> {
        return await this.clientHttp.get(`${this.basePath}/${id}`)
    }
    
    async updateCart(id: number): Promise<ICart> {
        return await this.clientHttp.get(`${this.basePath}/${id}`)
    }
    
    async addCart(formData: FormData): Promise<ICart> {
        return await this.clientHttp.get(`${this.basePath}`);
    }
    
    async deleteCart(id: number): Promise<ICart> {
        return await this.clientHttp.get(`${this.basePath}/${id}`)
    }
}