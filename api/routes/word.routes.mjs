import { Router } from 'express'
import { WordsController } from '../controller/word.controller.mjs'
import { verifyLength } from '../middleware/verifyLength.mjs'

const router = Router()

router
  .get('/words', WordsController.getWords)
  .get('/rand', WordsController.getRandomWord)

router.post('/new', verifyLength, WordsController.createWord)

router.patch('/modify', verifyLength, WordsController.updateWords)

router.delete('/delete', WordsController.deleteWord)

export default router
