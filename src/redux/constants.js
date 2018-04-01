// Авторизация
export const AUTH_FETCHING = '@@Graalex/AUTH_FETCHING';
export const AUTH_SUSSES = '@@Graalex/AUTH_SUSSES';
export const AUTH_FAILURE = '@@Graalex/AUTH_FAILURE';

// Выход из кабинета
export const LOGOUT = '@@Graalex/LOGOUT';

// Начисления
export const ALLOCATIONS_FETCHING = '@@Graalex/ALLOCATIONS_FETCHING';
export const ALLOCATIONS_SUSSES = '@@Graalex/ALLOCATIONS_SUSSES';
export const ALLOCATIONS_FAILURE = '@@Graalex/ALLOCATIONS_FAILURE';

// Платежи
export const PAYMENTS_FETCHING = '@@Graalex/PAYMENTS_FETCHING';
export const PAYMENTS_SUSSES = '@@Graalex/PAYMENTS_SUSSES';
export const PAYMENTS_FAILURE = '@@Graalex/PAYMENTS_FAILURE';

// Субсидии
export const SUBSIDIES_FETCHING = '@@Graalex/SUBSIDIES_FETCHING';
export const SUBSIDIES_SUSSES = '@@Graalex/SUBSIDIES_SUSSES';
export const SUBSIDIES_FAILURE = '@@Graalex/SUBSIDIES_FAILURE';

export const APP_KEY = process.env.REACT_APP_API_KEY;
export const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
