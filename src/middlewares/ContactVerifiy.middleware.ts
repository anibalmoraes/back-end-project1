import { NextFunction, Request, Response } from "express"
import AppDataSource from "../data-source"
import { Contact } from "../entities/Contacts"
import { AppError } from "../errors/error"
import jwt from "jsonwebtoken"


class ContactVerifyMiddleware {
  async verfiyId(req: Request, res: Response, next: NextFunction) {
    const contactRepo = AppDataSource.getRepository(Contact)
    const id = req.params.id
    const contact = (await contactRepo.exist({ where: { id } }))

    if (!contact) throw new AppError("Invalid  id", 404)

    return next()
  }




}

export default new ContactVerifyMiddleware()
