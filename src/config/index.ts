interface IApp {
  port: string | number;
}

interface IDB {
  dbUser: string;
  dbPass: string;
  dbHost: string;
  dbPort: string;
  dbName: string;
}

interface IConfig {
  app: IApp;
  db: IDB;
}

const config: IConfig = {
  app: {
    port: process.env.PORT || 4000,
  },
  db: {
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbName: process.env.DB_NAME,
  },
};

export default config;
