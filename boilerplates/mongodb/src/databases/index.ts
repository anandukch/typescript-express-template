import { DB_URL } from '../config';
export const dbConnection = {
  // url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  url: DB_URL || 'mongodb://localhost:27017/express-ts',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};