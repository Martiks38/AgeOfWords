import { Regex } from '../interfaces'

const regex: Regex = {
  email: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
  password: /^\S{8,20}$/,
  username: /^([a-zA-Z0-9]+[.|_]?[a-zA-Z0-9]*)+$/,
}

export { regex }
