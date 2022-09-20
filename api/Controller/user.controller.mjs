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
    const { userName, password, email } = req.body

    let newUser = new userModel({
      userName,
      password,
      email,
      results: initialResults,
    })

    await newUser.save()

    res.status(201).json({ message: 'Account created' })
  } catch (error) {
    console.log(error)
    res.status(500).json(serverError)
  }
}

export default { createUser, getUser, getUsers }
