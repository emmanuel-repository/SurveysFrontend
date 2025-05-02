export interface AdminCreateRequest {
  name: string;
  lastName: string;
  userName: string;
  password: string;
}

export interface AdminUpdateRequest {
  id: number,
  name: string;
  lastName: string;
  userName: string;
  password: string;
}
