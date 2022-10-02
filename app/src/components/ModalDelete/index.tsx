import { FormEvent, useEffect, useRef, useState } from 'react'
import { useLocation } from 'wouter'
import Modal from '../Modal'

import { useUserConnected } from '../../hooks/useUserConnected'
import { accountDelete } from '../../services/deleteUser'
import { closeModal } from '../../utils/closeModal'

import { SetState } from '../../types'

function ModalDelete({
  checkFormDelete,
  setCheckFormDelete,
}: {
  checkFormDelete: { check: boolean; value: string; view: boolean }
  setCheckFormDelete: SetState<{ check: boolean; value: string; view: boolean }>
}) {
  const [error, setError] = useState({ message: '', isThere: false })
  const [, setLocation] = useLocation()
  const inputDelete = useRef<HTMLInputElement>(null)
  const { isConnected, setIsConnected } = useUserConnected()

  useEffect(() => {
    if (inputDelete.current !== null) inputDelete.current.focus()
  }, [checkFormDelete.view])

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

  useEffect(() => {
    const checkCloseClick = (e: MouseEvent) => {
      const { target } = e

      if (
        (!(target as HTMLElement).closest('.modal') &&
          !(target as HTMLElement).closest('.button_accountDelete')) ||
        (target as HTMLElement).closest('.modal__close')
      ) {
        closeModal(setCheckFormDelete)
      }
    }

    if (checkFormDelete.view)
      document.addEventListener('click', checkCloseClick)

    return () => document.removeEventListener('click', checkCloseClick)
  }, [checkFormDelete.view, closeModal])

  const checkDelete = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget

    let check = value === `${isConnected.username}/Delete` ? true : false

    setCheckFormDelete((prevValue) => {
      return { ...prevValue, value, check }
    })
  }

  return (
    <>
      <Modal>
        <header className="modal__header">
          <span>Are you absolutely sure?</span>
          <button
            className="modal__close"
            onClick={() => closeModal(setCheckFormDelete)}
          >
            <div className="line"></div>
          </button>
        </header>
        <div className="modal__container">
          <p>This will permanently delete the account.</p>
          <p>Please type {isConnected.username}/Delete to confirm.</p>
          <form
            onSubmit={(event) =>
              accountDelete(event, setError, setIsConnected, setLocation)
            }
          >
            <input
              type="text"
              name="check"
              autoComplete="off"
              className="form__input"
              ref={inputDelete}
              onChange={checkDelete}
              value={checkFormDelete.value}
              required
            />
            <button
              type="submit"
              className="button button_accountDelete"
              disabled={!checkFormDelete.check}
            >
              Delete this account
            </button>
          </form>
        </div>
      </Modal>
      {error.isThere && (
        <Modal>
          <p className="modal__errorMessage">{error.message}</p>
        </Modal>
      )}
    </>
  )
}

export default ModalDelete
