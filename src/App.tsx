import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Deposit from './components/Deposit'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
    <Deposit></Deposit>
    </div>
  )
}

export default App
