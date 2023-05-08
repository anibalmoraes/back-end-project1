import { NextFunction, Request, Response } from "express"

class AppError extends Error {
  public readonly statusCode: number
  constructor(message: any, statusCode: number) {
    super()
    this.message = message
    this.statusCode = statusCode
  }
}

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message })
  }


  return res.status(500).json({ message: "Internal Server Error." })
}

export { AppError, errorHandler }