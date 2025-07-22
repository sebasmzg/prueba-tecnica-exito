const defaultBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fakestoreapi.com/";
export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || defaultBaseUrl;
  }

  private async getHeader() {
    return {
      "Content-type": "application/json",
    };
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    return await response.json();
  }

  async get<T>(url: string): Promise<T> {
    const header = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: header,
      method: "GET",
      cache: "no-store",
    });
    return this.handleResponse(response);
  }

  async getById<T>(url: string, id: number | string): Promise<T> {
    const header = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}/${id}`, {
      headers: header,
      method: "GET",
    });
    return this.handleResponse(response);
  }

  async delete(url: string, id: number | string) {
    const header = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}/${id}`, {
      headers: header,
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    return response.status === 204
      ? { message: "Service deleted" }
      : await response.json();
  }

  async put<T, R>(url: string, id: number | string, data: R): Promise<T> {
    const header = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}/${id}`, {
      headers: header,
      method: "PUT",
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async post<T, R>(url: string, data: R): Promise<T> {
    const isFormData = data instanceof FormData;
    const header = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: header,
      method: "POST",
      body: isFormData ? data : JSON.stringify(data),
    });
    return this.handleResponse(response);
  }
}
