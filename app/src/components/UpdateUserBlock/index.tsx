import { FormEvent, useEffect, useRef, useState } from 'react'
import Modal from '../Modal'

import { accountUpdate } from '../../services/updateUser'
import { useUserConnected } from '../../hooks/useUserConnected'
import { regex } from '../../const/regex'

import { Results, SetState } from '../../types'

function UpdateUserBlock({ updateData }: { updateData: string }) {
  const [prompt, setPrompt] = useState(false)
  const [error, setError] = useState({ message: '', isThere: false })
  const { setIsConnected } = useUserConnected()

  const focusInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (focusInput.current !== null) focusInput.current.focus()
  }, [prompt])

  useEffect(() => {
    let delayCloseModal: number

    if (error.isThere) {
      delayCloseModal = setTimeout(() => {
        setError({ message: '', isThere: false })
      }, 3000)
    }

    return () => {
      if (delayCloseModal) clearTimeout(delayCloseModal)
    }
  }, [error.isThere])

  const update = () => {
    setPrompt((prevValue) => !prevValue)
  }

  let type = updateData !== 'password' ? 'text' : 'password'
  let pattern =
    updateData !== 'password'
      ? regex.username.toString().slice(1, -1)
      : regex.password.toString().slice(1, -1)

  const updateSubmit = (
    event: FormEvent<HTMLFormElement>,
    setError: SetState<{
      message: string
      isThere: boolean
    }>,
    setIsConnected: SetState<{
      username: string
      connected: boolean
      results: Results
    }>
  ) => {
    setPrompt((prevValue) => !prevValue)
    accountUpdate(event, setError, setIsConnected)
  }

  return (
    <div className="accountSetting__container">
      <h3 className="accountSetting__section">Change {updateData}</h3>
      {prompt ? (
        <>
          <form
            className="formSetting"
            onSubmit={(event) => updateSubmit(event, setError, setIsConnected)}
          >
            <fieldset className="formSetting__fieldset">
              <legend>New {updateData}</legend>
              <input
                type={type}
                name="newData"
                ref={focusInput}
                pattern={pattern}
                id={updateData}
                required
              />
              <div className="panelBtns">
                <button type="submit" className="button button_setting">
                  Edit
                </button>
                <button className="button button_setting" onClick={update}>
                  Cancel
                </button>
              </div>
            </fieldset>
          </form>
        </>
      ) : (
        <button className="button button_setting" onClick={update}>
          Change {updateData}
        </button>
      )}
      {error.isThere && (
        <Modal>
          <p className="modal__errorMessage">{error.message}</p>
        </Modal>
      )}
    </div>
  )
}

export default UpdateUserBlock
