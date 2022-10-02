import { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useLocation } from 'wouter'

import { useUserConnected } from '../../hooks/useUserConnected'
import { createUser } from '../../services/signUp'
import { checkField } from '../../utils/checkForm'

import { StateForm } from '../../interfaces'

function SignUp() {
  const [form, setForm] = useState<StateForm>({
    message: '',
    error: false,
    errorField: {},
    checkForm: false,
  })

  const [, setLocation] = useLocation()
  const { toggleConnected } = useUserConnected()

  useLayoutEffect(() => {
    if (localStorage.getItem('AWSession')) return setLocation('/')
  }, [])

  useEffect(() => {
    if (form.checkForm) setLocation('/')
  }, [form.checkForm])

  return (
    <main className="g-center">
      <section className="container__sing">
        <figure className="container__logo">
          <Link href="/">
            <a>
              <img className="signUP__logo" src="logo.png" alt="Age of Words" />
            </a>
          </Link>
        </figure>
        <article className="container__form">
          <h1 className="signUp__title">Sign up to Age of Words</h1>
          {form.error && <p className="form__error">{form.message}</p>}
          <form
            className="form"
            onSubmit={(e) => createUser(e, setForm, toggleConnected)}
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
            <label className="form__label" htmlFor="email">
              Email
            </label>
            <input
              className="form__input"
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              required
              onBlur={(e) => checkField(e, form.errorField, setForm)}
            />
            <label className="form__label" htmlFor="password">
              Password
            </label>
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
              Sign Up
            </button>
          </form>
          <span className="signUp__signIn">
            <span>You have an account?</span>
            <Link href="/login">
              <a className="link">Sign In</a>
            </Link>
          </span>
        </article>
      </section>
    </main>
  )
}

export default SignUp
