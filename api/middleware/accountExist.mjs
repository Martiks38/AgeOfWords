import { serverError } from '../const.mjs'
import userModel from '../Model/user.model.mjs'

export const accountExist = async (req, res, next) => {
  try {
    const { username, email } = req.body

    let result = await userModel.find({
      $or: [{ username }, { email }],
    })

    if (result[0]) {
      let message =
        result[0].username === username && result[0].email === email
          ? 'The name and email are already being used'
          : result[0].email === email
          ? 'The email is already being used'
          : 'The name is already being used'

      throw { status: 400, message }
    }

    next()
  } catch (error) {
    if (error?.status)
      return res.status(error.status).json({ message: error.message })

    res.status(500).json(serverError)
  }
}
