import { Link } from 'wouter'
import Header from '../../components/Header'

function Home() {
  return (
    <>
      <Header />
      <main>
        <figure className="container__logo">
          <img src="logo.png" alt="Logo" className="container__logo__img" />
          <figcaption>
            <h1 className="container__logo__title">Age of Words</h1>
          </figcaption>
        </figure>
        <Link href="/">
          <a className="play-game">Play</a>
        </Link>
      </main>
    </>
  )
}

export default Home
