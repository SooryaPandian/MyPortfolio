import { useState } from 'react'

import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Home/>
      </>
  )
}

export default App
