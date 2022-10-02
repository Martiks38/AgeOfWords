import { Link } from 'wouter'
import Header from '../../components/Header'
import Modal from '../../components/Modal'

function Error404() {
  return (
    <>
      <Header />
      <Modal styleModify="form error404">
        <h1>Error 404</h1>
        <h2>Not Found</h2>
        <Link href="/">
          <a className="button button_error404">Home</a>
        </Link>
      </Modal>
    </>
  )
}

export default Error404
