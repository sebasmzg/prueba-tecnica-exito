import { IUser } from "@/app/core/application/dto";
import { HttpClient } from "../utils/client-http";
import { PUsers } from "@/app/core/application/ports";

export class UsersServices implements PUsers {
  private clientHttp: HttpClient;
  private basePath: string = "users";

  constructor() {
    this.clientHttp = new HttpClient();
  }

  async getUser(): Promise<IUser> {
    return await this.clientHttp.get(
      this.basePath
    );
  }

  async createUser(formData: FormData): Promise<IUser> {
    return await this.clientHttp.post(this.basePath, formData);
  }

}
