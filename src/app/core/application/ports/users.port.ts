import { IUser } from "../dto";

export interface PUsers {
    /**
     * Fetch user.
     * @returns A promise that resolves to the user response.
     */
    getUser():Promise<IUser>

    /**
     * Creates a new user.
     * @param user The user to create.
     * @returns A promise that resolves to the created user.
     */
    createUser(formData: FormData):Promise<IUser>
}