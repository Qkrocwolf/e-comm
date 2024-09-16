import { CookieOptions } from 'express';

export const cookieConfig = (days: number): CookieOptions => {
  return {
    secure: true,
    maxAge: 24 * 60 * 60 * 1000 * days,
    sameSite: 'none',
  };
};
