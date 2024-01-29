import { AppError } from "@/error/App.error";
import { User } from "@/models/user.model";
import httpStatus from "http-status";
export class UserService {
  async list() {
    const users = await User.find();
    return users;
  }

  async findById(id: string) {
    const user = await User.findOneBy({
      id: Number(id),
    });
    if (user == null)
      throw new AppError("User Not Found", httpStatus.NOT_FOUND);
    return user;
  }
}
