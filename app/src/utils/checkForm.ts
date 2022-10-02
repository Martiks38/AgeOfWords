import { FocusEvent } from 'react'

import { regex } from '../const/regex'

import { StateForm } from '../interfaces'
import { ErrorField, SetState } from '../types'

const checkField = (
  event: FocusEvent<HTMLInputElement>,
  errorField: ErrorField,
  setForm: SetState<StateForm>
) => {
  const { id, value } = event.currentTarget
  let errorObj: ErrorField = {}

  if (!regex[id].test(value)) {
    errorObj = { ...errorField, [id]: true }

    setTimeout(() => {
      setForm({
        message: 'One or more fields are invalid',
        error: true,
        errorField: errorObj,
        checkForm: false,
      })

      event.currentTarget.classList.add('invalidField')
    }, 500)
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
