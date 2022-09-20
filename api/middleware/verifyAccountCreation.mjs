const checkUserName = (userName) => {
  if (typeof userName !== 'string') return false

  let regexUserName = /^\w{5,16}$/i

  return regexUserName.test(userName)
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
  const { userName, password, email } = req.body

  let verifyUserName = checkUserName(userName)
  let verifyPassword = checkPassword(password)
  let verifyEmail = checkEmail(email)

  if (verifyUserName && verifyPassword && verifyEmail) next()

  res.status(400).json({ message: 'One or more fields are invalid' })
}
