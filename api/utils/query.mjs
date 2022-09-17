import { getConnection } from '../Model/connection.mjs'

export const query = async (query, params) => {
  const connection = await getConnection()

  return params
    ? await connection.query(query, params)
    : await connection.query(query)
}
