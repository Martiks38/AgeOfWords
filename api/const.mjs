const serverError = { status: 500, message: 'Internal Server Error' }

const initialResults = {
  try_1: 0,
  try_2: 0,
  try_3: 0,
  try_4: 0,
  try_5: 0,
  try_6: 0,
  total: 0,
}

const regex = {
  email: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
  password: /^\S{8,20}$/,
  username: /^([a-zA-Z0-9]+[.|_]?[a-zA-Z0-9]*)+$/,
  results: /^(try_[1-6]|total)$/,
}

export { initialResults, regex, serverError }
