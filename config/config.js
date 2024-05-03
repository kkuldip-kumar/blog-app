import "dotenv/config";
const config = {
  development: {
    publicPath: process.env.PUBLIC_PATH || "/",
    port: process.env.PORT,
  },
  production: {
    publicPath: process.env.production_PATH,
    // Add other production configurations here
  },
};

const configuration = config[process.env.NODE_ENV || "development"];
export default configuration;
