interface IConfig {
  app: { port: string | number };
}

const config: IConfig = {
  app: {
    port: process.env.PORT || 4000,
  },
};

export default config;
