import { Link } from 'wouter'

function SignUp() {
  return (
    <main>
      <figure className="container__logo">
        <img className="signUP__logo" src="logo.png" alt="Age of Words" />
      </figure>
      <article className="container__form">
        <h1 className="signUp__title">Sign up to Age of Words</h1>
        <form className="form">
          <label className="form__label" htmlFor="username">
            Username
          </label>
          <input
            className="form__input"
            type="text"
            name="username"
            id="username"
          />
          <label className="form__label" htmlFor="email">
            Email
          </label>
          <input className="form__input" type="text" name="email" id="email" />
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            className="form__input"
            type="text"
            name="password"
            id="password"
          />
          <button className="button  button_form form__button" type="submit">
            Sign Up
          </button>
        </form>
      </article>
      <span className="signUp__signIn">
        <span>You have an account?</span>
        <Link href="/login">
          <a className="link">Sign In</a>
        </Link>
      </span>
    </main>
  )
}

export default SignUp
