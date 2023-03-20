import { Router } from "express";
import UserController from "../controllers/user.controller";
import { CreateUserDto } from "../dtos/users.dto";
import { Routes } from "../interfaces/routes.interface";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/validation.middleware";

class UserRoute implements Routes {
  public path = "/users";
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,authMiddleware, this.userController.getUsers);
  }
}

export default UserRoute;
