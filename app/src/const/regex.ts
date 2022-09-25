import { Regex } from '../interfaces'

const regex: Regex = {
  email: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
  password: /^\S{8,20}$/,
  username: /^\w{5,16}$/i,
}

export { regex }
