import { DataSource, type DataSourceOptions } from "typeorm";
import { envs } from "@/config/envs";
import { logger } from "@/utils/logger/logger";
import path from "path";
const defaultOptions: DataSourceOptions = {
  name: envs.data_base.DB_NAME,
  type: "mysql",
  host: envs.data_base.DB_HOST,
  port: envs.data_base.DB_PORT,
  username: envs.data_base.DB_USER,
  password: envs.data_base.DB_PASSWORD,
  database: envs.data_base.DB_NAME,
  entities: [path.resolve(__dirname, "../models/*{.js,.ts}")],
  logging: envs.data_base.DB_SHOW_LOG,
  synchronize: envs.ENVIRONMENT === "development",
};
export class TypeOrmDataBase {
  private readonly appDataSource: DataSource;
  constructor(options: DataSourceOptions = defaultOptions) {
    this.appDataSource = new DataSource(options);
  }

  async start() {
    try {
      await this.appDataSource.initialize();
      logger.info("BD Connected");
    } catch (err) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }
}
