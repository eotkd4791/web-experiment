export interface HttpClient {
  get<Res>(url: string): Promise<Res>;
  post<Req, Res>(url: string, body: Req): Promise<Res>;
  put<Req, Res>(url: string, body: Req): Promise<Res>;
  patch<Req, Res>(url: string, body: Req): Promise<Res>;
  delete<Res>(url: string): Promise<Res>;
}
