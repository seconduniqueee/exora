export interface JwtPayload {
  sub: number;
  email: string;
  refreshToken?: string;
  accessToken?: string;
}
