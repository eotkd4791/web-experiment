import axios, { type AxiosResponse } from "axios";
import { type HttpClient } from "../types/http";

export const client: HttpClient = {
  async get<Res>(url: string): Promise<Res> {
    const response: AxiosResponse<Res> = await axios.get<Res>(url);
    return response.data;
  },
  async post<Req, Res>(url: string, body: Req): Promise<Res> {
    const response: AxiosResponse<Res> = await axios.post<Res>(url, body);
    return response.data;
  },
  async put<Req, Res>(url: string, body: Req): Promise<Res> {
    const response: AxiosResponse<Res> = await axios.put<Res>(url, body);
    return response.data;
  },
  async patch<Req, Res>(url: string, body: Req): Promise<Res> {
    const response: AxiosResponse<Res> = await axios.patch<Res>(url, body);
    return response.data;
  },
  async delete<Res>(url: string): Promise<Res> {
    const response: AxiosResponse<Res> = await axios.delete<Res>(url);
    return response.data;
  },
} as const;
