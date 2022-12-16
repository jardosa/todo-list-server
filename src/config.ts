import { cleanEnv, str, port, num } from 'envalid';

const config = cleanEnv(process.env, {
  MONGODB_URI: str({ default: 'mongodb://localhost/todolist' }),
  PORT: port({ default: 3001 }),
  JWT_SECRET: str({ default: 'Secret!' }),
  EXPIRATION_IN_DAYS: num({ default: 7 }),
});

export default config;
