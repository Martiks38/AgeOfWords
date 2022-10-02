import userModel from '../Model/user.model.mjs'

import { initialResults, serverError } from '../const.mjs'

const getUser = async (req, res) => {
  try {
    const { id } = req.params

    const result = await userModel.find({ _id: id })

    let user = result.at(0)

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(serverError)
  }
}

const getOneDataUser = async (req, res) => {
  try {
    const id = req.userId
    const { field } = req.body

    const result = await userModel.find({ _id: id })

    let user = result.at(0)

    if (!user[field]) return res.statuse(400).json({ message: 'Bad Request' })

    res.status(200).json(user[field])
  } catch (error) {
    res.status(500).json(serverError)
  }
}

const getUsers = async (req, res) => {
  try {
    const results = await userModel.find()

    const users = results

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(serverError)
  }
}

const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body

    let newUser = new userModel({
      username,
      password,
      email,
      results: initialResults,
    })

    await newUser.save()

    res.status(201).json({ message: 'Account created' })
  } catch (error) {
    res.status(500).json(serverError)
  }
}

const modifyUser = async (req, res) => {
  try {
    const { field, newValue } = req.body

    const userId = req.userId

    await userModel.findOneAndUpdate({ _id: userId }, { [field]: newValue })

    res
      .status(200)
      .json({ message: `The ${field} has been changed successfully` })
  } catch (error) {
    res.status(500).json(serverError)
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.userId

    await userModel.findOneAndDelete({ _id: userId })

    res.status(200).json({ message: 'The account was successfully deleted' })
  } catch (error) {
    res.status(500).json(serverError)
  }
}

const newToken = async (req, res) => {
  try {
    const id = req.userId

    const user = await userModel.findOne({ _id: id })

    if (!user)
      return res.status(404).json({ message: 'The account does not exist' })

    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: 86400 * 7, // one week
    })

    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json(serverError)
  }
}

export default {
  createUser,
  deleteUser,
  getOneDataUser,
  getUser,
  getUsers,
  modifyUser,
  newToken,
}
