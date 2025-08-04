import { env } from "../app/config/env";
import axios from "axios";
import { cookies } from "next/headers";

type ApiMethod = "get" | "post" | "put" | "delete";

interface ApiResponse<T> {
  metod: ApiMethod;
  body?: Record<string, unknown>;
  endpoint?: string;
  //   callback: (data: T) => Promise<T>;
}

export async function ApiRequest<T>({
  metod,
  body,
  endpoint,
}: ApiResponse<T>): Promise<T | null> {
  const Cookies = await cookies();

  const cookie = Cookies.get("auth_token");
  if (!cookie) {
    console.log("No se encontró el token de autenticación");
    return null;
  }

  try {
    const response = await axios[metod](`${env.url_api}/${endpoint}`, body, {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
}
