import jwt, { JwtPayload } from "jsonwebtoken"
import AppDataSource from "../data-source"
import { User } from "../entities/Users"
import { IUserLogin, IUserRequest, IUserUpdate } from "../interfaces/Users"

class Users {
  async index() {
    const userRepo = AppDataSource.getRepository(User)
    const users = await userRepo.find({
      select: ["id", "email", "created_at", "name", "contacts", "telephone"],
      relations: { contacts: true },
    })
    return users
  }

  async oneIndex(payload: string) {
    const userRepo = AppDataSource.getRepository(User)
    const token = payload?.split(" ")[1]

    const { sub } = jwt.decode(token) as JwtPayload

    const user = userRepo.findOne({
      where: { id: sub },
      relations: { contacts: true }
    })
    return user
  }

  async create(payload: IUserRequest) {
    const userRepo = AppDataSource.getRepository(User);
    const user = userRepo.create({
      ...payload,
    });

    await userRepo.save(user)

    const newUser = Object.fromEntries(
      Object.entries(user).filter(([key]) => !key.includes("password"))
    )
    return newUser
  }

  async login({ email }: IUserLogin) {
    const userRepo = AppDataSource.getRepository(User);
    const userEmail = await userRepo.findOne({
      where: { email: email },
    }) as User

    const token = jwt.sign({ email: userEmail.email, id: userEmail.id }, process.env.SECRET_KEY as string, {
      expiresIn: "120h",
      subject: userEmail?.id,
    })

    return { token: token }
  }

  async update(id: any, body: IUserUpdate) {
    const userRepo = AppDataSource.getRepository(User)
    const editUser = (await userRepo.findOneBy({ id: id })) as User
    await userRepo.update(editUser.id, {
      ...body,
      password: undefined,
    })

    return body
  }

  async deleteUser(userId: string) {
    const userRepo = AppDataSource.getRepository(User)
    const user = (await userRepo.findOne({
      where: { id: userId },
    })) as User
    await userRepo.delete(user.id)
    return
  }
}

export default new Users()
