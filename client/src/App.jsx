import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Home from './pages/Home'
import About from './pages/About'
import Header from './components/Header'
import FooterCom from  './components/Footer'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/sign-in" element={<Signin/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path="/dashboard" element={<Dashboard />}/>
      </Route>
      <Route path="/projects" element={<Projects />}/>

    </Routes>
    <FooterCom/>
    </BrowserRouter>
  )
}

export default App