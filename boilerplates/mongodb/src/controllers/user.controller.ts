import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../interfaces/auth.interface";
import { User } from "../interfaces/users.interface";
import UserService from "../services/users.service";

class UserController {
  private userService = new UserService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsers: User[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsers, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };
}
export default UserController;
