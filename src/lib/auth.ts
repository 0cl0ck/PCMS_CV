import { User } from '../payload-types';

export const isAdmin = (user?: User): boolean => {
  return user?.role === 'admin';
};

export const isCustomer = (user?: User): boolean => {
  return user?.role === 'customer';
};

export const requireAuth = (user?: User): boolean => {
  return Boolean(user?.id);
};

export const getRedirectURL = (user?: User): string => {
  if (isAdmin(user)) {
    return '/admin';
  }
  
  return '/dashboard';
};