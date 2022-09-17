import { query } from '../utils/query.mjs'

async function getWord(id) {
  try {
    const queryID = 'SELECT word FROM words WHERE word_id = ?'

    let result = await query(queryID, id)

    if (result.length === 0)
      throw { status: 400, message: `The id ${id} is wrong` }

    return result[0]
  } catch (error) {
    throw error
  }
}

async function getRandomWord() {
  try {
    const querySQL = 'SELECT word FROM words ORDER BY rand() LIMIT 1'

    let word = await query(querySQL)

    if (word) return word[0].word

    throw {
      status: 404,
      message: 'Error getting a word',
    }
  } catch (error) {
    throw error
  }
}

async function getWords() {
  try {
    const querySQL = 'SELECT * FROM words'

    return await query(querySQL)
  } catch (error) {
    throw error
  }
}

async function saveWord(word, id = null) {
  try {
    const querySQL = id
      ? 'UPDATE words SET word = ? where word_id = ?'
      : 'INSERT INTO words (word) values (?)'

    if (id) {
      // Buscó si existe alguna palabra con el id respectivo
      // En caso de que no hallar ninguna devolverá un error
      await getWord(id)

      return await query(querySQL, [word, id])
    }

    const words = await getWords()

    for (let wordSQL of words) {
      if (wordSQL.word === word) {
        throw { status: 400, message: `The word ${word} already exists.` }
      }
    }

    return await query(querySQL, word)
  } catch (error) {
    throw error
  }
}

async function deleteWord(id) {
  try {
    const querySQL = 'DELETE FROM words WHERE word_id = ?'

    // Buscó si existe alguna palabra con el id respectivo
    // En caso de que no hallar ninguna devolverá un error
    await getWord(id)

    return await query(querySQL, id)
  } catch (error) {
    throw error
  }
}

export const WordsModel = {
  deleteWord,
  getRandomWord,
  getWord,
  getWords,
  saveWord,
}
