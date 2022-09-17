import { WordsModel } from '../model/word.model.mjs'
import { serverError } from '../const.mjs'

async function getWord(req, res) {
  try {
    const id = req.params.id

    let result = await WordsModel.getWord(id)

    return await res.status(200).json({ status: 200, result })
  } catch (error) {
    if (error?.status) res.status(error.status).json(error)

    res.status(500).json(serverError)
  }
}

async function getRandomWord(req, res) {
  try {
    let word = await WordsModel.getRandomWord()

    res.status(200).json({ status: 200, word })
  } catch (error) {
    if (error?.status) res.status(error.status).json(error)

    res.status(500).json(serverError)
  }
}

async function getWords(req, res) {
  try {
    let words = await WordsModel.getWords()

    res.status(200).json({ status: 200, words })
  } catch (error) {
    res.status(500).json(serverError)
  }
}

async function saveWord(req, res) {
  try {
    const { id, word } = req.body

    if (word.length !== 5)
      throw {
        status: 400,
        message: `The word ${word} does not have five letters`,
      }

    if (id) {
      await WordsModel.saveWord(word, id)

      res.status(200).json({
        status: 200,
        message: `The word was successfully modified`,
      })

      return
    }

    await WordsModel.saveWord(word)

    res
      .status(201)
      .json({ status: 201, message: `Added the word ${word} to the list` })
  } catch (error) {
    if (error?.status) res.status(error.status).json(error)

    res.status(500).json(serverError)
  }
}

async function deleteWord(req, res) {
  try {
    const { id } = req.body

    await WordsModel.deleteWord(id)

    res
      .status(200)
      .json({ status: 200, message: `The word was successfully removed` })
  } catch (error) {
    if (error?.status) res.status(error.status).json(error)
    res.status(500).json(serverError)
  }
}

export const WordsController = {
  deleteWord,
  getRandomWord,
  getWord,
  getWords,
  saveWord,
}
