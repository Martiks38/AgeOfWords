import { serverError } from '../const.mjs'
import wordsModel from '../model/word.model.mjs'

async function getWords(req, res) {
  try {
    let results = await wordsModel.find()
    let words = results[0]

    res.status(200).json({ status: 200, words })
  } catch (error) {
    res.status(500).json(serverError)
  }
}

async function getRandomWord(req, res) {
  try {
    let results = await wordsModel.find()

    let words = results[0].words
    let random = Math.floor(Math.random() * 61)
    let word = words[random]

    res.status(200).json({ status: 200, word })
  } catch (error) {
    res.status(500).json(serverError)
  }
}

async function updateWords(req, res) {
  try {
    const { id, oldWord, word } = req.body

    let results = await wordsModel.find()

    let words = results[0].words

    let position = words.indexOf(oldWord)

    let modifiedWords = words.map((dbWord, index) =>
      index === position ? word.toUpperCase() : dbWord
    )

    await wordsModel.updateOne({ _id: id }, { $set: { words: modifiedWords } })

    res.status(200).json({
      message: `The word was successfully modified`,
    })
  } catch (error) {
    if (error?.status) res.status(error.status).json({ message: error.message })

    res.status(500).json(serverError)
  }
}

async function createWord(req, res) {
  try {
    const { id, word } = req.body

    let results = await wordsModel.find()

    let words = results[0].words

    let foundWord = words.includes(word.toUpperCase())

    if (foundWord)
      throw { status: 406, message: `The word already exists in the list` }

    let newWords = [...words, word.toUpperCase()]

    await wordsModel.updateOne({ _id: id }, { $set: { words: newWords } })

    res
      .status(201)
      .json({ status: 201, message: `Added the word ${word} to the list` })
  } catch (error) {
    if (error?.status) res.status(error.status).json({ message: error.message })

    res.status(500).json(serverError)
  }
}

async function deleteWord(req, res) {
  try {
    const { id, word } = req.body

    let results = await wordsModel.find()

    let words = results[0].words

    let newWords = words.filter((dbWord) => dbWord !== word)

    await wordsModel.updateOne({ _id: id }, { $set: { words: newWords } })

    res
      .status(200)
      .json({ status: 200, message: `The word was successfully removed` })
  } catch (error) {
    if (error?.status) res.status(error.status).json(error)
    res.status(500).json(serverError)
  }
}

export const WordsController = {
  createWord,
  deleteWord,
  getRandomWord,
  getWords,
  updateWords,
}
