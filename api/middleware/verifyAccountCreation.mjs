import { regex } from '../const.mjs'

const checkUsername = (username) => {
  if (typeof username !== 'string') return false

  return regex.username.test(username)
}

const checkPassword = (password) => {
  if (typeof password !== 'string') return false

  return regex.password.test(password)
}

const checkEmail = (email) => {
  if (typeof email !== 'string') return false

  return regex.email.test(email)
}

export const checkCreationFields = async (req, res, next) => {
  const { username, password, email } = req.body

  let verifyusername = checkUsername(username)
  let verifyPassword = checkPassword(password)
  let verifyEmail = checkEmail(email)

  if (verifyusername && verifyPassword && verifyEmail) return next()

  res.status(400).json({ message: 'One or more fields are invalid' })
}
