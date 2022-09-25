import userModel from '../Model/user.model.mjs'
import jwt from 'jsonwebtoken'

import { SECRET } from '../env.mjs'

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token']

    if (!token) return next()

    const { password } = req.body

    const decoded = jwt.verify(token, SECRET)
    req.userId = decoded.id

    const user = await userModel.findById(req.userId)

    const matchPassword = await userModel.comparePassword(
      password,
      user.password
    )
    if (!matchPassword)
      return res.status(401).json({ token: null, message: 'Invalid password' })

    const newToken = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: 86400 * 7, // one week
    })

    return res.status(200).json({ newToken })
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorozed' })
  }
}
