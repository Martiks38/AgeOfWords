import { Route } from 'wouter'
import Home from './pages/Home'
import SignUp from './pages/SignUp'

function App() {
  return (
    <div>
      <Route path="/" component={Home} />
      <Route path="/signup" component={SignUp} />
    </div>
  )
}

export default App
