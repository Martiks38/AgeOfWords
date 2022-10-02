import { Link } from 'wouter'

import Header from '../../components/Header'

function Home() {
  return (
    <>
      <Header />
      <main>
        <figure className="container__logo container__logo_home">
          <img src="logo.png" alt="Logo" className="container__logo__img" />
          <figcaption>
            <h1 className="container__logo__title">Age of Words</h1>
          </figcaption>
        </figure>
        <div className="play-game__content">
          <Link href="/game">
            <a className="play-game__link">Play</a>
          </Link>
        </div>
      </main>
    </>
  )
}

export default Home
