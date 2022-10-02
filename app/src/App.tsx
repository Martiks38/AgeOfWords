import { Route, Switch } from 'wouter'

import UserProvider from './context/userConnect'

import AccountSettings from './pages/AccountSettings'
import Error404 from './pages/Error404'
import Game from './pages/Game'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  return (
    <UserProvider>
      <Switch>
        <Route path="/game" component={Game} />
        <Route path="/login" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/setting" component={AccountSettings} />
        <Route path="/" component={Home} />
        <Route component={Error404} />
      </Switch>
    </UserProvider>
  )
}

export default App
