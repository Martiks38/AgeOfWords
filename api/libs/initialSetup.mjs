import wordModel from '../model/word.model.mjs'

export const createListWords = async () => {
  try {
    const count = await wordModel.estimatedDocumentCount()

    const WORDS = [
      'FAITH',
      'BLAST',
      'BOYAR',
      'ELITE',
      'PLATE',
      'TOWER',
      'SPIES',
      'WAGON',
      'DOCKS',
      'WOOTZ',
      'CAMPS',
      'STONE',
      'OBUCH',
      'ENEMY',
      'TOURS',
      'TARIQ',
      'ZIZAD',
      'FIELD',
      'GAJAH',
      'BABUR',
      'ZIZKA',
      'YODIT',
      'CELTS',
      'AZTEC',
      'INCAS',
      'TATAR',
      'MAYAN',
      'CUMAN',
      'TURKS',
      'KHMER',
      'FRANK',
      'GOTHS',
      'SLAVS',
      'MALAY',
      'UNITS',
      'BONUS',
      'MONKS',
      'TECHS',
      'SIEGE',
      'SHEEP',
      'HOUSE',
      'RELIC',
      'MINES',
      'GBETO',
      'TIGUI',
      'ARROW',
      'TRADE',
      'NAVAL',
      'RATHA',
      'SHIPS',
      'PAIKS',
      'FARMS',
      'LLAMA',
      'EAGLE',
      'ARMOR',
      'LIGHT',
      'CAMEL',
      'NOMAD',
      'DRILL',
      'SCOUT',
      'SIGHT',
    ]

    if (count > 0) return

    const result = await new wordModel({ words: WORDS }).save()

    console.log(result)
  } catch (error) {
    console.log(error)
  }
}
