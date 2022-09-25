import { Route } from 'wouter'
import UserProvider from './context/userConnect'
import Home from './pages/Home'
import SignUp from './pages/SignUp'

function App() {
  return (
    <>
      <UserProvider>
        <Route path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
      </UserProvider>
    </>
  )
}

export default App
