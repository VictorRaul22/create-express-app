import "reflect-metadata";
import { Server } from "@/server";
import { envs } from "@/config/envs";
import { routeApp } from "@/routes";
import { TypeOrmDataBase } from "@/config/db";
export class BackendApp {
  server: Server;
  db: TypeOrmDataBase;
  constructor() {
    const port = envs.PORT ?? 3000;
    this.server = new Server(port.toString());
    this.db = new TypeOrmDataBase();
  }

  async start() {
    this.server.route(routeApp);
    await this.db.start();
    await this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    await this.server.stop();
  }
}
