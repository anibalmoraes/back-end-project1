import { Request, Response } from "express"
import { Any } from "typeorm"
import ContactService from "../services/Contact.service"

class ContactController {
  async list(req: Request, res: Response) {
    const id = req

    const contacts = await ContactService.getContact(id)

    return res.status(200).json(contacts)
  }

  async listAll(req: Request, res: Response) {
    const contacts = await ContactService.index()

    return res.status(200).json(contacts)
  }

  async storeContactInUser(req: Request, res: Response) {
    const contactCreated = await ContactService.createContact(req)

    return res.status(201).json(contactCreated)
  }

  async update(req: Request, res: Response) {
    const { body } = req
    const id = req.params.id
    const contactUpdated = await ContactService.update(body, id)

    return res.status(200).json(contactUpdated)
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id
    await ContactService.delete(id)


    return res.sendStatus(204).json({})
  }

}

export default new ContactController()
