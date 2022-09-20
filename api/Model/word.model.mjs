import { Schema, model } from 'mongoose'

const wordSchema = new Schema(
  {
    words: [String],
  },
  { versionKey: false, timestamps: false }
)

export default model('Words', wordSchema)
