import { cleanEnv, str, port } from 'envalid';

const config = cleanEnv(process.env, {
  MONGODB_URI: str({ default: 'mongodb://localhost/todolist' }),
  PORT: port({ default: 3001 }),
  JWT_SECRET: str({ default: 'Secret!' }),
});

export default config;
