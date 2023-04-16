/* | - Types - | */
type EnvConfigType = {
  SERVER_PORT: number
  JWT_SECRET: string
  JWT_REFRESH: string
}

/* | - app Config - | */
export const appConfig: Readonly<EnvConfigType> = {
  /* SERVER */
  SERVER_PORT: 3000,

  /* JWT */
  JWT_SECRET: 'JWT_SECRET',
  JWT_REFRESH: 'JWT_REFRESH'
}
