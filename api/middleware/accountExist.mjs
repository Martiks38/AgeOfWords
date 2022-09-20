import userModel from '../Model/user.model.mjs'

export const AccountExist = async (req, res, next) => {
  const { userName, email } = req.body

  let result = await userModel.find({
    $or: [{ userName }, { email }],
  })

  if (result[0]) {
    let message =
      result[0].userName === userName && result[0].email === email
        ? 'The name and email are already being used'
        : result[0].email === email
        ? 'The email is already being used'
        : 'The name is already being used'

    return res.status(400).json({ message })
  }

  next()
}
