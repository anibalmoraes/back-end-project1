import { User } from "../../entities/Users"
import express from "express"

declare global {
  namespace Express {
    interface Request {
      user: any
    }
  }
}

export { }
