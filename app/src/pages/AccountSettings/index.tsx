import { useState } from 'react'
import Header from '../../components/Header'
import ModalDelete from '../../components/ModalDelete'
import UpdateUserBlock from '../../components/UpdateUserBlock'

import { useUserConnected } from '../../hooks/useUserConnected'
import { closeModal } from '../../utils/closeModal'

function AccountSettings() {
  const [checkFormDelete, setCheckFormDelete] = useState({
    view: false,
    value: '',
    check: false,
  })
  const { isConnected } = useUserConnected()

  return (
    <>
      <Header />
      <main className="accountSetting__page">
        <div className="accountSetting__title">
          <div className="accountSetting__icon">
            {isConnected.username.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <h1 className="accountSetting__username m-0">
              {isConnected.username}
            </h1>
            <h2 className="accountSetting__msg m-0">Your personal account</h2>
          </div>
        </div>
        <UpdateUserBlock updateData="username" />
        <UpdateUserBlock updateData="password" />
        <h3 className="accountSetting__section">Delete account</h3>
        <span className="accountSetting__warning">
          Once you delete your account, there is no going back. Please be
          certain.
        </span>
        <button
          className="button button_accountDelete "
          onClick={() => closeModal(setCheckFormDelete)}
        >
          Delete your account
        </button>
      </main>
      {checkFormDelete.view && (
        <ModalDelete
          checkFormDelete={checkFormDelete}
          setCheckFormDelete={setCheckFormDelete}
        />
      )}
    </>
  )
}

export default AccountSettings
