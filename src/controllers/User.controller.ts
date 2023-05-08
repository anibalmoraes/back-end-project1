import { Request, Response } from "express"
import UserService from "../services/User.service"

class UserController {
  async store(req: Request, res: Response) {
    const user = await UserService.create(req.body)

    return res.status(201).json(user)
  }

  async login(req: Request, res: Response) {
    const user = await UserService.login(req.body)

    return res.status(200).json(user)
  }

  async list(req: Request, res: Response) {
    const users = await UserService.index()

    return res.status(200).json(users)
  }

  async getLogged(req: Request, res: Response) {
    const auth = req.headers.authorization as string
    const user = await UserService.oneIndex(auth)

    return res.status(200).json(user)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params

    const user = await UserService.update(id, req.body);

    return res.status(200).json(user)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    await UserService.deleteUser(id)
    res.status(204).json({})
  }
}

export default new UserController()
