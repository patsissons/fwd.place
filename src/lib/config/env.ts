/* eslint-disable no-process-env */

// general env
export const NODE_ENV = process.env.NODE_ENV

// auth env
export const JWT_ISSUER = import.meta.env.VITE_JWT_ISSUER
export const JWT_PRIVATE_KEY = import.meta.env.VITE_JWT_PRIVATE_KEY
export const JWT_SUBJECT = import.meta.env.VITE_JWT_SUBJECT

// thinDB env
export const THIN_BACKEND_HOST = import.meta.env.VITE_THIN_BACKEND_HOST

// env transformations
export const isDevelopment = Boolean(NODE_ENV === 'development')
export const isProduction = Boolean(NODE_ENV === 'production')
