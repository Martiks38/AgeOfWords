import { SetState } from '../types'

export const closeModal = (
  setCheckFormDelete: SetState<{ view: boolean; value: string; check: boolean }>
) => {
  setCheckFormDelete((prevValue) => {
    return { ...prevValue, view: !prevValue.view }
  })
}
