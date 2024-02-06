import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Home from './pages/Home'
import About from './pages/About'
import Header from './components/Header'

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/sign-in" element={<Signin/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/projects" element={<Projects />}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App