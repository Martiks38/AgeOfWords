import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    userName: { type: String, unique: true, require: true },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    results: {
      try_1: Number,
      try_2: Number,
      try_3: Number,
      try_4: Number,
      try_5: Number,
      try_6: Number,
      total: Number,
    },
  },
  { versionKey: false, timestamps: true }
)

export default model('User', userSchema)
