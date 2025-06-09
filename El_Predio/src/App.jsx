import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  

  return (
    <>
     <Router>
            <AppRoutes />
      </Router>
    </>
  )
}

export default App
