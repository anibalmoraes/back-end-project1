import * as yup from "yup"

class YupSchema {
  userSchema = yup.object().shape({
    email: yup.string().email().min(3).required(),
    name: yup.string().required(),
    password: yup.string().min(5).required(),
    telephone: yup.string()
  })

  contactSchema = yup.object().shape({
    email: yup.string().email().min(3).required(),
    name: yup.string().required(),
    telephone: yup.string()
  })

  contactPatchSchema = yup.object().shape({
    email: yup.string().email(),
    name: yup.string(),
    telephone: yup.string()
  })
  loginSchema = yup.object().shape({
    email: yup.string().email().min(3).required(),
    password: yup.string().min(8).required(),
  })
}

export default new YupSchema()