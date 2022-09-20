import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

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

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)

  return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

userSchema.pre('save', async function (next) {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }

  const hash = await bcrypt.hash(user.password, 10)
  user.password = hash

  next()
})

export default model('User', userSchema)
