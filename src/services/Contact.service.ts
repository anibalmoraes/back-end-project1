import { Request } from "express"
import AppDataSource from "../data-source"
import { Contact } from "../entities/Contacts"
import { User } from "../entities/Users"
import { AppError } from "../errors/error"
import { Icontacts } from "../interfaces/Contacts"
import jwt, { JwtPayload } from "jsonwebtoken"

class ContactService {
  async index() {
    const contactRepo = AppDataSource.getRepository(Contact)
    const contactsList = await contactRepo.find({
      relations: { user: true },
    })

    return contactsList
  }

  async getContact(req: Request) {
    const contactRepo = AppDataSource.getRepository(Contact)

    const id = req.params.id
    const userId = req.user.id


    const contactsList = await contactRepo
      .createQueryBuilder("contacts")
      .where("contacts.id = :id AND contacts.userId = :userId", {
        id,
        userId,
      })
      .getOne()

    return contactsList
  }

  async createContact(req: Request) {
    const contactRepo = AppDataSource.getRepository(Contact)
    const userRepo = AppDataSource.getRepository(User)
    let bearerToken = req.headers.authorization as string
    const token = bearerToken.split(" ")[1]

    const { sub } = jwt.decode(token) as JwtPayload
    const user = (await userRepo.findOne({ where: { id: sub } })) as User

    const contact: Icontacts = req.body

    const createContact = contactRepo.create({ ...contact, user: user })

    await contactRepo.save(createContact)

    return createContact
  }

  async update(payload: Icontacts, id: string) {
    const contactRepo = AppDataSource.getRepository(Contact)
    const contact = await contactRepo.findOneBy({ id })

    await contactRepo.update(id, { ...contact, ...payload })
    return payload
  }

  async delete(id: string) {
    const contactRepo = AppDataSource.getRepository(Contact)
    const contact = (await contactRepo.findOne({
      where: { id: id },
    })) as Contact

    await contactRepo.delete({ id: contact.id })
    return
  }
}

export default new ContactService()
