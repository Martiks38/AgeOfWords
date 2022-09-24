import { useState } from 'react'
import { Link } from 'wouter'
import { checkField } from '../../utils/checkForm'

import { SignUpForm } from '../../interfaces'
import { createUser } from '../../services/signUp'

function SignUp() {
  const [form, setForm] = useState<SignUpForm>({
    message: '',
    error: false,
    errorField: {},
  })

  return (
    <main>
      <figure className="container__logo">
        <img className="signUP__logo" src="logo.png" alt="Age of Words" />
      </figure>
      <article className="container__form">
        <h1 className="signUp__title">Sign up to Age of Words</h1>
        {form.error && <p className="form__error">{form.message}</p>}
        <form className="form" onSubmit={(e) => createUser(e, setForm)}>
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
    </main>
  )
}

export default SignUp
