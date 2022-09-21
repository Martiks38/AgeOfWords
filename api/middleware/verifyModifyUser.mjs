import { regex, serverError } from '../const.mjs'

export const verifyModifyUser = async (req, res, next) => {
  try {
    const { field, newValue } = req.body

    let regexFound = regex[field] ? true : false

    if (!regexFound || !newValue || !regex[field].test(newValue)) {
      return res.status(400).json({ message: 'Invalid format' })
    }

    next()
  } catch (error) {
    res.status(500).json(serverError)
  }
}
