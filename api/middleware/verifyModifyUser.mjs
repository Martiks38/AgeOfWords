import userModel from '../Model/user.model.mjs'

import { regex, serverError } from '../const.mjs'

export const verifyModifyUser = async (req, res, next) => {
  try {
    const { field, newValue } = req.body

    if (field === 'results') {
      const keys = Object.keys(newValue)

      for (let key of keys) {
        if (!regex.test(key))
          return res.status(400).json({ message: 'Invalid format' })
      }

      const values = Object.values(newValue)
      const user = await userModel.findOne({ _id: req.userID })
      const userValues = Object.values(user.results)

      if (values.at(-1) - userValues.at(-1) !== 1) {
        return res.status(400).json({ message: 'Inconsistency in the result' })
      }

      for (let ind = 0; ind < values.length - 1; ind++) {
        let diff = values[ind] - userValues[ind]

        if (diff < 0 || diff > 1) {
          return res
            .status(400)
            .json({ message: 'Inconsistency in the result' })
        }
      }
    }

    let regexFound = regex[field] ? true : false

    if (!regexFound || !newValue || !regex[field].test(newValue)) {
      return res.status(400).json({ message: 'Invalid format' })
    }

    next()
  } catch (error) {
    res.status(500).json(serverError)
  }
}
