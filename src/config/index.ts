import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    access_secret: process.env.ACCESS_TOKEN_SECRET,
    access_expires: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refresh_secret: process.env.REFRESH_TOKEN_SECRET,
    refresh_expires: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
};
