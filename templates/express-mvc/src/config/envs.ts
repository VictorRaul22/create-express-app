import "dotenv/config";
import env from "env-var";
export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  ENVIRONMENT: env
    .get("NODE_ENV")
    .default("development")
    .asEnum(["production", "development"]),
  LOG_CONSOLE: env.get("LOG_CONSOLE").asBool(),
  data_base: {
    DB_NAME: env.get("DB_NAME").required().asString(),
    DB_PORT: env.get("DB_PORT").required().asPortNumber(),
    DB_HOST: env.get("DB_HOST").required().asString(),
    DB_USER: env.get("DB_USER").required().asString(),
    DB_PASSWORD: env.get("DB_PASSWORD").required().asString(),
    DB_SHOW_LOG: env.get("DB_SHOW_LOG").required().asBool(),
  },
};
