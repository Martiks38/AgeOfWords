import userModel from '../Model/user.model.mjs'
import jwt from 'jsonwebtoken'

import { SECRET } from '../env.mjs'

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token']

    if (!token) return res.status(403).json({ message: 'No token provided' })

    const decoded = jwt.verify(token, SECRET)
    req.userId = decoded.id

    const user = await userModel.findById(req.userId, { password: 0 })

    if (!user) return res.status(404).json({ message: 'No user found' })

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorozed' })
  }
}
