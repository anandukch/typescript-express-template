import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as mongoose from "mongoose";
import { CREDENTIALS, DB_URL, NODE_ENV, ORIGIN, PORT } from "./config";
import { dbConnection } from "./databases";
import * as cors from "cors";
class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: any[]) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 3000;

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(
      cors({ origin: ORIGIN || "*", credentials: CREDENTIALS || true })
    );
  }

  private initializeRoutes(routes: any[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }
  private connectToTheDatabase() {
    if (this.env !== "production") {
      mongoose.set("debug", true);
    }
    mongoose.connect(dbConnection.url).then(() => {
      console.log("📦 Connected to database");
    });
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`======= ENV: ${this.env} =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });
  }
}

export default App;
