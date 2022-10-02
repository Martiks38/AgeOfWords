import { Schema, model } from 'mongoose'

const wordSchema = new Schema(
  {
    words: [String],
  },
  { versionKey: false, timestamps: true }
)

export default model('Words', wordSchema)
