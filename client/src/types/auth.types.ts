export interface AuthResponse {
  accessToken: string;
  role: string;
  email: string;
  password: string;
}

export interface UserData {
  email: string;
  name?: string;
  surname?: string;
  country?: string;
  city?: string;
  gender?: 'male' | 'female' | null;
  birthday?: Date;
}

export interface User {
  data: UserData;
  email: string;
  name: string;
  surname: string;
  country: string;
  city: string;
  gender: 'male' | 'female' | 'не указан';
  birthday: Date;
}
