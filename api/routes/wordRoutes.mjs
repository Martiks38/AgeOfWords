import { Router } from 'express'
import { WordsController } from '../controller/word.controller.mjs'
import { verifyLength } from '../middleware/verifyLength.mjs'

const router = Router()

router
  .get('/words', WordsController.getWords)
  .get('/word/rand', WordsController.getRandomWord)

router.post('/word/new', verifyLength, WordsController.createWord)

router.patch('/word/modify', verifyLength, WordsController.updateWords)

router.delete('/word/delete', WordsController.deleteWord)

export default router
