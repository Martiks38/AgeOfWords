export const getDataUser = () => {
  let dataUserJSON = window.localStorage.getItem('AWSession')

  if (!dataUserJSON) return null

  return JSON.parse(dataUserJSON)
}
