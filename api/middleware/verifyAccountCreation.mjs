const checkUsername = (username) => {
  if (typeof username !== 'string') return false

  let regexusername = /^\w{5,16}$/i

  return regexusername.test(username)
}

const checkPassword = (password) => {
  if (typeof password !== 'string') return false

  let regexPassword = /^\S{8,20}$/

  return regexPassword.test(password)
}

const checkEmail = (email) => {
  if (typeof email !== 'string') return false

  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/

  return regexEmail.test(email)
}

export const checkCreationFields = async (req, res, next) => {
  const { username, password, email } = req.body

  let verifyusername = checkUsername(username)
  let verifyPassword = checkPassword(password)
  let verifyEmail = checkEmail(email)

  if (verifyusername && verifyPassword && verifyEmail) return next()

  res.status(400).json({ message: 'One or more fields are invalid' })
}
