import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import {
  CREDENTIALS,
  DB_URL,
  LOG_FORMAT,
  NODE_ENV,
  ORIGIN,
  PORT,
} from "./config";
import { dbConnection } from "./databases";
import cors from "cors";
import morgan from "morgan";
import { logger, stream } from "./utils/logger";
import { Routes } from "./interfaces/routes.interface";
class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 3000;

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      cors({ origin: ORIGIN || "*", credentials: CREDENTIALS || true })
    );
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }
  private connectToTheDatabase() {
    if (this.env !== "production") {
      mongoose.set("debug", true);
    }
    mongoose
      .connect(dbConnection.url)
      .then(() => {
        logger.info("📦 Connected to database");
      })
      .catch((err) => {
        logger.error(`❌ Error connecting to database: ${err}`);
      });
  }
  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }
}

export default App;
