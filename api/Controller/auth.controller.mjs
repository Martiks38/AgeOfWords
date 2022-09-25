import userModel from '../Model/user.model.mjs'
import jwt from 'jsonwebtoken'

import { initialResults, serverError } from '../const.mjs'
import { SECRET } from '../env.mjs'

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const newUser = new userModel({
      username,
      email,
      password,
      results: initialResults,
    })

    let savedUser = await newUser.save()

    const token = jwt.sign({ id: savedUser._id }, SECRET, {
      expiresIn: 86400 * 7, // one week
    })

    res.status(201).json({ token })
  } catch (error) {
    res.status(500).json(serverError)
  }
}

const signIn = async (req, res) => {
  try {
    const { password, username } = req.body

    const user = await userModel.findOne({ username })

    const matchPassword = await userModel.comparePassword(
      password,
      user.password
    )

    if (!matchPassword)
      return res.status(401).json({ token: null, message: 'Invalid password' })

    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: 86400 * 7, // one week
    })

    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json(serverError)
  }
}

export default { signIn, signUp }
