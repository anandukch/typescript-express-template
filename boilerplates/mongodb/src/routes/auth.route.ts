import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

// import IndexController from '@controllers/index.controller';
import { Routes } from '../interfaces/routes.interface';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, this.authController.signUp);
    this.router.post(`${this.path}/signin`, this.authController.logIn);
    this.router.post(`${this.path}/signout`, this.authController.logOut);

  }
}

export default AuthRoute;
