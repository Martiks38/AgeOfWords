import express from 'express'
import { WordsController } from '../controller/word.controller.mjs'
import { verifyLength } from '../middleware/verifyLength.mjs'

const router = express.Router()

router
  .get('/words', WordsController.getWords)
  .get('/rand_word', WordsController.getRandomWord)

router.post('/new_word', verifyLength, WordsController.createWord)

router.patch('/modify_word', verifyLength, WordsController.updateWords)

router.delete('/delete_word', WordsController.deleteWord)

export default router
