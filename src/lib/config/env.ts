/* eslint-disable no-process-env */

// general env
export const NODE_ENV = process.env.NODE_ENV

// prisma env
export const DATABASE_URL = import.meta.env.VITE_DATABASE_URL

// env transformations
export const isDevelopment = Boolean(NODE_ENV === 'development')
export const isProduction = Boolean(NODE_ENV === 'production')
