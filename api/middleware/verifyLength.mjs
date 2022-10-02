export const verifyLength = async (req, res, next) => {
  const { word } = req.body

  if (word.length !== 5) {
    return res
      .status(400)
      .json({ message: `The word ${word} does not have five letters` })
  }

  next()
}
