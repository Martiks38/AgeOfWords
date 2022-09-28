import { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useLocation } from 'wouter'

import { useUserConnected } from '../../hooks/useUserConnected'
import { loginUser } from '../../services/signIn'
import { checkField } from '../../utils/checkForm'

import { StateForm } from '../../interfaces'

function SignIn() {
  const { toggleConnected } = useUserConnected()

  const [form, setForm] = useState<StateForm>({
    message: '',
    error: false,
    errorField: {},
    checkForm: false,
  })

  const [, setLocation] = useLocation()

  useLayoutEffect(() => {
    if (localStorage.getItem('AWSession')) return setLocation('/')
  }, [])

  useEffect(() => {
    if (form.checkForm) setLocation('/')
  }, [form.checkForm])

  return (
    <main className="g-center">
      <section>
        <figure className="container__logo">
          <Link href="/">
            <a>
              <img className="signUP__logo" src="logo.png" alt="Age of Words" />
            </a>
          </Link>
        </figure>
        <article className="container__form">
          <h1 className="signUp__title">Sign in to Age of Words</h1>
          {form.error && <p className="form__error">{form.message}</p>}
          <form
            className="form"
            onSubmit={(e) => loginUser(e, setForm, toggleConnected)}
          >
            <label className="form__label" htmlFor="username">
              Username
            </label>
            <input
              className="form__input"
              type="text"
              name="username"
              id="username"
              autoComplete="off"
              autoFocus={true}
              required
              onBlur={(e) => checkField(e, form.errorField, setForm)}
            />
            <span className="form__label form__label_forgotPassword">
              <label htmlFor="password">Password</label>
              <Link href="">
                <a>Forgot password?</a>
              </Link>
            </span>
            <input
              className="form__input"
              type="password"
              name="password"
              id="password"
              autoComplete="true"
              required
              onBlur={(e) => checkField(e, form.errorField, setForm)}
            />
            <button className={'button button_form form__button'} type="submit">
              Log In
            </button>
          </form>
          <span className="signUp__signIn">
            <span>New to Age of Words?</span>
            <Link href="/signup">
              <a className="link">Sign Up</a>
            </Link>
          </span>
        </article>
      </section>
    </main>
  )
}

export default SignIn
