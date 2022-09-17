import express from 'express'
import { WordsController } from '../controller/word.controller.mjs'

const router = express.Router()

router.get('/api/v1/word', WordsController.getWord)
// .get('/api/v1/words', WordsController.getWords)

// router.post('/api/v1/new_word', WordsController.saveWord)

// router.patch('/api/v1/modify_word', WordsController.saveWord)

// router.delete('/api/v1/delete_word', WordsController.deleteWord)

export default router
