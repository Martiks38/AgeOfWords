import { regex } from '../const/regex'

import { Dispatch, FocusEvent, SetStateAction } from 'react'
import { SignUpForm } from '../interfaces'
import { ErrorField } from '../types'

const checkField = (
  event: FocusEvent<HTMLInputElement>,
  errorField: ErrorField,
  setForm: Dispatch<SetStateAction<SignUpForm>>
) => {
  const { id, value } = event.currentTarget
  let errorObj: ErrorField = {}

  if (!regex[id].test(value)) {
    errorObj = { ...errorField, [id]: true }

    setForm({
      message: 'One or more fields are invalid',
      error: true,
      errorField: errorObj,
      checkForm: false,
    })

    event.currentTarget.classList.add('invalidField')
  } else {
    errorObj = { ...errorField, [id]: false }

    let errorObjValues = Object.values(errorObj)

    // Check if there are still invalid fields in the form.
    // If this is the case, errors will continue to be reported.
    errorObjValues.some((error) => error === true)
      ? setForm({
          message: 'One or more fields are invalid',
          error: true,
          errorField: errorObj,
          checkForm: false,
        })
      : setForm({
          message: '',
          error: false,
          errorField: errorObj,
          checkForm: false,
        })

    event.currentTarget.classList.remove('invalidField')
  }
}

export { checkField }
