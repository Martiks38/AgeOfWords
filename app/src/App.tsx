import { Route } from 'wouter'

import UserProvider from './context/userConnect'

import AccountSettings from './pages/AccountSettings'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  return (
    <>
      <UserProvider>
        <Route path="/login" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/setting" component={AccountSettings} />
        <Route path="/" component={Home} />
      </UserProvider>
    </>
  )
}

export default App
